@echo off
chcp 65001 >nul
echo ================================================
echo 새 배포 트리거!
echo ================================================
echo.

cd /d "%~dp0"

git add .
git commit -m "Trigger: Azure 재배포"
git push origin main

echo.
echo ================================================
echo ✅ 업로드 완료!
echo.
echo 배포 진행 확인 (1분 후):
echo https://github.com/dev-dreams-bright/flower-project/actions
echo ================================================
pause
