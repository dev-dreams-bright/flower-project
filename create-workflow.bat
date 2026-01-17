@echo off
chcp 65001 >nul
echo ========================================
echo Azure 워크플로우 폴더 생성 중...
echo ========================================

if not exist ".github" mkdir .github
if not exist ".github\workflows" mkdir .github\workflows

echo.
echo ✅ 폴더 생성 완료!
echo.
pause
