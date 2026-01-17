@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 첫 업로드 스크립트
echo ========================================
echo.

cd /d "%~dp0"

:: Git 저장소 초기화
echo [1/6] Git 저장소 초기화 중...
git init
echo.

:: 원격 저장소 추가
echo [2/6] 원격 저장소 연결 중...
git remote add origin https://github.com/dev-dreams-bright/flower-project.git
echo 원격 저장소가 연결되었습니다!
echo.

:: 브랜치 이름을 main으로 변경
echo [3/6] 기본 브랜치를 main으로 설정 중...
git branch -M main
echo.

:: 모든 파일 추가
echo [4/6] 모든 파일 추가 중...
git add .
echo 파일이 추가되었습니다!
echo.

:: 첫 커밋
echo [5/6] 첫 커밋 생성 중...
git commit -m "Initial commit: Floral Boutique website"
echo 커밋이 생성되었습니다!
echo.

:: Push
echo [6/6] GitHub에 업로드 중...
git push -u origin main
if errorlevel 1 (
    echo.
    echo [오류] Push 실패!
    echo GitHub 계정 인증이 필요할 수 있습니다.
    echo.
    echo 인증 창이 나타나면 GitHub 계정으로 로그인하세요.
    echo 또는 Personal Access Token을 사용하세요.
    echo.
) else (
    echo.
    echo ========================================
    echo ✅ 성공! GitHub에 업로드 완료!
    echo ========================================
    echo.
    echo 웹사이트 확인: https://github.com/dev-dreams-bright/flower-project
    echo.
)

pause
