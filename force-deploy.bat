@echo off
chcp 65001 >nul
echo ================================================
echo Azure 배포 강제 업데이트!
echo ================================================
echo.

cd /d "%~dp0"

echo [1/6] Git 상태 확인...
git status
echo.

echo [2/6] .github 폴더 추가...
git add .github
echo.

echo [3/6] 모든 파일 추가...
git add .
echo.

echo [4/6] 커밋 생성...
git commit -m "Fix: Azure 배포 설정 업데이트 (app_build_command 추가)"
echo.

echo [5/6] 강제 Push...
git push origin main
echo.

echo [6/6] 완료!
echo.
echo ================================================
echo GitHub에 업로드 완료!
echo 1분 후 GitHub Actions 확인:
echo https://github.com/dev-dreams-bright/flower-project/actions
echo ================================================
echo.
pause
