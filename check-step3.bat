@echo off
chcp 65001 >nul
echo ========================================
echo 3단계: 백엔드 수동 배포
echo ========================================
echo.
echo GitHub Actions 백엔드 워크플로우를 엽니다...
start https://github.com/dev-dreams-bright/flower-project/actions/workflows/azure-backend-deploy.yml
echo.
echo ========================================
echo 수동 실행 방법:
echo ========================================
echo.
echo 1. 오른쪽 위 "Run workflow" 버튼 클릭
echo 2. 드롭다운: "Branch: main" 확인
echo 3. 녹색 "Run workflow" 버튼 클릭
echo.
echo ========================================
echo 배포 진행 확인:
echo ========================================
echo.
echo - 페이지 새로고침 (F5)
echo - 최상단에 주황색 워크플로우 표시됨
echo - 클릭해서 진행 상황 모니터링
echo.
echo 예상 소요 시간: 5-7분
echo.
pause
