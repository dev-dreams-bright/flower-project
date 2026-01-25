@echo off
chcp 65001 >nul
cls
echo ========================================
echo 🌸 꽃보라가든 시스템 진단
echo ========================================
echo.
echo 총 5단계 테스트를 진행합니다.
echo 각 단계를 순서대로 실행하세요.
echo.
echo ========================================
echo 단계별 배치 파일:
echo ========================================
echo.
echo [1] check-step1.bat - GitHub Actions 배포 상태
echo [2] check-step2.bat - 프론트엔드 상품 표시
echo [3] check-step3.bat - 백엔드 수동 배포
echo [4] check-step4.bat - 백엔드 작동 확인
echo [5] check-step5.bat - 전체 기능 테스트
echo.
echo ========================================
echo 시작 방법:
echo ========================================
echo.
echo 1. check-step1.bat 더블클릭
echo 2. 화면 지시에 따라 확인
echo 3. 문제 없으면 check-step2.bat 실행
echo 4. 순서대로 step5까지 진행
echo.
echo ========================================
pause
echo.
echo check-step1.bat을 실행합니다...
call check-step1.bat
