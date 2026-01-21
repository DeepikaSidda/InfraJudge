@echo off
REM Deploy Architecture Generator API

echo ==========================================
echo Architecture Generator API Deployment
echo ==========================================
echo.

echo Step 1: Building TypeScript...
call npm run build

if %errorlevel% neq 0 (
    echo X Build failed!
    exit /b 1
)

echo √ Build successful!
echo.

echo Step 2: Deploying to AWS Lambda...
call serverless deploy

if %errorlevel% neq 0 (
    echo X Deployment failed!
    exit /b 1
)

echo.
echo ==========================================
echo √ Deployment Successful!
echo ==========================================
echo.
echo Copy the API endpoint URL from above and update it in:
echo public/architecture.js (line with API_URL)
echo.

pause
