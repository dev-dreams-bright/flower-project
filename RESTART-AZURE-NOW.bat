@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure App Service 긴급 재시작
echo ========================================
echo.
echo 배포는 완료됐지만 Azure가 새 코드를 실행 안 함!
echo 수동 재시작이 필요합니다.
echo.
echo Azure Portal을 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/appServices
echo.
echo ========================================
echo 재시작 방법:
echo ========================================
echo.
echo 1. 상단 메뉴에서 "다시 시작" (Restart) 버튼 클릭
echo 2. 확인 팝업에서 "예" 클릭
echo 3. 1-2분 대기
echo 4. 로그 스트림 확인
echo.
echo 예상 소요 시간: 1-2분
echo.
pause
echo.
echo 재시작 후 로그 확인...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo 기대 로그:
echo ========================================
echo.
echo ✅ backend@1.0.1 start (버전 확인!)
echo ✅ npm start
echo ✅ 서버가 포트 8080에서 실행 중입니다
echo.
pause
