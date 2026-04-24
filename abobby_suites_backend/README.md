# Abobby Suites Backend - Production Deployment Guide

## Prerequisites
- Render account
- Neon PostgreSQL database
- Domain names configured

## Environment Variables (Set in Render Dashboard)
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
SECRET_KEY=your-super-secure-secret-key-here
FRONTEND_URL=https://your-frontend-domain.com
BACKEND_URL=https://your-backend-domain.com
ENVIRONMENT=production
```

## Deployment Steps
1. Connect GitHub repository to Render
2. Create new Web Service with Python environment
3. Configure environment variables
4. Deploy

## Post-Deployment Checks
- API responds at `/health` endpoint
- Database migrations applied
- CORS allows frontend domain
- HTTPS enabled
- Logs show successful startup

## Security Notes
- SECRET_KEY must be strong and unique
- Database credentials secure
- API documentation disabled in production
- CORS restricted to allowed domains

## Monitoring
- Check Render logs for errors
- Monitor database connections
- Set up health check alerts