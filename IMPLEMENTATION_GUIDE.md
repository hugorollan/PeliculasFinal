# 📖 Guía de Implementación Completa

## Sistema de Autenticación y Arreglo de Trailers

Este documento explica paso a paso cómo se implementó el sistema de autenticación y la corrección de los trailers de YouTube en la aplicación TMDB.

---

## 🎯 Objetivos Cumplidos

1. ✅ **Arreglar trailers de YouTube** - Los videos ahora se reproducen correctamente
2. ✅ **Sistema de Registro de Usuarios** - Los usuarios pueden crear cuentas
3. ✅ **Sistema de Login** - Autenticación funcional con validación
4. ✅ **Gestión de Sesiones** - Persistencia con localStorage
5. ✅ **API REST Simulada** - json-server como backend

---

## 📁 Estructura de Archivos Implementados

```
PeliculasFinal/
│
├── package.json              # ✨ NUEVO - Dependencias npm
├── package-lock.json         # Generado automáticamente
├── db.json                   # ✨ NUEVO - Base de datos usuarios
│
├── index.html               # 📝 MODIFICADO - Links a auth
├── script.js                # 📝 MODIFICADO - iframe YouTube
├── README.md                # 📝 MODIFICADO - Documentación
│
├── auth.html                # ✨ NUEVO - Login/Registro
├── auth-styles.css          # ✨ NUEVO - Estilos auth
└── app.js                   # ✨ NUEVO - Lógica auth
```

---

## 🔧 Implementación Detallada

### 1. Configuración del Backend (json-server)

#### package.json
```json
{
  "name": "peliculas-final",
  "version": "1.0.0",
  "description": "Aplicación web de películas con sistema de autenticación",
  "scripts": {
    "server": "json-server --watch db.json --port 3000",
    "dev": "concurrently \"npm run server\" \"python3 -m http.server 8080\"",
    "start": "python3 -m http.server 8080"
  },
  "devDependencies": {
    "json-server": "^0.17.4",
    "concurrently": "^8.2.2"
  }
}
```

**Explicación:**
- `json-server`: Crea una API REST completa desde un archivo JSON
- `concurrently`: Permite ejecutar múltiples comandos simultáneamente
- Scripts para desarrollo fácil

#### db.json
```json
{
  "usuarios": []
}
```

**Explicación:**
- Estructura inicial vacía
- json-server genera IDs automáticamente
- Se actualiza en tiempo real

---

### 2. Arreglo de Trailers de YouTube

#### script.js (líneas 659-673)

**ANTES:**
```javascript
<iframe
    width="100%"
    height="500"
    src="https://www.youtube.com/embed/${trailerKey}"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="border-radius: 8px;">
</iframe>
```

**DESPUÉS:**
```javascript
<iframe
    width="100%"
    height="500"
    src="https://www.youtube.com/embed/${trailerKey}?rel=0"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin"
    style="border-radius: 8px;">
</iframe>
```

**Cambios Clave:**
1. ✅ `?rel=0` - No muestra videos relacionados al final
2. ✅ `frameborder="0"` - Elimina bordes (compatibilidad)
3. ✅ `referrerpolicy` - Mejora la seguridad
4. ✅ `web-share` en allow - Permite compartir

---

### 3. Sistema de Autenticación

#### A. Interfaz de Usuario (auth.html)

**Estructura:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión - TMDB</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="auth-styles.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">...</nav>
    
    <!-- Login Form (visible por defecto) -->
    <div id="login-form-container">
        <form id="login-form">
            <input type="email" id="login-email" required>
            <input type="password" id="login-password" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
    
    <!-- Register Form (oculto inicialmente) -->
    <div id="register-form-container" style="display: none;">
        <form id="register-form">
            <input type="text" id="register-name" required>
            <input type="email" id="register-email" required>
            <input type="password" id="register-password" minlength="6" required>
            <input type="password" id="register-password-confirm" required>
            <button type="submit">Crear Cuenta</button>
        </form>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

**Características:**
- Dos formularios en un archivo
- Toggle JavaScript entre ellos
- Validación HTML5
- Mensajes de error/éxito

---

#### B. Estilos de Autenticación (auth-styles.css)

**Componentes Clave:**

```css
/* Contenedor principal */
.auth-main {
    min-height: calc(100vh - 64px - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, 
        var(--tmdb-dark-blue) 0%, 
        var(--tmdb-light-blue) 100%);
}

/* Card del formulario */
.auth-card {
    background: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* Inputs */
.form-group input {
    padding: 12px 16px;
    border: 2px solid #e3e3e3;
    border-radius: 8px;
    transition: all 0.3s;
}

.form-group input:focus {
    border-color: #01b4e4;
    box-shadow: 0 0 0 3px rgba(1, 180, 228, 0.1);
}

/* Botón principal */
.btn-primary {
    background: linear-gradient(to right, #1ed5a9, #01b4e4);
    color: white;
    padding: 14px 24px;
    border-radius: 8px;
    transition: transform 0.3s;
}

.btn-primary:hover {
    transform: translateY(-2px);
}

/* Mensajes de error */
.error-message {
    padding: 12px 16px;
    background-color: rgba(219, 35, 96, 0.1);
    border-left: 4px solid #db2360;
    color: #db2360;
}

/* Avatar de usuario */
.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(to right, #1ed5a9, #01b4e4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}
```

---

#### C. Lógica de Autenticación (app.js)

**1. Configuración y Constantes**

```javascript
// URL de la API simulada
const API_URL = 'http://localhost:3000/usuarios';

// Elementos DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
```

**2. Función de Registro**

```javascript
async function registerUser(name, email, password) {
    // 1. Verificar si el email ya existe
    const response = await fetch(
        `${API_URL}?email=${encodeURIComponent(email)}`
    );
    const existingUsers = await response.json();
    
    if (existingUsers.length > 0) {
        throw new Error('Este correo electrónico ya está registrado');
    }
    
    // 2. Crear nuevo usuario
    const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        createdAt: new Date().toISOString()
    };
    
    // 3. POST a la API
    const createResponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    });
    
    return await createResponse.json();
}
```

**Flujo de Registro:**
1. Usuario completa formulario
2. Validación cliente-side (email, longitud contraseña, coincidencia)
3. Verificación de email duplicado (GET)
4. Creación de usuario (POST)
5. Mensaje de éxito
6. Redirección a login

**3. Función de Login**

```javascript
async function loginUser(email, password) {
    // 1. Buscar usuario por email
    const response = await fetch(
        `${API_URL}?email=${encodeURIComponent(email.trim().toLowerCase())}`
    );
    const users = await response.json();
    
    // 2. Validar existencia
    if (users.length === 0) {
        throw new Error('Correo electrónico o contraseña incorrectos');
    }
    
    const user = users[0];
    
    // 3. Validar contraseña
    if (user.password !== password) {
        throw new Error('Correo electrónico o contraseña incorrectos');
    }
    
    // 4. Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
```

**Flujo de Login:**
1. Usuario ingresa credenciales
2. Búsqueda por email (GET)
3. Comparación de contraseña
4. Guardar sesión en localStorage
5. Redirección a página principal
6. UI actualizada con perfil

**4. Gestión de Sesión**

```javascript
// Guardar sesión
function saveUserSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Obtener sesión actual
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Limpiar sesión
function clearUserSession() {
    localStorage.removeItem('currentUser');
}
```

**5. Actualización de UI**

```javascript
function updateUIForAuthenticatedUser(user) {
    const navRight = document.querySelector('.nav-right');
    
    // Crear avatar con inicial
    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';
    userAvatar.textContent = user.name.charAt(0).toUpperCase();
    
    // Mostrar nombre
    const userName = document.createElement('span');
    userName.className = 'user-name';
    userName.textContent = user.name;
    
    // Botón logout
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-logout';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
    logoutBtn.addEventListener('click', handleLogout);
    
    // Agregar a navegación
    navRight.appendChild(userAvatar);
    navRight.appendChild(userName);
    navRight.appendChild(logoutBtn);
}
```

---

### 4. Integración con index.html

**Cambios en index.html:**

```html
<!-- ANTES -->
<a href="#" class="nav-link">Iniciar sesión</a>
<a href="#" class="nav-link btn-join">Únete a TMDB</a>

<!-- DESPUÉS -->
<a href="auth.html" class="nav-link">Iniciar sesión</a>
<a href="auth.html" class="nav-link btn-join">Únete a TMDB</a>

<!-- Cargar app.js ANTES de script.js -->
<script src="app.js"></script>
<script src="script.js"></script>
```

**Razón del orden:**
- `app.js` verifica la sesión primero
- Actualiza la UI antes de cargar las películas
- Evita parpadeos en la interfaz

---

## 🔄 Flujos de Usuario

### Flujo de Registro
```
1. Usuario hace clic en "Únete a TMDB"
   ↓
2. Redirige a auth.html
   ↓
3. Hace clic en "Regístrate aquí"
   ↓
4. Completa formulario (nombre, email, contraseña)
   ↓
5. JavaScript valida datos
   ↓
6. fetch() POST a http://localhost:3000/usuarios
   ↓
7. json-server guarda en db.json
   ↓
8. Mensaje de éxito mostrado
   ↓
9. Redirección a formulario de login (2 segundos)
```

### Flujo de Login
```
1. Usuario ingresa email y contraseña
   ↓
2. JavaScript valida formato
   ↓
3. fetch() GET a http://localhost:3000/usuarios?email=xxx
   ↓
4. Compara contraseña
   ↓
5. Si correcto: guarda en localStorage
   ↓
6. Redirige a index.html
   ↓
7. app.js lee localStorage
   ↓
8. Actualiza navbar con perfil
```

### Flujo de Sesión Persistente
```
1. Usuario abre index.html
   ↓
2. app.js ejecuta checkAuthStatus()
   ↓
3. Lee localStorage.getItem('currentUser')
   ↓
4. Si existe: updateUIForAuthenticatedUser()
   ↓
5. Si no existe: mantiene links de login/registro
```

---

## 🧪 Pruebas Realizadas

### ✅ Test 1: Registro de Usuario
```
Input:
- Nombre: "Test User"
- Email: "test@example.com"
- Contraseña: "123456"

Resultado: ✅ EXITOSO
- Usuario creado con ID 1
- Guardado en db.json
- Mensaje de éxito mostrado
- Redirección automática
```

### ✅ Test 2: Login con Credenciales Correctas
```
Input:
- Email: "test@example.com"
- Contraseña: "123456"

Resultado: ✅ EXITOSO
- Autenticación exitosa
- localStorage actualizado
- Redirección a index.html
- UI muestra "Test User"
```

### ✅ Test 3: Persistencia de Sesión
```
Acción: Recargar página

Resultado: ✅ EXITOSO
- Sesión mantenida
- Usuario sigue autenticado
- UI correcta
```

### ✅ Test 4: Logout
```
Acción: Click en "Cerrar Sesión"

Resultado: ✅ EXITOSO
- localStorage limpiado
- Página recargada
- UI vuelve a estado no autenticado
```

---

## 📊 Endpoints de la API

### GET /usuarios
Obtener todos los usuarios

```bash
curl http://localhost:3000/usuarios
```

Respuesta:
```json
[
  {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "createdAt": "2024-11-18T23:24:07.613Z"
  }
]
```

### GET /usuarios?email=xxx
Buscar usuario por email

```bash
curl "http://localhost:3000/usuarios?email=test@example.com"
```

### POST /usuarios
Crear nuevo usuario

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secret123",
    "createdAt": "2024-11-18T23:00:00.000Z"
  }'
```

---

## 🎨 Diseño UI/UX

### Paleta de Colores
```css
--tmdb-dark-blue: #032541    /* Fondo navbar */
--tmdb-light-blue: #01b4e4   /* Acentos */
--tmdb-light-green: #1ed5a9  /* Botones */
--success-green: #21d07a     /* Mensajes éxito */
--error-red: #db2360         /* Mensajes error */
```

### Transiciones
- Hover: 0.3s ease
- Inputs focus: box-shadow animado
- Botones: translateY(-2px)
- Forms: fadeInScale animation

---

## 🔒 Consideraciones de Seguridad

### ⚠️ Implementación Actual (Desarrollo)
```javascript
// ❌ INSEGURO - Solo para desarrollo
if (user.password !== password) {
    throw new Error('Contraseña incorrecta');
}
```

### ✅ Implementación Recomendada (Producción)
```javascript
// ✅ SEGURO - Para producción
const bcrypt = require('bcrypt');

// Al registrar
const hashedPassword = await bcrypt.hash(password, 10);

// Al hacer login
const isValid = await bcrypt.compare(password, user.hashedPassword);
```

### Checklist de Seguridad para Producción
- [ ] Hash de contraseñas (bcrypt/argon2)
- [ ] HTTPS obligatorio
- [ ] Tokens JWT en lugar de localStorage
- [ ] Validación servidor-side
- [ ] Rate limiting en login
- [ ] Sanitización de inputs
- [ ] CORS configurado
- [ ] Headers de seguridad
- [ ] Logs de auditoría
- [ ] 2FA opcional

---

## 📚 Comandos Útiles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar todo (recomendado)
npm run dev

# Solo API
npm run server

# Solo frontend
npm start
```

### Debugging
```bash
# Ver usuarios en la API
curl http://localhost:3000/usuarios | json_pp

# Ver localStorage en browser console
localStorage.getItem('currentUser')

# Limpiar localStorage
localStorage.clear()

# Resetear base de datos
echo '{"usuarios":[]}' > db.json
```

---

## 🎓 Aprendizajes Clave

### 1. Vanilla JavaScript
- No se necesitan frameworks para apps simples
- fetch() API es poderosa y simple
- localStorage es suficiente para desarrollo

### 2. json-server
- API REST completa en minutos
- Perfecto para prototipos
- CRUD automático

### 3. UX/UI
- Mensajes claros de error/éxito
- Validación en tiempo real
- Feedback visual inmediato

### 4. Arquitectura
- Separación de concerns (HTML/CSS/JS)
- Código modular y reutilizable
- Fácil de mantener y extender

---

## 🚀 Próximos Pasos (Mejoras Futuras)

### Corto Plazo
- [ ] Validación de email más robusta
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario editable
- [ ] Favoritos de películas por usuario

### Mediano Plazo
- [ ] Backend real (Node.js + Express)
- [ ] Base de datos real (MongoDB/PostgreSQL)
- [ ] Hash de contraseñas
- [ ] Tokens JWT

### Largo Plazo
- [ ] OAuth (Google, Facebook)
- [ ] Roles y permisos
- [ ] Ratings y reseñas de usuarios
- [ ] Social features (seguir usuarios)

---

## 📞 Soporte

Si tienes problemas:

1. Verifica que json-server esté corriendo (`npm run server`)
2. Revisa la consola del navegador (F12)
3. Verifica localhost:3000 esté accesible
4. Limpia localStorage si hay problemas de sesión

---

**Fecha de Implementación:** Noviembre 2024  
**Versión:** 1.0.0  
**Autor:** Hugo Rollan  
**Tecnologías:** HTML5, CSS3, JavaScript ES6+, json-server
