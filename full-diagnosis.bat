@echo off
chcp 65001 >nul
cls
echo ========================================
echo 전체 시스템 진단 도구
echo ========================================
echo.
echo [1단계] GitHub 배포 상태 확인
echo.
start https://github.com/dev-dreams-bright/flower-project/actions
echo GitHub Actions 페이지를 열었습니다...
echo.
echo 확인사항:
echo - 최상단 워크플로우 2개 확인
echo   1. "Azure Static Web Apps CI/CD" (프론트엔드)
echo   2. "Deploy Backend to Azure App Service" (백엔드)
echo.
pause
echo.
echo ========================================
echo [2단계] 프론트엔드 시크릿 모드 테스트
echo ========================================
echo.
echo 시크릿 모드 브라우저를 열고...
echo F12 (개발자 도구) → Console 탭 확인
echo.
start msedge -inprivate https://proud-river-0710b0610.1.azurestaticapps.net/flower.html
echo.
echo 기대 로그:
echo - ✅ Supabase 연결 완료
echo - 🔗 API_BASE: https://flower-backend-api...
echo - 상품 로드 에러: 백엔드 타임아웃 (5초 초과)
echo - 🔄 Supabase 직접 연결로 폴백...
echo - ✅ Supabase 폴백 성공!
echo - ✅ 상품 렌더링 완료
echo.
pause
echo.
echo ========================================
echo [3단계] 백엔드 수동 배포 트리거
echo ========================================
echo.
start https://github.com/dev-dreams-bright/flower-project/actions/workflows/azure-backend-deploy.yml
echo.
echo 필수 작업:
echo 1. "Run workflow" 버튼 클릭
echo 2. "Branch: main" 확인
echo 3. 녹색 "Run workflow" 클릭
echo.
pause
echo.
echo ========================================
echo 진단 완료!
echo ========================================
pause
