@echo off
chcp 65001 >nul
echo ========================================
echo GitHub Actions 배포 상태 확인
echo ========================================
echo.
echo 최근 커밋: 37f0242
echo 메시지: Fix: 로그인/로그아웃 버튼 동적 변경 + 백엔드 5초 타임아웃
echo.
echo 브라우저로 GitHub Actions 페이지를 엽니다...
echo.
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
echo ========================================
echo 확인 사항:
echo ========================================
echo.
echo 1. 최상단 워크플로우 확인
echo    - 커밋 메시지: "Fix: 로그인/로그아웃..."
echo    - 상태: 🟡 주황색 (진행 중) 또는 ✅ 녹색 (완료)
echo.
echo 2. 실패 (❌ 빨간색) 인 경우:
echo    - 워크플로우 클릭
echo    - 로그 확인
echo    - 에러 메시지 복사
echo.
echo 3. 성공 (✅ 녹색) 인 경우:
echo    - 1분 후 사이트 테스트 가능
echo.
echo ========================================
pause
