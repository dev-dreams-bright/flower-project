@echo off
chcp 65001 >nul
echo ========================================
echo Git 자동 동기화 (Pull + Push)
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

:: Git 저장소 초기화 (없는 경우)
if not exist ".git" (
    echo [단계 1] Git 저장소 초기화 중...
    git init
    echo Git 저장소가 생성되었습니다.
    echo.
    
    echo 원격 저장소 URL을 입력하세요 (예: https://github.com/username/repo.git):
    set /p REMOTE_URL=
    if not "%REMOTE_URL%"=="" (
        git remote add origin %REMOTE_URL%
        echo 원격 저장소가 추가되었습니다.
    )
    echo.
)

:: Pull 먼저 실행
echo [단계 2] 원격 저장소에서 최신 변경사항 가져오는 중...
git pull origin main 2>nul
if errorlevel 1 (
    git pull origin master 2>nul
)
echo.

:: 현재 상태 확인
echo [단계 3] 현재 Git 상태 확인 중...
git status
echo.

:: 변경사항 추가
echo [단계 4] 변경된 파일 추가 중...
git add .
echo.

:: 커밋
echo [단계 5] 커밋 생성 중...
set COMMIT_MSG=Auto sync: %date% %time%
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo 커밋할 변경사항이 없습니다.
) else (
    echo 커밋이 생성되었습니다: %COMMIT_MSG%
)
echo.

:: Push
echo [단계 6] 원격 저장소에 업로드 중...
git push -u origin main 2>nul
if errorlevel 1 (
    git push -u origin master 2>nul
    if errorlevel 1 (
        echo [경고] Push 실패. 원격 저장소가 설정되어 있는지 확인하세요.
    ) else (
        echo Push 성공!
    )
) else (
    echo Push 성공!
)

echo.
echo ========================================
echo 동기화 완료!
echo ========================================
pause
