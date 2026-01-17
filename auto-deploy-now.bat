@echo off
chcp 65001 >nul
echo ================================================
echo 자동 배포 시작!
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 변경사항 추가...
git add .
echo.

echo [2/4] 커밋 생성...
git commit -m "Update: 프론트엔드 UI 개선"
echo.

echo [3/4] GitHub에 업로드...
git push origin main
echo.

echo [4/4] 완료!
echo.
echo ================================================
echo 배포 완료!
echo GitHub Actions 확인:
echo https://github.com/dev-dreams-bright/flower-project/actions
echo ================================================
echo.
pause
