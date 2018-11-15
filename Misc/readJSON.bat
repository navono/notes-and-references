@echo off
setlocal enabledelayedexpansion

set commit=%OS%
echo "" > %OS%

:: Read file "package.json" into variable string, removing line breaks.
set string=
for /f "delims=" %%x in (package.json) do set "string=!string!%%x"

rem Remove quotes
set string=%string:"=%
rem Remove braces
set "string=%string:~2,-2%"
rem Change colon+space by equal-sign
set "string=%string:: ==%"
rem Separate parts at comma into individual assignments
set "%string:, =" & set "%"

set appname=AppDev-%version%-win
call 7z a ./%appname%.zip %OS%

del %OS%