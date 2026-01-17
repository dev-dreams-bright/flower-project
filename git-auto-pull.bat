@echo off
chcp 65001 >nul
echo ========================================
echo Git 자동 Pull 스크립트
echo ========================================
echo.

cd /d "%~dp0"

:: Git이 설치되어 있는지 확인
git --version >nul 2>&1
if errorlevel 1 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo Git을 먼저 설치해주세요: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: Git 저장소 확인
if not exist ".git" (
    echo [오류] Git 저장소가 초기화되어 있지 않습니다.
    echo git-auto-push.bat를 먼저 실행해주세요.
    pause
    exit /b 1
)

:: 현재 상태 확인
echo [1/2] 현재 Git 상태 확인 중...
git status
echo.

:: Pull
echo [2/2] 원격 저장소에서 최신 변경사항 가져오는 중...
git pull origin main 2>nul
if errorlevel 1 (
    echo main 브랜치 pull 실패, master 브랜치로 시도...
    git pull origin master 2>nul
    if errorlevel 1 (
        echo [경고] Pull 실패. 원격 저장소가 설정되어 있는지 확인하세요.
    ) else (
        echo Pull 성공!
    )
) else (
    echo Pull 성공!
)

echo.
echo ========================================
echo 완료!
echo ========================================
pause
