# 🚀 INSTRUÇÕES DE DEPLOY - MEU LIVRO MÁGICO

## 🎯 **OPÇÕES DE DEPLOY**

Este documento fornece instruções completas para colocar o "Meu Livro Mágico" em produção usando diferentes plataformas.

## 🌐 **OPÇÃO 1: VERCEL + HEROKU (RECOMENDADO)**

### **Frontend no Vercel**

1. **Preparar o projeto:**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy via Vercel CLI:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

3. **Configurar variáveis de ambiente:**
```
REACT_APP_API_URL=https://seu-backend.herokuapp.com
REACT_APP_REPLICATE_API_KEY=sua_chave_replicate
```

### **Backend no Heroku**

1. **Preparar arquivos:**
```bash
cd backend
echo "web: python src/main.py" > Procfile
echo "python-3.9.0" > runtime.txt
```

2. **Deploy:**
```bash
# Instalar Heroku CLI
# Login
heroku login

# Criar app
heroku create meu-livro-magico-api

# Configurar variáveis
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=sua_chave_secreta_aqui

# Deploy
git init
git add .
git commit -m "Deploy inicial"
heroku git:remote -a meu-livro-magico-api
git push heroku main
```

## 🐳 **OPÇÃO 2: DOCKER (FULL STACK)**

### **Dockerfile Completo**
```dockerfile
# Multi-stage build
FROM node:18 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.9-slim
WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências Python
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código do backend
COPY backend/ ./

# Copiar build do frontend
COPY --from=frontend-build /app/dist ./src/static

# Expor porta
EXPOSE 5000

# Comando de inicialização
CMD ["python", "src/main.py"]
```

### **Docker Compose**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - SECRET_KEY=sua_chave_secreta
    volumes:
      - ./data:/app/data
```

### **Deploy com Docker**
```bash
# Build
docker build -t meu-livro-magico .

# Run local
docker run -p 5000:5000 meu-livro-magico

# Deploy para Docker Hub
docker tag meu-livro-magico seu-usuario/meu-livro-magico
docker push seu-usuario/meu-livro-magico
```

## ☁️ **OPÇÃO 3: AWS (ESCALÁVEL)**

### **Frontend no S3 + CloudFront**

1. **Build e upload:**
```bash
cd frontend
npm run build

# Upload para S3
aws s3 sync dist/ s3://meu-livro-magico-frontend --delete
```

2. **Configurar CloudFront:**
- Origin: S3 bucket
- Behavior: SPA (redirect 404 to index.html)
- SSL: Certificate Manager

### **Backend no Elastic Beanstalk**

1. **Preparar aplicação:**
```bash
cd backend
zip -r meu-livro-magico-backend.zip . -x "venv/*" "__pycache__/*"
```

2. **Deploy via EB CLI:**
```bash
# Instalar EB CLI
pip install awsebcli

# Inicializar
eb init meu-livro-magico-backend

# Criar ambiente
eb create production

# Deploy
eb deploy
```

## 🔧 **OPÇÃO 4: VPS/SERVIDOR PRÓPRIO**

### **Nginx + Gunicorn + Systemd**

1. **Instalar dependências:**
```bash
sudo apt update
sudo apt install nginx python3-pip python3-venv nodejs npm
```

2. **Configurar aplicação:**
```bash
# Clonar projeto
git clone seu-repositorio.git /var/www/meu-livro-magico
cd /var/www/meu-livro-magico

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Frontend
cd ../frontend
npm install
npm run build
cp -r dist/* ../backend/src/static/
```

3. **Configurar Gunicorn:**
```bash
# /etc/systemd/system/meu-livro-magico.service
[Unit]
Description=Meu Livro Magico
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/meu-livro-magico/backend
Environment="PATH=/var/www/meu-livro-magico/backend/venv/bin"
ExecStart=/var/www/meu-livro-magico/backend/venv/bin/gunicorn --workers 3 --bind unix:meu-livro-magico.sock -m 007 src.main:app
Restart=always

[Install]
WantedBy=multi-user.target
```

4. **Configurar Nginx:**
```nginx
# /etc/nginx/sites-available/meu-livro-magico
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/meu-livro-magico/backend/meu-livro-magico.sock;
    }

    location /static {
        alias /var/www/meu-livro-magico/backend/src/static;
    }
}
```

5. **Ativar serviços:**
```bash
sudo systemctl enable meu-livro-magico
sudo systemctl start meu-livro-magico
sudo ln -s /etc/nginx/sites-available/meu-livro-magico /etc/nginx/sites-enabled
sudo systemctl restart nginx
```

## 🔒 **CONFIGURAÇÃO SSL (HTTPS)**

### **Let's Encrypt (Gratuito)**
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 **MONITORAMENTO EM PRODUÇÃO**

### **Logs e Métricas**
```bash
# Logs do Gunicorn
sudo journalctl -u meu-livro-magico -f

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Monitoramento de recursos
htop
df -h
free -h
```

### **Backup Automático**
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/meu-livro-magico"

# Criar backup do código
tar -czf "$BACKUP_DIR/code_$DATE.tar.gz" /var/www/meu-livro-magico

# Backup do banco de dados (se houver)
# mysqldump -u user -p database > "$BACKUP_DIR/db_$DATE.sql"

# Manter apenas últimos 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

## 🚀 **CHECKLIST DE DEPLOY**

### **Pré-Deploy:**
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] SSL configurado
- [ ] Backup realizado

### **Pós-Deploy:**
- [ ] Site acessível
- [ ] Todas as páginas funcionando
- [ ] Upload de fotos funcionando
- [ ] Geração de PDF funcionando
- [ ] Logs sem erros críticos
- [ ] Performance aceitável

### **Monitoramento:**
- [ ] Analytics configurado
- [ ] Alertas de erro configurados
- [ ] Backup automático ativo
- [ ] Certificado SSL válido

## 🔧 **TROUBLESHOOTING**

### **Problemas Comuns:**

**1. Erro 502 Bad Gateway:**
```bash
# Verificar se Gunicorn está rodando
sudo systemctl status meu-livro-magico

# Verificar logs
sudo journalctl -u meu-livro-magico -n 50
```

**2. Arquivos estáticos não carregam:**
```bash
# Verificar permissões
sudo chown -R www-data:www-data /var/www/meu-livro-magico
sudo chmod -R 755 /var/www/meu-livro-magico
```

**3. Upload de fotos falha:**
```bash
# Verificar tamanho máximo
# Nginx: client_max_body_size 10M;
# Flask: app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
```

## 📈 **OTIMIZAÇÕES DE PRODUÇÃO**

### **Performance:**
- Compressão Gzip no Nginx
- Cache de arquivos estáticos
- CDN para assets
- Minificação de JS/CSS

### **Segurança:**
- Firewall configurado
- Rate limiting
- Headers de segurança
- Backup regular

### **Escalabilidade:**
- Load balancer
- Múltiplos workers
- Cache Redis
- Database otimizado

---

## 🎯 **DEPLOY RÁPIDO (5 MINUTOS)**

Para um deploy rápido de teste:

```bash
# 1. Clone o projeto
git clone seu-repositorio.git
cd MEU_LIVRO_MAGICO_COMPLETO

# 2. Build frontend
cd frontend && npm install && npm run build

# 3. Copiar para backend
cp -r dist/* ../backend/src/static/

# 4. Rodar backend
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/main.py

# 5. Acessar http://localhost:5000
```

**Seu "Meu Livro Mágico" estará rodando em produção! 🚀**

