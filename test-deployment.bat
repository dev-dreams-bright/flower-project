@echo off
chcp 65001 >nul
echo ========================================
echo 배포 테스트 가이드
echo ========================================
echo.
echo 커밋 정보:
echo - 커밋 ID: 37f0242
echo - 메시지: Fix: 로그인/로그아웃 버튼 동적 변경 + 백엔드 5초 타임아웃
echo.
echo ========================================
echo 테스트 진행 방법
echo ========================================
echo.
echo [1단계] GitHub Actions 확인 (30초 후)
echo    URL: https://github.com/dev-dreams-bright/flower-project/actions
echo    기대: 녹색 체크마크 또는 주황색 진행 중
echo.
echo [2단계] 사이트 테스트 (2-3분 후)
echo    URL: https://proud-river-0710b0610.1.azurestaticapps.net/flower.html
echo    방법: Ctrl+Shift+N (시크릿 모드) 또는 Ctrl+Shift+R (강력 새로고침)
echo.
echo [3단계] 브라우저 콘솔 확인 (F12)
echo    기대 로그:
echo    - 백엔드 타임아웃 (5초 초과)
echo    - Supabase 직접 연결로 폴백
echo    - Supabase 폴백 성공
echo    - 상품 렌더링 완료
echo.
echo [4단계] 상품 카드 확인
echo    기대: 19개 상품 카드 표시
echo.
echo [5단계] 로그인 테스트
echo    - 로그인 전: "로그인" 버튼
echo    - 로그인 후: "로그아웃" 버튼
echo.
echo ========================================
echo 타이머 시작!
echo ========================================
echo.
echo 30초 후 GitHub Actions 확인...
timeout /t 30 /nobreak
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
echo 2분 후 사이트 오픈...
timeout /t 90 /nobreak
start https://proud-river-0710b0610.1.azurestaticapps.net/flower.html
echo.
echo ========================================
echo 테스트 시작!
echo ========================================
pause
