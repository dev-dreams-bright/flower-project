@echo off
chcp 65001 >nul
echo ========================================
echo 2단계: 프론트엔드 상품 표시 테스트
echo ========================================
echo.
echo 시크릿 모드로 사이트를 엽니다...
start msedge -inprivate https://proud-river-0710b0610.1.azurestaticapps.net/flower.html
echo.
echo ========================================
echo 테스트 방법:
echo ========================================
echo.
echo 1. F12 키를 누르세요
echo 2. "Console" 탭 클릭
echo 3. 로그 확인
echo.
echo ========================================
echo 기대 로그 (정상):
echo ========================================
echo ✅ Supabase 연결 완료!
echo 🔗 API_BASE: https://flower-backend-api...
echo 🌸 메인 페이지 초기화 시작
echo ⏳ Supabase 로딩 대기 중...
echo ✅ Supabase 준비 완료
echo 📦 productsArray: [...]
echo ✅ 상품 렌더링 완료
echo.
echo ========================================
echo 결과:
echo ========================================
echo.
echo [A] 상품 19개 카드 보임 = 정상! (3단계로)
echo [B] "등록된 상품이 없습니다" = 문제! (로그 확인)
echo.
pause
