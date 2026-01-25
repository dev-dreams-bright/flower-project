@echo off
chcp 65001 >nul
cls
echo ========================================
echo 백엔드 수동 배포 트리거
echo ========================================
echo.
echo GitHub에서 백엔드 배포를 수동으로 시작합니다...
echo.
echo 브라우저가 열리면:
echo 1. "Run workflow" 버튼 클릭
echo 2. "Branch: main" 확인
echo 3. 녹색 "Run workflow" 클릭
echo.
start https://github.com/dev-dreams-bright/flower-project/actions/workflows/azure-backend-deploy.yml
echo.
pause
echo.
echo 배포 진행 상황을 확인하려면:
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
pause
