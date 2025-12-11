const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const leadsFile = path.join(dataDir, 'leads.csv');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(leadsFile)) {
    fs.appendFileSync(leadsFile, 'timestamp,nombre,telefono,email,codigo_postal,plan\n');
}

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
}

function csvEscape(value) {
    const safe = (value ?? '').toString().trim();
    if (safe.includes('"') || safe.includes(',') || safe.includes('\n')) {
        return '"' + safe.replace(/"/g, '""') + '"';
    }
    return safe;
}

function handleLeadSubmission(req, res, parsedUrl) {
    if (req.method !== 'POST' || parsedUrl.pathname !== '/api/leads') {
        return false;
    }

    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });

    req.on('end', () => {
        let payload = {};

        try {
            payload = JSON.parse(body || '{}');
        } catch (error) {
            sendJson(res, 400, { error: 'Formato de datos no válido' });
            return;
        }

        const nombre = (payload.nombre || '').toString().trim();
        const telefono = (payload.telefono || '').toString().trim();
        const email = (payload.email || '').toString().trim();
        const codigoPostal = (payload.codigoPostal || '').toString().trim();
        const plan = (payload.plan || '').toString().trim();

        if (!nombre || !telefono || !email || !codigoPostal || !plan) {
            sendJson(res, 400, { error: 'Todos los campos son obligatorios' });
            return;
        }

        const timestamp = new Date().toISOString();
        const csvLine = [timestamp, nombre, telefono, email, codigoPostal, plan]
            .map(csvEscape)
            .join(',') + '\n';

        fs.appendFile(leadsFile, csvLine, (error) => {
            if (error) {
                sendJson(res, 500, { error: 'No se pudo guardar el registro' });
                return;
            }

            sendJson(res, 200, { message: 'Guardado correctamente' });
        });
    });

    return true;
}

function serveStatic(req, res, parsedUrl) {
    const safePath = path.normalize(parsedUrl.pathname).replace(/^\/+/, '');
    const target = safePath ? safePath : 'index.html';
    const filePath = path.join(rootDir, target);

    if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end('Acceso denegado');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404);
            res.end('No encontrado');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        fs.readFile(filePath, (readErr, data) => {
            if (readErr) {
                res.writeHead(500);
                res.end('Error interno del servidor');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);

    const handled = handleLeadSubmission(req, res, parsedUrl);
    if (handled) {
        return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
        serveStatic(req, res, parsedUrl);
        return;
    }

    res.writeHead(405);
    res.end('Método no permitido');
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
