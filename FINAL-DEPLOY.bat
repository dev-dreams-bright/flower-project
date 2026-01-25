@echo off
chcp 65001 >nul
cls
echo ========================================
echo 최종 배포 (모든 수정 완료)
echo ========================================
echo.
echo 수정 내용:
echo ✅ 13개 HTML Supabase CDN → esm.sh
echo ✅ flower.html Supabase 에러 수정
echo ✅ flower.js return 에러 수정
echo.
cd /d "%~dp0"
git add -A
git commit -m "fix: change all Supabase CDN to esm.sh"
git push
echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo 2-3분 후:
echo 1. https://proud-river-0710b0610.1.azurestaticapps.net 열기
echo 2. Ctrl + F5 (강력 새로고침)
echo 3. F12 → Console 확인
echo 4. 로그인 테스트
echo 5. 상품 클릭 테스트
echo.
pause
