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
# recuperar todo git checkout --.
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
 # //Fileupload - carga de archivos copiar esto en server  importar fileupload
 #   this.app.use(fileUpload({
 #    //limits: { fileSize: 50 * 1024 * 1024 },
 #    useTempFiles : true,
 #    tempFileDir : '/tmp/'
 #   }));

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

# DETALLE DE TABLAS DE PARAMETROS

#  Unidad Organica / Membresia / Departamento
#  Tabla Depart depart_id,upper_depart_id,depart_name,principal
#  Software T Departamento
  
#  Denominacion de puesto / Tipo de Usuario
#  Tabla JOB  job_id,job_name
#  software T  position
  
#  modalidad laboral / GYM1
#  Tabla STATUS status_id,status_name
#  Software T tipo de personal 
  
#  nivel Academico / GYM2
#  Tabla EDUCATION edu_id,education
#  software Educacion  
  
#  nacionalidad / GYM3
#  Tabla NATION nation_id,nation_name
#  software T nacionalidad 
  
#  Residencia / GYM4
#  Tabla NATIVE native_id,native_name
#  software T Residencia 
  
#  Titulo Academico / GYM5
#  Tabla POSITIONS position_id,position_name
#  Software T Titulo
  
#  lugar de nacimiento / GYM6
#  Tabla POLITY polity_id,polity_name
#  Software T Status Politico
