@echo off
chcp 65001 >nul
echo ========================================
echo Git 자동 Push 스크립트
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
    echo [1/5] Git 저장소 초기화 중...
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

:: 현재 상태 확인
echo [2/5] 현재 Git 상태 확인 중...
git status
echo.

:: 모든 변경사항 추가
echo [3/5] 변경된 파일 추가 중...
git add .
echo 모든 파일이 스테이징되었습니다.
echo.

:: 커밋
echo [4/5] 커밋 생성 중...
set COMMIT_MSG=Update: %date% %time%
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo 커밋할 변경사항이 없습니다.
) else (
    echo 커밋이 생성되었습니다: %COMMIT_MSG%
)
echo.

:: Push
echo [5/5] 원격 저장소에 업로드 중...
git push -u origin main 2>nul
if errorlevel 1 (
    echo main 브랜치 push 실패, master 브랜치로 시도...
    git push -u origin master 2>nul
    if errorlevel 1 (
        echo [경고] Push 실패. 원격 저장소가 설정되어 있는지 확인하세요.
        echo 원격 저장소 설정: git remote add origin [URL]
    ) else (
        echo Push 성공!
    )
) else (
    echo Push 성공!
)

echo.
echo ========================================
echo 완료!
echo ========================================
pause
