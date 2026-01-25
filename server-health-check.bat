@echo off
chcp 65001 >nul
echo ========================================
echo 서버 상태 종합 진단
echo ========================================
echo.
echo [1/4] Azure 프론트엔드 서버 확인...
curl -s -o nul -w "HTTP 상태: %%{http_code}\n응답 시간: %%{time_total}초\n" https://proud-river-0710b0610.1.azurestaticapps.net/
echo.
echo [2/4] Azure 백엔드 API 서버 확인...
curl -s -o nul -w "HTTP 상태: %%{http_code}\n응답 시간: %%{time_total}초\n" https://flower-backend-api-g0fuavb9b3gxhqgm.koreacentral-01.azurewebsites.net/api/products
echo.
echo [3/4] Supabase 연결 확인...
curl -s -o nul -w "HTTP 상태: %%{http_code}\n" https://xebqrsnkimtdlrjylvgy.supabase.co/rest/v1/
echo.
echo [4/4] GitHub 저장소 상태 확인...
curl -s -o nul -w "HTTP 상태: %%{http_code}\n" https://api.github.com/repos/dev-dreams-bright/flower-project
echo.
echo ========================================
echo 진단 완료!
echo ========================================
echo.
echo 문제가 있으면 위 HTTP 상태 코드를 확인하세요:
echo - 200: 정상
echo - 404: 페이지 없음
echo - 500: 서버 오류
echo - 타임아웃: 서버 응답 없음
echo.
pause
