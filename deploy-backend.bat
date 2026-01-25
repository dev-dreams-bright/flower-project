@echo off
chcp 65001 >nul
echo ========================================
echo 백엔드 배포 스크립트
echo ========================================
echo.
echo [1/4] 변경사항 스테이징...
git add .github/workflows/azure-backend-deploy.yml
echo ✅ 완료
echo.
echo [2/4] 커밋 생성...
git commit -m "Fix: Azure 백엔드 배포 시 node_modules 포함"
echo ✅ 완료
echo.
echo [3/4] GitHub에 푸시...
git push origin main
echo ✅ 완료
echo.
echo [4/4] 백엔드 수동 트리거
echo.
echo GitHub Actions에서 백엔드 배포를 수동 실행해야 합니다:
echo.
echo 1. https://github.com/dev-dreams-bright/flower-project/actions
echo 2. 왼쪽: "Deploy Backend to Azure App Service" 클릭
echo 3. 오른쪽: "Run workflow" 버튼 클릭
echo 4. "Run workflow" 확인
echo.
start https://github.com/dev-dreams-bright/flower-project/actions/workflows/azure-backend-deploy.yml
echo.
echo ========================================
echo 백엔드 배포 트리거 대기 중...
echo ========================================
pause
