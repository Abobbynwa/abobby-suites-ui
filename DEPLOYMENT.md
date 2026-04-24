# 🚀 Abobby Suites - Complete Deployment Guide

## ✅ **Your Configuration is Ready!**

Based on your inputs, here's your complete setup:

- **Backend**: Tailscale hostname `technocrat`
- **Frontend**: Render static site
- **Database**: Neon PostgreSQL
- **Secret Key**: Configured ✅

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Backend Setup (Your Machine)**

1. **Install Tailscale** (if not already installed):
   ```bash
   curl -fsSL https://tailscale.com/install.sh | sh
   sudo tailscale up
   ```

2. **Run the setup script**:
   ```bash
   cd abobby_suites_backend
   chmod +x setup-tailscale.sh
   ./setup-tailscale.sh
   ```

3. **Start the backend**:
   ```bash
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

4. **Test backend**:
   ```bash
   curl http://localhost:8000/health
   # Should return: {"status":"healthy","environment":"production"}
   ```

### **Step 2: Frontend Deployment (Render)**

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Connect your repository: `Abobbynwa/abobby-suites-ui`

2. **Deploy Frontend**:
   - Click "New" → "Static Site"
   - Connect your GitHub repo
   - Set build settings:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Add environment variable:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://technocrat:8000`

3. **Deploy**: Click "Create Static Site"

### **Step 3: Verify Everything Works**

1. **Backend accessible**: `https://technocrat:8000/health`
2. **Frontend loads**: Your Render URL
3. **API connection**: Frontend can communicate with backend

---

## 🔧 **Your Configuration Files**

### **Backend (.env)**
```bash
DATABASE_URL=postgresql://neondb_owner:npg_47KDcqpRQVnh@ep-purple-sound-aes6ac3e-pooler.c-2.us-east-2.aws.neon.tech/abobby-suites?sslmode=require&channel_binding=require
ENVIRONMENT=production
CORS_ORIGINS=["https://abobby-suites-ui.onrender.com"]
SECRET_KEY=c268001ca1854fe139e63c5400aa7f70e18a20b94a39bc1849c807703d9bb91e
BACKEND_URL=https://technocrat:8000
```

### **Frontend (render.yaml)**
```yaml
services:
  - type: web
    name: abobby-suites-frontend
    env: static
    buildCommand: "npm install && npm run build"
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_BASE_URL
        value: https://technocrat:8000
```

---

## 🚨 **Important Notes**

1. **Keep backend running**: Your machine needs to stay online for the backend to work
2. **Tailscale hostname**: `technocrat` should resolve to your machine
3. **Firewall**: Ensure port 8000 is open on your machine
4. **SSL**: Tailscale provides HTTPS automatically

---

## 🐛 **Troubleshooting**

### **Backend not accessible**
```bash
# Check Tailscale
tailscale status

# Check if backend is running
curl http://localhost:8000/health

# Check Tailscale IP
tailscale ip -4
```

### **Frontend can't connect to backend**
- Verify `VITE_API_BASE_URL` is set correctly in Render
- Check browser console for CORS errors
- Ensure backend CORS allows your Render domain

### **Database connection issues**
- Verify Neon database is active
- Check DATABASE_URL in .env
- Run migrations: `alembic upgrade head`

---

## 🎯 **You're All Set!**

Your app will be available at:
- **Frontend**: `https://abobby-suites-ui.onrender.com` (after Render deployment)
- **Backend**: `https://technocrat:8000`

**Cost**: $0/month (all services free tier)

Ready to deploy? Start with Step 1! 🚀

### Expose via Tailscale
- Your backend will be accessible at: `https://your-machine-name.your-tailnet.ts.net:8000`
- Use this URL in the frontend configuration

## 3. Frontend Setup (Render)

### Deploy to Render
1. Connect your GitHub repo to Render
2. Create Static Site service
3. Set build command: `npm install && npm run build`
4. Set publish directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://your-tailscale-hostname:8000`

### Update CORS
In your backend `.env`, set:
```
FRONTEND_URL=https://your-render-app.onrender.com
```

## 4. Security Considerations

### Tailscale Security
- Use Tailscale's ACLs to restrict access
- Consider using Tailscale's HTTPS feature for SSL

### Environment Variables
- Never commit `.env` files
- Use strong SECRET_KEY
- Keep database credentials secure

## 5. Testing Deployment

1. Backend health check: `curl https://your-tailscale-hostname:8000/health`
2. Frontend loads and can connect to backend
3. Database operations work (user registration, bookings, etc.)

## Troubleshooting

### Backend Not Accessible
- Check Tailscale status: `tailscale status`
- Verify firewall allows port 8000
- Test locally first: `curl http://localhost:8000`

### CORS Issues
- Ensure FRONTEND_URL matches your Render domain exactly
- Check browser console for CORS errors

### Database Connection
- Verify DATABASE_URL format
- Check database firewall allows connections
- Test connection locally first