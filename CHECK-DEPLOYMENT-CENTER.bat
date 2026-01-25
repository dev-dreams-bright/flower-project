@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure 배포 센터 확인
echo ========================================
echo.
echo 배포 히스토리를 확인합니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/vstscd
echo.
echo ========================================
echo 확인 사항:
echo ========================================
echo.
echo 1. 최상단 배포 찾기
echo 2. 시간 확인: 13:14 (오늘)
echo 3. 상태: "성공" 또는 "활성"
echo 4. 커밋 메시지: "chore: bump backend version..."
echo.
echo ========================================
echo 문제 진단:
echo ========================================
echo.
echo [A] 최신 배포가 "성공"인데 서버 안 됨
echo     → 강제 중지/시작 필요
echo.
echo [B] 최신 배포가 "실패"
echo     → 배포 로그 확인 필요
echo.
echo [C] 최신 배포가 없음 (예전 배포만)
echo     → GitHub Actions 재실행 필요
echo.
pause
