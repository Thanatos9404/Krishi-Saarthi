# Vercel Deployment Guide

## ✅ GitHub Repository Setup (COMPLETED)

Repository: https://github.com/Thanatos9404/Krishi-Saarthi

## 🚀 Deployment Steps

### Part 1: Deploy Frontend on Vercel

1. **Visit**: https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Find: `Thanatos9404/Krishi-Saarthi`
   - Click "Import"

3. **Configure Project**:
   ```
   PROJECT NAME: krishisaarthi-frontend (or any name)
   FRAMEWORK: Create React App (auto-detected)
   ROOT DIRECTORY: frontend
   BUILD COMMAND: npm run build (auto-filled)
   OUTPUT DIRECTORY: build (auto-filled)
   INSTALL COMMAND: npm install (auto-filled)
   ```

4. **Environment Variables** (Add these):
   ```
   Name: REACT_APP_API_URL
   Value: https://krishisaarthi-api.onrender.com
   ```
   (Use your backend URL after deploying backend)

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - You'll get URL like: `https://krishisaarthi-frontend.vercel.app`

### Part 2: Deploy Backend on Render.com

**Why Render instead of Vercel for Backend?**
- Vercel serverless has cold start issues with Python
- Render provides always-on servers
- Better for FastAPI applications

**Steps**:

1. **Visit**: https://render.com/
   - Sign in with GitHub

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub account
   - Select repository: `Krishi-Saarthi`

3. **Configure Service**:
   ```
   NAME: krishisaarthi-api
   REGION: Choose nearest to you
   BRANCH: main
   ROOT DIRECTORY: backend
   RUNTIME: Python 3
   BUILD COMMAND: pip install -r requirements.txt
   START COMMAND: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Environment Variables**:
   ```
   API_KEY = 579b464db66ec23bdd0000019e4dba64f69842d1547080c5536593c7
   ```

5. **Instance Type**: Free (or choose paid for better performance)

6. **Click "Create Web Service"**
   - Wait 5-10 minutes
   - You'll get URL like: `https://krishisaarthi-api.onrender.com`

### Part 3: Update Frontend with Backend URL

1. **Go back to Vercel Dashboard**
2. **Select your frontend project**
3. **Settings → Environment Variables**
4. **Update**:
   ```
   REACT_APP_API_URL = https://krishisaarthi-api.onrender.com
   ```
5. **Redeploy** (Deployments → Click "..." → Redeploy)

### Part 4: Test Deployment

1. **Visit your frontend URL**: https://krishisaarthi-frontend.vercel.app

2. **Test the app**:
   - Configure farming parameters
   - Click "Run Simulation"
   - Should see results

3. **Test backend API docs**: https://krishisaarthi-api.onrender.com/docs

## 🎯 Final URLs

- **Frontend**: `https://[your-project].vercel.app`
- **Backend API**: `https://[your-service].onrender.com`
- **API Docs**: `https://[your-service].onrender.com/docs`

## 🔧 Troubleshooting

### Frontend Shows "Network Error"

**Problem**: Frontend can't connect to backend

**Solution**:
1. Check backend is deployed and running
2. Verify `REACT_APP_API_URL` environment variable
3. Check browser console for CORS errors
4. Ensure backend URL doesn't have trailing slash

### Backend Cold Start (Render Free Tier)

**Problem**: First request takes 30-60 seconds

**Solution**: 
- This is normal on free tier (server spins down after inactivity)
- Upgrade to paid tier for always-on instance
- Or use a cron job to ping server every 10 minutes

### Build Fails

**Frontend Build Error**:
- Check package.json is correct
- Verify all dependencies are listed
- Check Node version (should be 16+)

**Backend Build Error**:
- Check requirements.txt
- Verify Python version (3.9+)
- Check for missing dependencies

## 🔄 Continuous Deployment

Both Vercel and Render auto-deploy on git push:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Auto-deploys in 2-5 minutes

## 📊 Monitoring

### Vercel (Frontend)
- Dashboard shows deployment status
- Analytics for page views
- Function logs (if using)

### Render (Backend)
- Logs tab shows server output
- Metrics tab shows CPU/Memory usage
- Events tab shows deployment history

## 💡 Tips

1. **Custom Domain**: Add your domain in Vercel/Render settings
2. **HTTPS**: Automatic on both platforms
3. **Logs**: Check logs for debugging
4. **Performance**: Monitor response times
5. **Scaling**: Upgrade plans as needed

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/

## ✅ Deployment Checklist

- [ ] GitHub repo pushed
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Environment variables configured
- [ ] Frontend updated with backend URL
- [ ] Tested simulation endpoint
- [ ] API documentation accessible
- [ ] No CORS errors
- [ ] All charts rendering properly

---

**You're all set! 🎉 Your KrishiSaarthi app is now live!**
