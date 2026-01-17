@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 완전 자동 설정 스크립트
echo ========================================
echo.

cd /d "%~dp0"

:: Git 사용자 정보 입력 받기
echo Git 사용자 정보를 설정합니다.
echo.
echo GitHub 이메일 주소를 입력하세요 (예: yourname@example.com):
set /p USER_EMAIL=이메일: 

echo.
echo GitHub 사용자 이름을 입력하세요 (예: dev-dreams-bright):
set /p USER_NAME=이름: 

echo.
echo ========================================
echo 설정을 시작합니다...
echo ========================================
echo.

:: Git 사용자 정보 설정
echo [1/8] Git 사용자 정보 설정 중...
git config --global user.email "%USER_EMAIL%"
git config --global user.name "%USER_NAME%"
echo ✓ 이메일: %USER_EMAIL%
echo ✓ 이름: %USER_NAME%
echo.

:: 기존 .git 폴더가 있으면 삭제
if exist ".git" (
    echo [2/8] 기존 Git 저장소 초기화...
    rd /s /q .git
    echo.
)

:: Git 저장소 초기화
echo [3/8] Git 저장소 초기화 중...
git init
echo.

:: 원격 저장소 추가
echo [4/8] 원격 저장소 연결 중...
git remote add origin https://github.com/dev-dreams-bright/flower-project.git
echo 원격 저장소가 연결되었습니다!
echo.

:: 브랜치 이름을 main으로 변경
echo [5/8] 기본 브랜치를 main으로 설정 중...
git branch -M main
echo.

:: 모든 파일 추가
echo [6/8] 모든 파일 추가 중...
git add .
echo 파일이 추가되었습니다!
echo.

:: 첫 커밋
echo [7/8] 첫 커밋 생성 중...
git commit -m "Initial commit: Floral Boutique website"
if errorlevel 1 (
    echo [오류] 커밋 생성 실패!
    pause
    exit /b 1
) else (
    echo 커밋이 생성되었습니다!
)
echo.

:: Push
echo [8/8] GitHub에 업로드 중...
echo (GitHub 로그인 창이 나타나면 로그인해주세요)
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo ========================================
    echo [오류] Push 실패!
    echo ========================================
    echo.
    echo 가능한 원인:
    echo 1. GitHub 로그인이 필요합니다
    echo 2. 인터넷 연결을 확인하세요
    echo 3. 저장소 권한을 확인하세요
    echo.
    echo 다시 시도하려면 이 파일을 다시 실행하세요.
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo ✅ 성공! GitHub에 업로드 완료!
    echo ========================================
    echo.
    echo 🌐 웹사이트 확인: 
    echo https://github.com/dev-dreams-bright/flower-project
    echo.
    echo 📝 설정된 정보:
    echo - 이메일: %USER_EMAIL%
    echo - 이름: %USER_NAME%
    echo.
    echo 🎉 이제 다음 파일들을 사용하세요:
    echo - git-sync.bat (작업 전후 동기화)
    echo - git-auto-push.bat (업로드)
    echo - git-auto-pull.bat (다운로드)
    echo.
)

pause
