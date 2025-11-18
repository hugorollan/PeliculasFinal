# 🚀 Comandos para Ejecutar la Aplicación - Guía Paso a Paso

## Para Principiantes - Copia y Pega Estos Comandos

### 📥 Paso 1: Descargar el Proyecto

Si ya tienes el proyecto, salta al Paso 2.

**Opción A: Con Git**
```bash
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal
```

**Opción B: Descarga ZIP**
1. Ve a: https://github.com/hugorollan/PeliculasFinal
2. Clic en "Code" → "Download ZIP"
3. Extrae el ZIP
4. Abre terminal en esa carpeta

---

### 📦 Paso 2: Instalar Dependencias

**Este comando solo se ejecuta una vez:**

```bash
npm install
```

Esto instalará:
- `json-server` - Para la API de usuarios
- `concurrently` - Para ejecutar múltiples servidores

**Salida esperada:**
```
added 130 packages in 10s
```

---

### ▶️ Paso 3: Iniciar la Aplicación

**Elige una de estas opciones:**

#### Opción A: TODO EN UNO (Recomendado) 🌟
```bash
npm run dev
```

**Esto inicia:**
- API en `http://localhost:3000`
- Frontend en `http://localhost:8080`

**Salida esperada:**
```
[0] json-server is running on port 3000
[1] Serving HTTP on 0.0.0.0 port 8080
```

#### Opción B: SOLO API
```bash
npm run server
```

Inicia solo json-server en puerto 3000.

#### Opción C: SOLO FRONTEND
```bash
npm start
```

Inicia solo el servidor web en puerto 8080.
*(Necesitarás correr la API por separado)*

---

### 🌐 Paso 4: Abrir en el Navegador

**Una vez que los servidores estén corriendo:**

1. Abre tu navegador (Chrome, Firefox, etc.)
2. Ve a: **http://localhost:8080**

**URLs disponibles:**
- Frontend: http://localhost:8080
- Login/Registro: http://localhost:8080/auth.html
- API: http://localhost:3000/usuarios

---

### 🎯 Paso 5: Usar la Aplicación

#### Crear una Cuenta
1. En http://localhost:8080
2. Clic en **"Únete a TMDB"** (esquina superior derecha)
3. Clic en **"Regístrate aquí"**
4. Completa el formulario:
   - **Nombre:** Tu Nombre
   - **Email:** tu@email.com
   - **Contraseña:** 123456 (mínimo 6 caracteres)
   - **Confirmar:** 123456
5. Clic en **"Crear Cuenta"**
6. Espera el mensaje de éxito
7. Te redirigirá al login automáticamente

#### Iniciar Sesión
1. Ingresa tu email: `tu@email.com`
2. Ingresa tu contraseña: `123456`
3. Clic en **"Iniciar Sesión"**
4. Te redirigirá a la página principal
5. Verás tu nombre en la esquina superior derecha

#### Cerrar Sesión
1. Clic en **"Cerrar Sesión"**
2. Te desconectará y recargará la página

---

### ⏹️ Paso 6: Detener los Servidores

**Para detener la aplicación:**

En la terminal donde están corriendo los servidores, presiona:

```
Ctrl + C
```

En Windows también puedes usar:
```
Ctrl + Break
```

---

## 🐛 Solución de Problemas

### Error: "npm: command not found"

**Problema:** No tienes Node.js instalado.

**Solución:**
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala Node.js
4. Reinicia tu terminal
5. Verifica: `node --version`

---

### Error: "EADDRINUSE: address already in use"

**Problema:** El puerto ya está siendo usado.

**Solución para puerto 3000:**
```bash
# En Linux/Mac:
lsof -ti:3000 | xargs kill -9

# En Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Solución para puerto 8080:**
```bash
# En Linux/Mac:
lsof -ti:8080 | xargs kill -9

# En Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process
```

**O simplemente cambia el puerto:**
```bash
# Para json-server
npx json-server --watch db.json --port 3001

# Para HTTP server
python3 -m http.server 8081
```

---

### Error: "Cannot GET /usuarios"

**Problema:** json-server no está corriendo.

**Solución:**
```bash
# En una terminal separada, ejecuta:
npm run server

# O verifica si está corriendo:
curl http://localhost:3000/usuarios
```

---

### Error: CORS en el navegador

**Problema:** Estás abriendo el HTML como archivo (file://).

**Solución:**
Debes usar un servidor HTTP. Ejecuta:
```bash
npm start
# Y abre: http://localhost:8080
```

---

### La sesión no se guarda

**Problema:** localStorage puede tener datos corruptos.

**Solución:**
1. Abre la consola del navegador (F12)
2. Ejecuta:
```javascript
localStorage.clear();
window.location.reload();
```
3. Vuelve a hacer login

---

### Los trailers no se ven

**Problema:** Bloqueadores de contenido o problemas de red.

**Solución:**
1. Desactiva extensiones de ad-block
2. Verifica tu conexión a Internet
3. Algunos videos pueden estar geo-bloqueados

---

## 🔍 Comandos de Verificación

### Verificar que json-server esté corriendo
```bash
curl http://localhost:3000/usuarios
```

**Respuesta esperada:**
```json
[]
```
o una lista de usuarios si ya hay registros.

---

### Ver usuarios en la base de datos
```bash
cat db.json
```

**O formateado:**
```bash
cat db.json | python3 -m json.tool
```

---

### Ver localStorage desde el navegador
1. Abre la consola (F12)
2. Ve a la pestaña "Application" o "Storage"
3. Encuentra "Local Storage" → http://localhost:8080
4. O ejecuta en console:
```javascript
console.log(localStorage.getItem('currentUser'));
```

---

## 📋 Comandos de Utilidad

### Resetear la base de datos
```bash
echo '{"usuarios":[]}' > db.json
```

### Ver procesos de Node.js corriendo
```bash
# Linux/Mac:
ps aux | grep node

# Windows (PowerShell):
Get-Process node
```

### Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Actualizar dependencias
```bash
npm update
```

---

## 🎬 Ejemplo Completo de Sesión

**Desde cero hasta tener un usuario:**

```bash
# 1. Clonar el proyecto
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal

# 2. Instalar dependencias
npm install

# 3. Iniciar todo
npm run dev

# 4. En otra terminal, verificar API
curl http://localhost:3000/usuarios
# Debería responder: []

# 5. Abrir navegador en http://localhost:8080
# 6. Registrar usuario (desde la UI)
# 7. Verificar que se creó:
curl http://localhost:3000/usuarios

# 8. Debería mostrar algo como:
# [
#   {
#     "id": 1,
#     "name": "Test User",
#     "email": "test@example.com",
#     "password": "123456",
#     "createdAt": "2024-11-18T23:24:07.613Z"
#   }
# ]
```

---

## 🎯 Scripts npm Disponibles

### `npm install`
Instala todas las dependencias del proyecto.
**Cuándo:** Primera vez o después de `git pull`

### `npm run server`
Inicia solo json-server en puerto 3000.
**Cuándo:** Solo necesitas la API

### `npm start`
Inicia solo el servidor HTTP en puerto 8080.
**Cuándo:** Solo necesitas el frontend

### `npm run dev`
Inicia ambos servidores simultáneamente.
**Cuándo:** Desarrollo normal (recomendado)

---

## 📚 Archivos Importantes

```
PeliculasFinal/
│
├── package.json          # ← Configuración npm
├── db.json              # ← Base de datos (se actualiza automáticamente)
│
├── index.html           # ← Página principal
├── auth.html            # ← Login/Registro
│
├── styles.css           # ← Estilos principales
├── auth-styles.css      # ← Estilos de autenticación
│
├── script.js            # ← Lógica de películas
├── app.js               # ← Lógica de autenticación
│
├── README.md            # ← Documentación general
└── IMPLEMENTATION_GUIDE.md  # ← Documentación técnica
```

---

## 🎓 Para Aprender Más

**Conceptos clave:**
- `npm` - Gestor de paquetes de Node.js
- `json-server` - API REST fake para desarrollo rápido
- `localhost` - Tu computadora como servidor
- `puerto 3000/8080` - Canales de comunicación
- `fetch()` - API de JavaScript para hacer requests HTTP
- `localStorage` - Almacenamiento local del navegador

**Recursos:**
- [Guía de npm](https://docs.npmjs.com/)
- [json-server docs](https://github.com/typicode/json-server)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Node.js está instalado (`node --version`)
- [ ] npm está instalado (`npm --version`)
- [ ] Dependencias instaladas (`npm install` ejecutado)
- [ ] json-server corriendo (puerto 3000 libre)
- [ ] HTTP server corriendo (puerto 8080 libre)
- [ ] Navegador abierto en http://localhost:8080 (no file://)
- [ ] Consola del navegador sin errores (F12)
- [ ] db.json existe en la carpeta raíz

---

## 🆘 ¿Necesitas Ayuda?

Si después de seguir esta guía sigues teniendo problemas:

1. **Revisa la consola del navegador** (F12) para errores
2. **Revisa la terminal** para errores de los servidores
3. **Verifica los puertos** estén libres
4. **Limpia y reinstala**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

**Última actualización:** Noviembre 2024  
**Versión de Node.js recomendada:** 14.x o superior  
**Sistema operativo:** Windows, macOS, Linux
