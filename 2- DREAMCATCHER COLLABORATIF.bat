


START node . 
::set  dcpath="%cd%"
::@echo  %dcpath%
::set collaboratif=/public/index.html
::@echo %autonome%
::set collaboratifPath=%dcpath%%collaboratif%
::@echo %collaboratifPath%
start  /w chrome http://localhost:3000
::http://smag0.blogspot.fr https://github.com/scenaristeur/collaborativeRDFWithP5JSGraph https://github.com/scenaristeur/eveMultiDreamCatcher







::python -m SimpleHTTPServer 8080 
::(or with Python 3 python -m http.server 8080)
::set autonome=/chat/public/index.html
::@echo %autonome%
::set autonomePath=%dcpath%%autonome%
::@echo %autonomePath%
::start  /w chrome %autonomePath% 
::http://smag0.blogspot.fr https://github.com/scenaristeur/collaborativeRDFWithP5JSGraph https://github.com/scenaristeur/eveMultiDreamCatcher

