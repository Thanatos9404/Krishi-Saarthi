# KrishiSaarthi - Deployment Guide

## 🚀 Quick Start (Development)

### Windows

1. **Start Backend** (Terminal 1):
   ```bash
   run_backend.bat
   ```
   OR manually:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   run_frontend.bat
   ```
   OR manually:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Linux/Mac

1. **Backend**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python main.py
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📦 Production Deployment

### Backend (FastAPI)

#### Option 1: Heroku
```bash
# Install Heroku CLI
cd backend
heroku create krishisaarthi-api
heroku config:set API_KEY=your_api_key
git push heroku main
```

#### Option 2: AWS EC2
```bash
# SSH into EC2 instance
ssh -i key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# Clone repo and setup
git clone <repo-url>
cd KrishiSaarthi/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run with Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

#### Option 3: Docker
```dockerfile
# Dockerfile (backend)
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t krishisaarthi-backend .
docker run -p 8000:8000 krishisaarthi-backend
```

### Frontend (React)

#### Option 1: Netlify
```bash
cd frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Option 2: Vercel
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Option 3: AWS S3 + CloudFront
```bash
# Build production
npm run build

# Upload to S3
aws s3 sync build/ s3://krishisaarthi-frontend

# Configure CloudFront distribution
# Point to S3 bucket
```

#### Option 4: Docker
```dockerfile
# Dockerfile (frontend)
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Environment Variables

### Backend (.env)
```
API_KEY=579b464db66ec23bdd0000019e4dba64f69842d1547080c5536593c7
KAGGLE_USERNAME=your_username
KAGGLE_KEY=your_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
# Production:
# REACT_APP_API_URL=https://api.krishisaarthi.com
```

## 🐳 Docker Compose (Full Stack)

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - API_KEY=${API_KEY}
    volumes:
      - ./datasets:/app/datasets

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8000
```

Run with:
```bash
docker-compose up -d
```

## 📊 Performance Optimization

### Backend
- Use Redis for caching frequently requested simulations
- Implement request rate limiting
- Enable GZIP compression
- Use connection pooling for database (if added)

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Enable service workers for PWA
- CDN for static assets

## 🔒 Security Checklist

- [ ] Enable CORS with specific origins (not *)
- [ ] Implement API rate limiting
- [ ] Use HTTPS in production
- [ ] Sanitize user inputs
- [ ] Implement authentication (if needed)
- [ ] Regular dependency updates
- [ ] Environment variables for secrets
- [ ] Enable security headers

## 📈 Monitoring

### Backend Monitoring
```python
# Add to main.py
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### Logging
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pip install pytest pytest-asyncio httpx
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy KrishiSaarthi

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "krishisaarthi-api"
          heroku_email: "your@email.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          cd frontend
          npm install
          npm run build
          netlify deploy --prod --dir=build
        env:
          NETLIFY_AUTH_TOKEN: ${{secrets.NETLIFY_TOKEN}}
          NETLIFY_SITE_ID: ${{secrets.NETLIFY_SITE_ID}}
```

## 🆘 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Check Python version (3.8+)
   - Verify all dependencies installed
   - Check port 8000 is not in use

2. **Frontend API errors**:
   - Verify backend is running
   - Check REACT_APP_API_URL in .env
   - Check browser console for CORS errors

3. **Data loading errors**:
   - Ensure datasets folder exists
   - Verify CSV files are present
   - Check file permissions

## 📞 Support

For issues or questions:
- Check README.md for basic setup
- Review API documentation at /docs
- Check application logs
