# 🚀 KrishiSaarthi - Quick Start (2 Minutes)

## ⚡ Fastest Way to Run

### Windows Users

1. **Start Backend** - Double-click `run_backend.bat`
   - Wait for "Uvicorn running on http://0.0.0.0:8000"

2. **Start Frontend** - Double-click `run_frontend.bat`
   - Browser opens automatically to http://localhost:3000

### Manual Start (All Platforms)

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🎯 First Simulation

1. **Access**: http://localhost:3000
2. **Configure**:
   - Crop: Rice
   - Soil: Alluvial
   - Area: 2 hectares
   - Keep other defaults
3. **Click**: "Run Simulation"
4. **View**: Results in Dashboard tab

## 📊 What You'll See

- **Dashboard**: Yield, Cost, Profit, Risk metrics with charts
- **Scenario Comparison**: Current vs AI-Optimized vs Worst-Case
- **AI Recommendations**: Natural language insights

## 🔗 Important URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## ❗ Problems?

**Backend won't start?**
- Check Python 3.8+ installed: `python --version`
- Port 8000 in use: Change port or kill process

**Frontend won't start?**
- Check Node.js 16+ installed: `node --version`
- Delete `node_modules` and run `npm install` again

**API errors?**
- Ensure backend started first
- Check backend terminal for errors
- Verify backend running: http://localhost:8000

## 📖 Full Documentation

- `SETUP.md` - Detailed setup instructions
- `DEPLOYMENT.md` - Production deployment guide
- `README.md` - Complete project documentation

## ✅ Success Indicators

✓ Backend shows "Uvicorn running"
✓ Frontend opens in browser
✓ No red errors in terminals
✓ Simulation returns results
✓ Charts render properly

That's it! Start farming smarter! 🌾
