@echo off
echo 🚀 Setting up Safe Travel Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 🔧 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env with your configuration
)

REM Create uploads directory
if not exist uploads mkdir uploads

cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env with your configuration
echo 2. Start MongoDB service
echo 3. Run 'cd backend ^&^& npm run dev' to start backend
echo 4. Run 'cd frontend ^&^& npm run dev' to start frontend
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Happy coding! 🚀
pause
