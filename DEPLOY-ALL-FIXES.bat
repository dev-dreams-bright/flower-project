@echo off
chcp 65001 >nul
cls
echo ========================================
echo 모든 수정사항 배포
echo ========================================
echo.
echo 수정된 내용:
echo.
echo ✅ 13개 HTML 파일 Supabase 에러 수정
echo ✅ flower.js return 에러 수정  
echo ✅ flower.html Supabase 에러 수정
echo.
echo 배포 시작...
echo.
cd /d "%~dp0"

echo [1/3] Git add...
git add -A

echo [2/3] Git commit...
git commit -m "fix: resolve all Supabase import errors and JS syntax errors"

echo [3/3] Git push...
git push

echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo GitHub Actions가 자동으로 배포합니다.
echo.
echo 2-3분 후:
echo 1. 웹사이트 열기: https://proud-river-0710b0610.1.azurestaticapps.net
echo 2. Ctrl + F5 (강력 새로고침)
echo 3. F12 → Console 확인 (에러 없어야 함!)
echo.
pause
