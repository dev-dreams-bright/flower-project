@echo off
chcp 65001 >nul
echo ================================================
echo 자동 배포 시작!
echo ================================================
echo.

cd /d "%~dp0"

echo [1/6] GitHub에서 최신 변경사항 가져오기...
git pull origin main
echo.

echo [2/6] 변경사항 추가...
git add .
echo.

echo [3/6] 커밋 생성...
git commit -m "Major Update: UI 완전 개선 + Supabase 백엔드 가이드"
if errorlevel 1 (
    echo 커밋할 변경사항이 없습니다.
)
echo.

echo [4/6] GitHub에 업로드...
git push origin main
echo.

echo [5/6] 배포 상태 확인...
echo GitHub Actions가 자동으로 배포를 시작합니다.
echo.

echo [6/6] 완료!
echo.
echo ================================================
echo 배포 완료!
echo.
echo 배포 진행 상황 확인:
echo https://github.com/dev-dreams-bright/flower-project/actions
echo.
echo Azure 사이트는 2-3분 후 업데이트됩니다!
echo ================================================
echo.
pause
