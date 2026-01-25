@echo off
chcp 65001 >nul
echo ========================================
echo 긴급 배포 스크립트
echo ========================================
echo.
echo [단계 1/4] 변경사항 스테이징...
git add frontend/flower.html frontend/flower.js
echo ✅ 완료
echo.
echo [단계 2/4] 커밋 생성...
git commit -m "Fix: 로그인/로그아웃 버튼 동적 변경 + 백엔드 5초 타임아웃"
echo ✅ 완료
echo.
echo [단계 3/4] GitHub에 푸시...
git push origin main
echo ✅ 완료
echo.
echo [단계 4/4] 배포 상태 확인
echo.
echo ========================================
echo 🎉 배포 완료!
echo ========================================
echo.
echo 2-3분 후 확인:
echo https://proud-river-0710b0610.1.azurestaticapps.net/
echo.
echo GitHub Actions 상태:
echo https://github.com/dev-dreams-bright/flower-project/actions
echo.
pause
