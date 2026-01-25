@echo off
chcp 65001 >nul
echo ========================================
echo 4단계: 백엔드 정상 작동 확인
echo ========================================
echo.
echo [A] Azure 로그 스트림 확인
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo Azure Portal이 열립니다...
echo 로그 스트림에서 확인:
echo.
echo ✅ 정상 로그:
echo    - npm start
echo    - 서버가 포트 8080에서 실행 중입니다
echo    - ✅ Supabase 연결 완료
echo.
echo ❌ 에러 로그:
echo    - Error: Cannot find module 'dotenv'
echo    - 크래시 반복
echo.
pause
echo.
echo [B] API 직접 테스트
echo.
start https://flower-backend-api-g0fuavb9b3gxhqgm.koreacentral-01.azurewebsites.net/api/products
echo.
echo 브라우저가 열리고...
echo.
echo ✅ 정상: JSON 배열 (19개 상품)
echo ❌ 에러: 타임아웃 또는 에러 메시지
echo.
pause
