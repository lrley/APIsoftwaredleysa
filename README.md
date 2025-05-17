# NOTAS
# CARPETAS A CREAR
# controllers
# database
# helpers
# middlewares
# models
# public
# routes

# archivos a crear
# .env
# .gitignore
# app.js

# { para trabajar con import
#  "name": "mi-proyecto",
#  "version": "1.0.0",
#  "type": "module",      ← habilita el uso de `import`
#  "main": "index.js",
#  "scripts": {
#    "start": "node index.js"
#  }
# }


# 0 Iniciar el npm init -y

# 1 recordar ejecutar ```npm install``` para reconstruir

# 2 tener instalado npm install -g nodemon

# 3 instalaciones adicionales: npm i express dotenv

# 4 instalar npm install cors

# 5 git init
# 6 git add .
# 7 git commit -m "nombre del commit"
# 8 para recuperar algo borrado git checkout --.

# 9 npm install mongoose --save
# 10 npm install bcryptjs
# 11 npm install express-validator
# 12 npm install moment
# 13 npm install moment-timezone
# 14 npm install jsonwebtoken
# 15 npm install google-auth-library --save
# 16 npm i express-fileupload 
# 17 npm i cloudinary

# remover archivo en git:  git rm .env --cached
# heroku config  
# crear variable en  heroku config: set nombre="Luis Ley"
# borrar variable en heroku config: unset nombre
# ver logs en heroku heroku logs -n 100

# npm i socket.io


# #################TYPESCRIPT###############################
# npm i -g typescript
# tsc --init


# habilitar
# "sourceMap": true, 
# "outDir": "./dist", (agregar esa carpera)
# "esModuleInterop": true,
# "strict": true,  
# "moduleResolution": "node10",   
# "typeRoots": ["./types", "./node_modules/@types"],        

# escribir en consola tsc
# node dist/app.js (corre la aplicacion)
# npm install typescript --save-dev (instalarlo tambien de manera local)
# npm i tslint --save-dev
# ./node_modules/.bin/tslint --init
#   "rules": {"no-console": false}, (dentro de tslint.json agregar en "rules" no-console:false)
# npm i --save-dev @types/express
# npm i --save-dev @types/cors
# tsc --watch (Sirve para correr express en tiempo real)
# npm install --save sequelize 
# npm install --save mysql2

# npm install --save tedious # Microsoft SQL Server
# npm i @sequelize/mssql
# npm install sequelize tedious
# npm install @sequelize/core @sequelize/mssql
# npm install mssql
# process.env.SEQUELIZE_DISABLE_DEPRECATION_WARNING = 'true';

# EXEC xp_readerrorlog 0,1, N'SERVER IS LISTENING ON';  (sirve para saber que puerto esta usando SQLSERVER)