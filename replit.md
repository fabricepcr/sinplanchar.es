# Plancha24 Barcelona - Landing Page

## Overview
Single-page landing site for un servicio de "planchado a domicilio" en Barcelona, con captura de leads mediante un formulario que guarda los envíos en CSV en el servidor.

## Project Structure
```
/
├── index.html     # Main landing page (HTML + CSS + JS for form handling)
├── server.js      # Lightweight Node server to serve the site and store leads in CSV
├── replit.md      # Project documentation
└── .replit        # Replit configuration
```

## Tech Stack
- Pure HTML5 (semantic markup)
- Pure CSS3 (embedded in `<style>` tag)
- Vanilla JavaScript for client-side interactions
- Lightweight Node server (no external npm deps)
- GitHub Pages compatible for static hosting (API needed for lead capture)

## Key Features
1. **Fixed header** - Service branding + WhatsApp CTA button
2. **Hero section** - Main headline, subheading, primary CTA
3. **Pain points section** - "¿Por qué este servicio?" with styled list items
4. **How it works** - 4-step process in responsive card grid
5. **Pricing section** - Simple transparent pricing card
6. **Final CTA** - Conversion-focused call to action
7. **Footer** - Business info and legal links

## Customization
- **Phone number**: Replace `34660015969` in all WhatsApp links
- **City name**: Change "Barcelona" throughout the page
- **Pricing**: Update the price in the pricing section
- **Colors**: Modify CSS variables in `:root` selector

## Running Locally
```bash
node server.js
```

The server listens on port `3000` by default and appends each lead submission to `data/leads.csv`.

## Deployment
This is a static site - simply deploy `index.html` to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## Recent Changes
- 2024-12-10: Initial creation of landing page
