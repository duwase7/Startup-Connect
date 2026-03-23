# StartupConnect
## Overview
StartupConnect connects startups with mentors, investors, and collaborators. Users can search, filter, and discover local startups and potential collaborators.

## Features
- Search startups by name
- Filter by location or category
- Interactive display of startup info
- Error handling for API downtime

## APIs Used
- Crunchbase API (Startup info) [https://developer.crunchbase.com]
- OpenCage Geocoding API (Location) [https://opencagedata.com]

## Setup
1. Clone repo
2. `cd backend && npm install`
3. Create `.env` with API keys
4. Run server: `node server.js`
5. Open `frontend/index.html` in browser

## Deployment
- Copy project to Web01 and Web02
- Start backend
- Serve frontend via Nginx/Apache
- Configure Lb01 load balancer for round-robin

## Demo
- Video link: [Add your demo link here]