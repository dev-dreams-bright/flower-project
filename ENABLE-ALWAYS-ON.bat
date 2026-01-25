@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure Always On 설정
echo ========================================
echo.
echo B1 플랜에서는 Always On을 켜야 합니다!
echo.
echo Azure Portal Configuration을 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/configuration
echo.
echo ========================================
echo 설정 방법:
echo ========================================
echo.
echo 1. "일반 설정" (General settings) 탭 클릭
echo 2. "Always On" 찾기
echo 3. "켜기" (On)로 변경
echo 4. 상단 "저장" 버튼 클릭
echo 5. "계속" 클릭
echo.
echo ========================================
echo Always On이란?
echo ========================================
echo.
echo - 앱이 항상 실행 상태 유지
echo - Cold Start 방지
echo - 배포 후 자동 재시작
echo.
pause
