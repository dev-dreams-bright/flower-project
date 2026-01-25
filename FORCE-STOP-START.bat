@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure 강제 중지 후 시작
echo ========================================
echo.
echo "다시 시작"이 안 먹힐 때 사용!
echo 완전히 중지 후 다시 시작합니다.
echo.
echo Azure Portal을 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/appServices
echo.
echo ========================================
echo 실행 방법:
echo ========================================
echo.
echo [1단계] 중지
echo 1. 상단 "중지" (Stop) 버튼 클릭
echo 2. 확인 팝업에서 "예" 클릭
echo 3. 30초 대기
echo.
echo [2단계] 시작
echo 4. 상단 "시작" (Start) 버튼 클릭
echo 5. 1-2분 대기
echo.
echo ========================================
echo 중요!
echo ========================================
echo.
echo 중지 후 꼭 30초 대기하고 시작하세요!
echo.
pause
echo.
echo 시작 후 로그 확인...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo 기대 로그:
echo ========================================
echo.
echo ✅ backend@1.0.1 start (버전 변경 확인!)
echo ✅ npm start
echo ✅ 서버가 포트 8080에서 실행 중입니다
echo.
pause
