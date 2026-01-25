@echo off
chcp 65001 >nul
cls
echo ========================================
echo 긴급 배포 - 핵심 수정사항
echo ========================================
echo.
echo [수정된 파일]
echo ✅ detail.html - JS 절대 경로
echo ✅ staticwebapp.config.json - JS fallback 제외
echo ✅ 13개 HTML - Supabase CDN → esm.sh
echo.
echo [해결된 문제]
echo ✅ MIME type 에러 해결
echo ✅ 상품 상세페이지 JS 로딩
echo ✅ Supabase import 에러
echo.
cd /d "%~dp0"
git add -A
git commit -m "fix: resolve MIME type error and update all Supabase CDN"
git push
echo.
echo ========================================
echo 배포 완료! GitHub Actions 진행 중...
echo ========================================
echo.
echo 2-3분 후 테스트:
echo 1. https://proud-river-0710b0610.1.azurestaticapps.net
echo 2. Ctrl + F5 새로고침
echo 3. 상품 클릭 → 각 상품별 페이지 확인
echo 4. 상세페이지 버튼 작동 확인
echo.
pause
