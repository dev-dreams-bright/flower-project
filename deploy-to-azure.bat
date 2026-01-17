@echo off
chcp 65001 >nul
echo ========================================
echo Azure 배포 자동화 시작!
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] 변경사항 확인 중...
git status
echo.

echo [2/5] 모든 파일 추가 중...
git add .
echo.

echo [3/5] 커밋 생성 중...
git commit -m "Fix: Azure 순수 HTML 배포 설정 (skip_app_build 추가)"
echo.

echo [4/5] GitHub에 업로드 중...
git push origin main
echo.

echo [5/5] 완료!
echo.
echo ========================================
echo GitHub에 업로드 완료!
echo Azure가 자동으로 배포를 시작합니다.
echo ========================================
echo.
echo 배포 진행 상황 확인:
echo https://github.com/dev-dreams-bright/flower-project/actions
echo.
pause
