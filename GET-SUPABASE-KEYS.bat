@echo off
chcp 65001 >nul
cls
echo ========================================
echo Supabase Service Role Key 가져오기
echo ========================================
echo.
echo Supabase Dashboard를 엽니다...
start https://supabase.com/dashboard/project/xebqrsnkimtdlrjylvgy/settings/api
echo.
echo ========================================
echo 복사할 키:
echo ========================================
echo.
echo 1. URL 섹션:
echo    - "Project URL" 복사
echo    - 예: https://xebqrsnkimtdlrjylvgy.supabase.co
echo.
echo 2. API Keys 섹션:
echo    - "service_role" 항목 찾기
echo    - 오른쪽 "Copy" 버튼 클릭
echo    - (주의: anon key가 아님!)
echo.
echo ========================================
echo ⚠️ 중요!
echo ========================================
echo.
echo - service_role key는 비밀번호와 같음!
echo - 절대 GitHub에 올리면 안 됨!
echo - Azure Portal에만 설정하면 됨!
echo.
pause
echo.
echo ========================================
echo 이제 Azure Portal을 엽니다...
echo ========================================
echo.
start https://portal.azure.com/#@/resource/subscriptions/8ce166ce-122e-400e-8a7b-65ca78a76c2d/resourceGroups/flower-backend-rg/providers/Microsoft.Web/sites/flower-backend-api/environmentVariablesAppSettings
echo.
echo ========================================
echo Azure 환경 변수 설정:
echo ========================================
echo.
echo 왼쪽 "애플리케이션 설정" 탭에서
echo "+ 새 애플리케이션 설정" 버튼 클릭 후:
echo.
echo ----------------------------------------
echo [설정 1]
echo ----------------------------------------
echo 이름: SUPABASE_URL
echo 값: https://xebqrsnkimtdlrjylvgy.supabase.co
echo "확인" 클릭
echo.
echo ----------------------------------------
echo [설정 2]
echo ----------------------------------------
echo 이름: SUPABASE_SERVICE_ROLE_KEY
echo 값: (위에서 복사한 service_role key 붙여넣기)
echo "확인" 클릭
echo.
echo ----------------------------------------
echo [설정 3]
echo ----------------------------------------
echo 이름: PORT
echo 값: 8080
echo "확인" 클릭
echo.
echo ========================================
echo 마지막 단계:
echo ========================================
echo.
echo 1. 3개 모두 추가했으면 상단 "저장" 버튼 클릭
echo 2. "계속" 클릭
echo 3. 자동 재시작됨 (1-2분 대기)
echo.
pause
