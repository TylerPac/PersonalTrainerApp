@echo off

REM Check if MySQL service is running, start it if not
sc query MySQL80 | find "RUNNING" >nul
if errorlevel 1 (
    echo MySQL service is not running. Starting MySQL80...
    net start MySQL80
) else (
    echo MySQL service is already running.
)

REM Start Backend in Dev Profile
start cmd /k "cd /d F:\Development\SoftwareProjects\PersonalTrainerApp\backend && mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"

REM Wait for 10 seconds to ensure backend starts
timeout /t 10 /nobreak

REM Start Frontend
start cmd /k "cd /d F:\Development\SoftwareProjects\PersonalTrainerApp\frontend_web && npm run dev"

REM Exit the script
exit