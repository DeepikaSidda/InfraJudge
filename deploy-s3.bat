@echo off
REM InfraJudge S3 Deployment Script for Windows
REM This script deploys the frontend to S3

echo ==========================================
echo InfraJudge S3 Frontend Deployment
echo ==========================================
echo.

REM Configuration
set BUCKET_NAME=infrajudge-app
set REGION=us-east-1

echo Step 1: Checking AWS credentials...
aws sts get-caller-identity >nul 2>&1
if errorlevel 1 (
    echo X AWS credentials not configured
    echo Please run: aws configure
    pause
    exit /b 1
)
echo √ AWS credentials found!
echo.

echo Step 2: Creating S3 bucket (if not exists)...
aws s3 mb s3://%BUCKET_NAME% --region %REGION% 2>nul
if errorlevel 1 (
    echo i Bucket already exists
) else (
    echo √ Bucket created!
)
echo.

echo Step 3: Configuring bucket for static website hosting...
aws s3 website s3://%BUCKET_NAME% --index-document landing.html --error-document landing.html
echo √ Website hosting configured!
echo.

echo Step 4: Setting bucket policy for public access...
(
echo {
echo   "Version": "2012-10-17",
echo   "Statement": [
echo     {
echo       "Sid": "PublicReadGetObject",
echo       "Effect": "Allow",
echo       "Principal": "*",
echo       "Action": "s3:GetObject",
echo       "Resource": "arn:aws:s3:::%BUCKET_NAME%/*"
echo     }
echo   ]
echo }
) > bucket-policy.json

aws s3api put-bucket-policy --bucket %BUCKET_NAME% --policy file://bucket-policy.json
del bucket-policy.json
echo √ Bucket policy set!
echo.

echo Step 5: Disabling block public access...
aws s3api put-public-access-block --bucket %BUCKET_NAME% --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
echo √ Public access enabled!
echo.

echo Step 6: Uploading files to S3...
echo This may take a minute...
aws s3 sync ./public s3://%BUCKET_NAME%/ --delete --cache-control "max-age=3600" --exclude "*.map"
echo √ Files uploaded!
echo.

echo Step 7: Setting content types...
aws s3 cp s3://%BUCKET_NAME%/ s3://%BUCKET_NAME%/ --recursive --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE >nul 2>&1
aws s3 cp s3://%BUCKET_NAME%/ s3://%BUCKET_NAME%/ --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE >nul 2>&1
aws s3 cp s3://%BUCKET_NAME%/ s3://%BUCKET_NAME%/ --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE >nul 2>&1
aws s3 cp s3://%BUCKET_NAME%/ s3://%BUCKET_NAME%/ --recursive --exclude "*" --include "*.png" --content-type "image/png" --metadata-directive REPLACE >nul 2>&1
echo √ Content types set!
echo.

echo ==========================================
echo √ Deployment Successful!
echo ==========================================
echo.
echo Website URL: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
echo.
echo Next Steps:
echo 1. Open the URL above in your browser
echo 2. Test the recommendation form
echo 3. Share the URL with others!
echo.
echo Note: Make sure your backend API is deployed and the API URL
echo is correctly set in public/app.js
echo.
pause
