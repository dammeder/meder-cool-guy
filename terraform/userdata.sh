#!/bin/bash
set -e

# ── Node.js 20 ──────────────────────────────────────────────────────────────
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# ── nginx ────────────────────────────────────────────────────────────────────
apt-get install -y nginx certbot python3-certbot-nginx

# ── PM2 ─────────────────────────────────────────────────────────────────────
npm install -g pm2

# ── App ─────────────────────────────────────────────────────────────────────
git clone ${repo_url} /home/ubuntu/app
cd /home/ubuntu/app

cat > .env.local <<EOF
DATABASE_URL="${db_url}"
ADMIN_PASSWORD="${admin_password}"
ADMIN_TOKEN="${admin_token}"
EOF

npm install
npx prisma migrate deploy
npx prisma db seed
npm run build

pm2 start npm --name mcg -- start
pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save

# ── nginx ─────────────────────────────────────────────────────────────────────
cat > /etc/nginx/sites-available/mcg <<'NGINX'
server {
    listen 80;
    server_name meder-cool-guy.com www.meder-cool-guy.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -s /etc/nginx/sites-available/mcg /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
