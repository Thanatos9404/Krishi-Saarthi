# KrishiSaarthi - Complete Setup Guide

## 📋 Prerequisites

Before starting, ensure you have:

- **Python 3.8 or higher** ([Download](https://www.python.org/downloads/))
- **Node.js 16 or higher** ([Download](https://nodejs.org/))
- **Git** (optional, for version control)
- **Code Editor** (VS Code recommended)

## 🎯 Step-by-Step Setup

### Step 1: Project Structure Verification

Your project should have this structure:
```
KrishiSaarthi/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── data_loader.py
│   ├── yield_estimator.py
│   ├── cost_calculator.py
│   ├── risk_engine.py
│   ├── price_forecaster.py
│   ├── simulation_engine.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
├── datasets/
│   ├── All-India_-Crop-wise-Area,-Production-&-Yield.csv
│   └── 9ef84268-d588-465a-a308-a864a43d0070.csv
├── README.md
└── .gitignore
```

### Step 2: Backend Setup (5 minutes)

#### Windows:

1. **Open Command Prompt or PowerShell**

2. **Navigate to backend folder**:
   ```cmd
   cd C:\Desktop\COLLEGE\Coding\Hackathon\KrishiSaarthi\backend
   ```

3. **Create virtual environment**:
   ```cmd
   python -m venv venv
   ```

4. **Activate virtual environment**:
   ```cmd
   venv\Scripts\activate
   ```
   You should see `(venv)` in your command prompt

5. **Install dependencies**:
   ```cmd
   pip install -r requirements.txt
   ```
   This will take 2-3 minutes

6. **Verify installation**:
   ```cmd
   python -c "import fastapi; print('FastAPI installed successfully')"
   ```

7. **Start the backend server**:
   ```cmd
   python main.py
   ```

   You should see:
   ```
   INFO:     Started server process
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ```

8. **Test the backend** (in browser):
   - Open: http://localhost:8000
   - Open: http://localhost:8000/docs (API documentation)

**Keep this terminal open!**

#### Linux/Mac:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Step 3: Frontend Setup (5 minutes)

#### Open a NEW terminal/command prompt

1. **Navigate to frontend folder**:
   ```cmd
   cd C:\Desktop\COLLEGE\Coding\Hackathon\KrishiSaarthi\frontend
   ```

2. **Install dependencies**:
   ```cmd
   npm install
   ```
   This will take 3-5 minutes

3. **Create environment file**:
   ```cmd
   copy .env.example .env
   ```

4. **Start development server**:
   ```cmd
   npm start
   ```

   After 30-60 seconds, your browser will open automatically to:
   http://localhost:3000

5. **Verify frontend**:
   - You should see the KrishiSaarthi dashboard
   - The sidebar should load with crop options
   - No errors in browser console (F12)

### Step 4: Testing the Application

1. **Configure a simulation**:
   - Select Crop: Rice
   - Select Soil: Alluvial
   - Area: 2 hectares
   - Adjust other parameters as desired

2. **Click "Run Simulation"**

3. **Expected Results**:
   - Dashboard shows yield, cost, profit, risk cards
   - Charts display properly
   - Switch between tabs: Dashboard, Scenario Comparison, AI Recommendations

## 🐛 Troubleshooting

### Backend Issues

**Problem: "python is not recognized"**
- Solution: Install Python and add to PATH

**Problem: Port 8000 already in use**
```cmd
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process (replace PID)
taskkill /PID <process_id> /F
```

**Problem: Module not found errors**
```cmd
# Ensure virtual environment is activated
venv\Scripts\activate
# Reinstall dependencies
pip install -r requirements.txt --upgrade
```

**Problem: Dataset not found**
- Ensure CSV files are in `datasets/` folder
- Check file names match exactly

### Frontend Issues

**Problem: "npm is not recognized"**
- Solution: Install Node.js

**Problem: Port 3000 already in use**
- The app will prompt to use a different port
- Press 'Y' to accept

**Problem: API connection errors**
```
Error: Network Error
```
- Verify backend is running on port 8000
- Check `.env` file has correct API URL
- Check CORS errors in browser console

**Problem: Dependencies installation fails**
```cmd
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem: Tailwind styles not loading**
- Restart the development server
- Clear browser cache (Ctrl+Shift+R)

### Common Errors

**"Cannot find module 'XXX'"**
```cmd
# Backend
pip install XXX

# Frontend
npm install XXX
```

**"CORS policy error"**
- Ensure backend is running before frontend
- Backend CORS is configured to allow all origins in development

## 🔍 Verification Checklist

- [ ] Backend runs without errors on port 8000
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Frontend runs without errors on port 3000
- [ ] Dashboard loads with no console errors
- [ ] Can select crops and soil types
- [ ] Simulation button is clickable
- [ ] Simulation completes and shows results
- [ ] Charts render properly
- [ ] All three tabs (Dashboard, Comparison, Recommendations) work

## 🎓 Next Steps

1. **Explore the API**:
   - Visit http://localhost:8000/docs
   - Try the interactive API documentation
   - Test different endpoints

2. **Customize the data**:
   - Add more crops in `backend/config.py`
   - Modify yield calculations
   - Adjust risk weights

3. **Enhance the UI**:
   - Modify colors in `tailwind.config.js`
   - Add new chart types
   - Create additional visualizations

4. **Deploy**:
   - See `DEPLOYMENT.md` for production setup
   - Consider Heroku (backend) + Netlify (frontend)

## 📚 Learning Resources

- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **TailwindCSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/

## 💡 Tips

1. **Development Workflow**:
   - Keep both terminals open
   - Backend auto-reloads on file changes
   - Frontend hot-reloads automatically

2. **Testing Changes**:
   - Backend: Save file, check terminal for reload
   - Frontend: Save file, browser updates automatically

3. **Debugging**:
   - Backend: Check terminal output
   - Frontend: Press F12 for browser console
   - Network tab shows API calls

## 🆘 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review error messages carefully
3. Search error messages online
4. Check Python/Node.js versions
5. Verify all dependencies installed

## ✅ Success!

If you can run simulations and see results, you're all set! 🎉

Start experimenting with different farming scenarios and explore the AI recommendations.

Happy farming! 🌾
