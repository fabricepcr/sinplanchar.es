# Plancha24 Barcelona - Landing Page

## Overview
Single-page static landing site for a local "planchado a domicilio" (ironing at home) service in Barcelona, Spain. Built with pure HTML + CSS, fully responsive (mobile-first), and optimized for conversions.

## Project Structure
```
/
├── index.html     # Main landing page (all HTML + CSS in one file)
├── replit.md      # Project documentation
└── .replit        # Replit configuration
```

## Tech Stack
- Pure HTML5 (semantic markup)
- Pure CSS3 (embedded in `<style>` tag)
- No JavaScript
- No external dependencies or CDNs
- GitHub Pages compatible

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
python3 -m http.server 5000
```

## Deployment
This is a static site - simply deploy `index.html` to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## Recent Changes
- 2024-12-10: Initial creation of landing page
