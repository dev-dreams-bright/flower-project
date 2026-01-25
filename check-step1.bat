@echo off
chcp 65001 >nul
echo ========================================
echo 1단계: 프론트엔드 배포 상태 확인
echo ========================================
echo.
echo GitHub Actions 페이지를 엽니다...
start https://github.com/dev-dreams-bright/flower-project/actions
echo.
echo ========================================
echo 확인 사항:
echo ========================================
echo.
echo 최상단 워크플로우 찾기:
echo - "Azure Static Web Apps CI/CD"
echo - 커밋: "Fix: 로그인/로그아웃 버튼 동적 변경..."
echo - 커밋 ID: 37f0242
echo.
echo 상태 확인:
echo [✅] 녹색 체크마크 = 배포 완료
echo [🟡] 주황색 = 진행 중
echo [❌] 빨간 X = 실패
echo.
echo ========================================
pause
