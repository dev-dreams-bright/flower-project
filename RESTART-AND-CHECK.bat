@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure App Service 재시작
echo ========================================
echo.
echo 환경 변수 설정 후 재시작 필요!
echo.
echo App Service를 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/appServices
echo.
echo ========================================
echo [1단계] 재시작
echo ========================================
echo.
echo 1. 상단 "다시 시작" (Restart) 버튼 클릭
echo 2. 확인 팝업에서 "예" 클릭
echo 3. 1-2분 대기
echo.
pause
echo.
echo ========================================
echo [2단계] 로그 확인
echo ========================================
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo ✅ 성공 확인 (필수!):
echo ========================================
echo.
echo 1. [dotenv] injecting env (4) from .env
echo    ^^^^^^^^^^^^^^^^^^^^^ 4개 이상!
echo.
echo 2. 백엔드 서버 실행 중: http://localhost:8080
echo                                      ^^^^^ 8080!
echo.
echo 3. "상품 조회 실패" 메시지 없음!
echo.
echo ========================================
echo ❌ 실패 신호:
echo ========================================
echo.
echo - injecting env (0)  ← 여전히 0개
echo - localhost:3001    ← 여전히 3001
echo - Invalid API key
echo.
echo 이 경우: 환경 변수 재확인 필요!
echo.
pause
echo.
echo ========================================
echo [3단계] 환경 변수 확인
echo ========================================
echo.
echo 만약 여전히 실패하면 환경 변수 다시 확인:
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/environmentVariablesAppSettings
echo.
echo 꼭 확인할 항목:
echo.
echo ✓ SUPABASE_URL
echo ✓ SUPABASE_SERVICE_ROLE_KEY
echo ✓ PORT = 8080
echo ✓ CORS_ORIGIN
echo.
echo 4개 모두 있는지 확인!
echo.
pause
