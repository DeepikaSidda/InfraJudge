@echo off
echo Invalidating CloudFront cache...
aws cloudfront create-invalidation --distribution-id E20UCNM0IELCBK --paths "/*"
echo.
echo Cache invalidation started!
echo Wait 1-2 minutes, then try the website again.
echo.
echo CloudFront URL: https://dd9j9qxixxdz3.cloudfront.net
pause
