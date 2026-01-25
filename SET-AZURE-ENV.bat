@echo off
chcp 65001 >nul
cls
echo ========================================
echo Azure 환경 변수 설정
echo ========================================
echo.
echo 문제: .env 파일이 Azure에 없음
echo 해결: Azure Portal에서 직접 설정
echo.
echo Azure Configuration을 엽니다...
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/environmentVariablesAppSettings
echo.
echo ========================================
echo 설정할 환경 변수:
echo ========================================
echo.
echo 왼쪽 "애플리케이션 설정" 탭에서
echo "+ 새 애플리케이션 설정" 버튼 클릭 후:
echo.
echo ----------------------------------------
echo 1번 설정:
echo ----------------------------------------
echo 이름: SUPABASE_URL
echo 값: (backend/.env 파일에서 복사)
echo.
echo ----------------------------------------
echo 2번 설정:
echo ----------------------------------------
echo 이름: SUPABASE_SERVICE_ROLE_KEY
echo 값: (backend/.env 파일에서 복사)
echo.
echo ----------------------------------------
echo 3번 설정:
echo ----------------------------------------
echo 이름: PORT
echo 값: 8080
echo.
echo ========================================
echo 중요!
echo ========================================
echo.
echo 1. 각 설정 추가 후 "확인" 클릭
echo 2. 3개 모두 추가한 후 상단 "저장" 버튼 클릭
echo 3. "계속" 클릭
echo 4. 자동으로 재시작됨 (1-2분 대기)
echo.
echo ========================================
echo backend/.env 파일 열기:
echo ========================================
echo.
echo 바탕화면 ^> 사업 ^> 신사업 ^> backend ^> .env
echo.
echo 파일을 메모장으로 열어서 값 복사!
echo.
pause
