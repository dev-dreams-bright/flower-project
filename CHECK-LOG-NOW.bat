@echo off
chcp 65001 >nul
cls
echo ========================================
echo 로그 스트림 새로고침
echo ========================================
echo.
echo 환경 변수가 이미 있으면 재시작만 하면 됩니다!
echo.
echo Azure Log Stream을 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo 확인 방법:
echo ========================================
echo.
echo 1. F5 눌러서 새로고침
echo 2. 최신 로그 보기 (시간 확인!)
echo.
echo ========================================
echo ✅ 성공 신호:
echo ========================================
echo.
echo 1. backend@1.0.1 start (버전 확인)
echo 2. 백엔드 서버 실행 중: http://localhost:3001
echo 3. "상품 조회 실패" 메시지 없음!
echo.
echo ========================================
echo ❌ 실패 신호:
echo ========================================
echo.
echo - 여전히 "상품 조회 실패: Invalid API key"
echo - 이 경우 SUPABASE_SERVICE_ROLE_KEY 값 확인 필요
echo.
pause
echo.
echo ========================================
echo 만약 여전히 에러가 나온다면:
echo ========================================
echo.
echo 1. Azure Portal에서 App Service 페이지로 이동
echo 2. 상단 "다시 시작" 버튼 클릭
echo 3. 1-2분 대기 후 로그 재확인
echo.
echo App Service 페이지를 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/appServices
echo.
pause
