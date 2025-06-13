# 🗃️ Guía de instalación de MongoDB en macOS (Homebrew)

Este README explica cómo instalar, ejecutar y usar MongoDB localmente en macOS utilizando Homebrew. Incluye conexión vía terminal y con MongoDB Compass.

---

## ✅ Requisitos

- macOS actualizado
- [Homebrew](https://brew.sh) instalado
- Acceso a terminal

---

## 🔧 Instalación de MongoDB

```
brew tap mongodb/brew
brew install mongodb-community@7.0
```
## Iniciar y detener MongoDB como servicio
```
brew services start mongodb-community@7.0   # Iniciar MongoDB al iniciar el sistema
brew services stop mongodb-community@7.0    # Detener MongoDB
brew services list
```

## 💻 Usar el shell de MongoDB (mongosh)
```
mongosh
```

## Comandos básicos dentro del shell:

```
use miBaseDeDatos                               // Crear o usar una base de datos
db.miColeccion.insertOne({ nombre: "Ejemplo" }) // Insertar documento
show dbs                                        // Ver bases de datos existentes
show collections
```

## 🌐 Conexión con MongoDB Compass
Abre MongoDB Compass

En el campo de conexión, usa:

mongodb://localhost:27017
Asegúrate de que MongoDB esté corriendo antes de conectar.

## 🛠️ Comandos útiles de MongoDB
- Insertar uno	db.coleccion.insertOne({})
- Insertar muchos	db.coleccion.insertMany([{},{},...])
- Buscar documentos	db.coleccion.find()
- Buscar con condición	db.coleccion.find({ campo: valor })
- Actualizar documento	db.coleccion.updateOne({}, { $set: {} })
- Eliminar documento	db.coleccion.deleteOne({})
- Eliminar varios docs	db.coleccion.deleteMany({})
- Eliminar colección	db.coleccion.drop()
- Eliminar base de datos	db.dropDatabase()

## 📁 Estructura recomendada del proyecto

/mi-proyecto/
├── README.md
├── scripts/
│   └── init-db.js
├── .env
└── src/

## 🧼 Desinstalar MongoDB

```
brew services stop mongodb-community@7.0
brew uninstall mongodb-community@7.0
```

## 📝 Notas
Las bases de datos en MongoDB solo se crean cuando insertas datos.
El puerto por defecto es 27017.
Se recomienda usar mongosh en lugar del cliente antiguo mongo.

## 🧠 Licencia
MIT

## Instalación para testing
npm install -D jest supertest babel-jest @babel/core @babel/preset-env joi  

## Instalación para seguridad
npm install helmet cors compression express-rate-limit
