# Render.com Deployment Guide for KrishiSaarthi Backend

## ✅ Prerequisites
- GitHub repository pushed: https://github.com/Thanatos9404/Krishi-Saarthi
- Render.com account (free tier available)

## 🚀 Deploy Backend on Render

### Step 1: Create Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Click "New +"** → **"Web Service"**

3. **Connect GitHub**: 
   - Authorize Render to access your repositories
   - Select: `Thanatos9404/Krishi-Saarthi`

### Step 2: Configure Service

Fill in the following settings:

```
Name: krishisaarthi-backend
Region: Choose nearest to you (e.g., Oregon, Frankfurt, Singapore)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Step 3: Choose Instance Type

```
Instance Type: Free
```

**Note**: Free tier has:
- ✅ 512 MB RAM
- ✅ Shared CPU
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after sleep takes 30-60 seconds

### Step 4: Environment Variables

Click **"Advanced"** and add:

```
API_KEY = 579b464db66ec23bdd0000019e4dba64f69842d1547080c5536593c7
PYTHON_VERSION = 3.11.0
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build to complete
3. You'll get a URL like: `https://krishisaarthi-backend.onrender.com`

### Step 6: Verify Deployment

Test these URLs:

1. **Health Check**: 
   ```
   https://krishisaarthi-backend.onrender.com/health
   ```
   Should return: `{"status":"healthy","service":"KrishiSaarthi API"}`

2. **API Docs**: 
   ```
   https://krishisaarthi-backend.onrender.com/docs
   ```
   Should show Swagger UI

3. **Get Crops**: 
   ```
   https://krishisaarthi-backend.onrender.com/crops
   ```
   Should return list of crops

## 🔧 Update Frontend

After backend is deployed, update your Vercel frontend:

1. **Go to Vercel Dashboard** → Your frontend project
2. **Settings** → **Environment Variables**
3. **Add/Update**:
   ```
   REACT_APP_API_URL = https://krishisaarthi-backend.onrender.com
   ```
4. **Deployments** → **Redeploy** latest deployment

## 🐛 Troubleshooting

### Build Fails with Python Version Error

**Solution**: Ensure `runtime.txt` has:
```
python-3.11.0
```

### Build Fails with "pandas" or "numpy" Error

**Problem**: Python 3.13 incompatibility

**Solution**: 
1. Check `runtime.txt` is set to Python 3.11
2. Update requirements.txt to use pandas 2.1.4
3. Clear build cache: Settings → Delete Service → Recreate

### API Returns CORS Error

**Problem**: Frontend can't access backend

**Solution**: 
1. Check backend logs for errors
2. Verify CORS middleware in `main.py` allows your frontend domain
3. Update `allow_origins` if needed

### Slow First Request (Cold Start)

**Problem**: Free tier spins down after 15 minutes

**Solutions**:
1. **Upgrade to paid tier** ($7/month) for always-on
2. **Keep-alive ping**: Use cron-job.org to ping your API every 10 minutes
3. **Accept the delay**: First request will be slow, subsequent ones are fast

### Out of Memory During Build

**Problem**: Not enough RAM to install heavy packages

**Solution**: Upgrade to Starter plan or optimize dependencies

## 📊 Monitor Deployment

### View Logs
- Dashboard → Your Service → **Logs** tab
- Real-time logs of all requests and errors

### Check Metrics
- Dashboard → Your Service → **Metrics** tab
- CPU, Memory, Request rate graphs

## 🔄 Auto-Deploy on Git Push

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Wait 3-5 minutes for automatic redeployment.

## ⚡ Performance Tips

1. **Database**: Add Redis/PostgreSQL if needed (free tiers available)
2. **Caching**: Implement response caching for common queries
3. **CDN**: Use Render's CDN for static assets
4. **Scaling**: Upgrade to Standard/Pro for better performance

## 🎯 Expected Timeline

- **Build**: 5-10 minutes
- **Deploy**: 1-2 minutes
- **Total**: ~10 minutes from start to live

## ✅ Final Checklist

- [ ] Backend deployed successfully
- [ ] Health endpoint returns OK
- [ ] API docs accessible at /docs
- [ ] Crops endpoint returns data
- [ ] Frontend env variable updated
- [ ] Frontend redeployed
- [ ] Test simulation works end-to-end

## 🌐 Your Live URLs

**Backend API**: https://krishisaarthi-backend.onrender.com
**Frontend**: https://krishisaarthi-frontend.vercel.app (your Vercel URL)

---

**Deployment Complete! 🎉**
