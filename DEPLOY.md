# Deployment Guide

## VPS Setup (one-time)

1. Install Nginx on VPS:
   ```bash
   apt install nginx certbot python3-certbot-nginx
   ```

2. Copy nginx config:
   ```bash
   scp nginx.conf user@your.vps:/etc/nginx/sites-available/home-dashboard
   ssh user@your.vps "ln -s /etc/nginx/sites-available/home-dashboard /etc/nginx/sites-enabled/ && mkdir -p /var/www/home-dashboard && nginx -t && systemctl reload nginx"
   ```

3. Set up SSL:
   ```bash
   ssh user@your.vps "certbot --nginx -d yourdomain.com"
   ```

## Deploy

```bash
export DEPLOY_HOST=your.vps.ip.or.domain
export DEPLOY_USER=root
VITE_WEATHER_API_KEY=your_key_here npm run build && ./deploy.sh
```

## OpenWeatherMap API Key

Get a free key at https://openweathermap.org/api — the "Current Weather Data" free tier is sufficient.
