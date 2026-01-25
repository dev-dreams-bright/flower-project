@echo off
chcp 65001 >nul
cd /d "C:\Users\com\Desktop\사업\신사업"
echo ========================================
echo 백엔드 자동 배포 시작
echo ========================================
echo.
echo [1/3] Git add...
git add backend/package.json
echo.
echo [2/3] Git commit...
git commit -m "chore: bump backend version to trigger deployment with node_modules fix"
echo.
echo [3/3] Git push...
git push
echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo GitHub Actions에서 확인:
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
pause
