@echo off
chcp 65001 >nul
cls
echo ========================================
echo 최종 테스트 (재시작 후)
echo ========================================
echo.
echo [1/3] 백엔드 API 테스트
echo.
start https://flower-backend-api-g0fuavb9b3gxhqgm.koreacentral-01.azurewebsites.net/api/products
echo.
echo 브라우저에 JSON이 보이면 성공!
echo.
pause
echo.
echo [2/3] 프론트엔드 테스트
echo.
start https://proud-river-0710b0610.1.azurestaticapps.net/flower.html
echo.
echo 상품 19개가 보이면 성공!
echo.
pause
echo.
echo [3/3] 개발자 콘솔 확인
echo.
echo F12 누르고 Console 탭에서:
echo - ✅ Supabase 연결 완료
echo - ✅ 상품 렌더링 완료
echo - 📦 productsArray: Array(19)
echo.
pause
