@echo off
chcp 65001 >nul
cls
echo ========================================
echo 🚨 Azure 강제 재배포 (3단계)
echo ========================================
echo.
echo 문제: Azure가 새 코드 안 씀 (1.0.0 실행 중)
echo 해결: 강제로 새 코드 로드
echo.
pause

REM ========================================
REM 1단계: 중지
REM ========================================
cls
echo ========================================
echo [1/3] App Service 중지
echo ========================================
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/appServices
echo.
echo 1. 상단 "중지" (Stop) 버튼 클릭
echo 2. "예" 클릭
echo 3. 상태가 "중지됨"으로 바뀔 때까지 대기
echo.
pause

REM ========================================
REM 2단계: 30초 대기
REM ========================================
cls
echo ========================================
echo [2/3] 30초 대기 중...
echo ========================================
echo.
echo Azure 캐시 클리어를 위해 30초 대기합니다.
echo.
timeout /t 30 /nobreak
echo.
echo ✅ 대기 완료!
echo.
pause

REM ========================================
REM 3단계: 시작
REM ========================================
cls
echo ========================================
echo [3/3] App Service 시작
echo ========================================
echo.
echo Azure Portal로 돌아가서:
echo.
echo 1. 상단 "시작" (Start) 버튼 클릭
echo 2. 상태가 "실행 중"으로 바뀔 때까지 대기 (1-2분)
echo.
pause

REM ========================================
REM 로그 확인
REM ========================================
cls
echo ========================================
echo 로그 스트림 확인
echo ========================================
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/logStream
echo.
echo ========================================
echo ✅ 성공 확인 방법:
echo ========================================
echo.
echo 1. 타임스탬프가 "04:xx" 이후 (새 로그!)
echo 2. backend@1.0.1 start (버전 변경!)
echo 3. "서버가 포트 8080에서 실행 중입니다"
echo.
echo ========================================
echo ❌ 실패 확인:
echo ========================================
echo.
echo - 여전히 "03:xx" 타임스탬프
echo - backend@1.0.0 start
echo - Error: Cannot find module 'dotenv'
echo.
echo 실패하면 다시 알려주세요!
echo.
pause
