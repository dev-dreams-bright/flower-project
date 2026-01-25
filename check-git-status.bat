@echo off
chcp 65001 >nul
echo ========================================
echo Git 상태 종합 진단
echo ========================================
echo.
echo [1] 로컬 변경사항 확인
git status --short
echo.
echo [2] 최근 커밋 3개
git log --oneline -3
echo.
echo [3] 원격 저장소와 비교
git fetch origin
git log HEAD..origin/main --oneline
IF %ERRORLEVEL% EQU 0 (
    echo 로컬이 원격보다 뒤쳐져 있습니다!
) ELSE (
    echo 로컬과 원격이 동기화되어 있습니다.
)
echo.
echo [4] 푸시되지 않은 커밋
git log origin/main..HEAD --oneline
IF %ERRORLEVEL% EQU 0 (
    echo 푸시 필요!
) ELSE (
    echo 모든 커밋이 푸시되었습니다.
)
echo.
pause
