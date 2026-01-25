@echo off
chcp 65001 >nul
echo ========================================
echo 빠른 배포 스크립트
echo ========================================
echo.
echo [1/3] 모든 변경사항 추가...
git add -A
echo.
echo [2/3] 커밋 생성...
git commit -m "Fix: 백엔드 타임아웃 + Supabase 폴백 + 로그아웃 버튼"
echo.
echo [3/3] GitHub에 푸시...
git push origin main
echo.
echo ========================================
echo 완료! 2분 후 사이트 확인:
echo https://proud-river-0710b0610.1.azurestaticapps.net/
echo ========================================
pause
