@echo off
chcp 65001 >nul
cd /d "%~dp0"
cls
echo ========================================
echo 백엔드 긴급 배포
echo ========================================
echo.
echo [단계 1/4] 변경사항 확인
git status
echo.
echo [단계 2/4] 변경사항 추가
git add backend/package.json
echo.
echo [단계 3/4] 커밋 생성
git commit -m "chore: bump backend version to trigger deployment with node_modules fix"
echo.
echo [단계 4/4] GitHub에 푸시
git push
echo.
echo ========================================
echo 완료!
echo ========================================
echo.
echo 10초 후 GitHub Actions 페이지가 열립니다...
timeout /t 10
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
pause
