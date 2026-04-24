#!/bin/bash

# Tailscale Backend Setup Script for Abobby Suites

echo "🚀 Setting up Abobby Suites Backend with Tailscale"

# Check if Tailscale is installed
if ! command -v tailscale &> /dev/null; then
    echo "❌ Tailscale not installed. Please install it first:"
    echo "curl -fsSL https://tailscale.com/install.sh | sh"
    exit 1
fi

# Check Tailscale status
echo "📡 Checking Tailscale status..."
if ! tailscale status &> /dev/null; then
    echo "❌ Tailscale not connected. Run: sudo tailscale up"
    exit 1
fi

# Get Tailscale IP and hostname
TAILSCALE_IP=$(tailscale ip -4)
TAILSCALE_HOSTNAME="technocrat"

echo "✅ Tailscale connected!"
echo "📍 Local IP: $TAILSCALE_IP"
echo "🌐 Hostname: $TAILSCALE_HOSTNAME"

# Check if .env exists (it should now)
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it with your configuration."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "🐍 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv and install dependencies
echo "📦 Installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

# Run database migrations
echo "🗄️  Running database migrations..."
alembic upgrade head

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the backend:"
echo "source venv/bin/activate"
echo "uvicorn app.main:app --host 0.0.0.0 --port 8001"
echo ""
echo "🌐 Your backend will be available at:"
echo "https://technocrat:8001"
echo ""
echo "📋 Next steps:"
echo "1. Test backend locally: curl http://localhost:8001/health"
echo "2. Start backend with Tailscale"
echo "3. Deploy frontend to Render"
echo "4. Update frontend VITE_API_BASE_URL if hostname changes"