@echo off
chcp 65001 >nul
cd /d "C:\Users\com\Desktop\사업\신사업"
echo ===== Git Log =====
git log --oneline -5
echo.
echo ===== Git Status =====
git status
echo.
echo ===== Workflow File Check =====
git log --oneline --all -- .github/workflows/azure-backend-deploy.yml
