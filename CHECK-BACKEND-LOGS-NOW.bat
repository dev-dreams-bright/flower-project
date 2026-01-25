@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure 백엔드 로그 긴급 확인
echo ========================================
echo.
echo 배포는 완료됐지만 서버가 응답 안 함!
echo Azure 로그 스트림을 열어서 확인합니다...
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo 확인 사항:
echo ========================================
echo.
echo ✅ 정상:
echo    - npm start
echo    - 서버가 포트 8080에서 실행 중입니다
echo    - ✅ Supabase 연결 완료
echo.
echo ❌ 에러:
echo    - Error: Cannot find module 'dotenv'
echo    - 크래시 반복
echo.
pause
