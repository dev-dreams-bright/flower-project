@echo off
chcp 65001 >nul
cls
echo ========================================
echo 프론트엔드 에러 수정 배포
echo ========================================
echo.
echo 수정된 파일:
echo - frontend/flower.html (Supabase CDN)
echo - frontend/flower.js (return 에러)
echo.
cd /d "%~dp0"
git add frontend/flower.html frontend/flower.js
git commit -m "fix: frontend JS errors"
git push
echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo 2-3분 후 웹사이트에서 Ctrl+F5로 새로고침하세요!
echo.
pause
