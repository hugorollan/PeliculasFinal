# TMDB - Películas, Series y Más (Con Sistema de Autenticación)

Una aplicación web profesional tipo clon de TMDB (The Movie Database) que permite explorar películas, series y más contenido de entretenimiento. **Ahora incluye un sistema completo de Registro y Login de usuarios** usando Vanilla JavaScript y json-server.

## 🌟 Características

### Funcionalidades Principales
- **✨ Sistema de Registro y Login**: Autenticación completa de usuarios con persistencia de datos
- **👤 Gestión de Sesiones**: Mantén tu sesión activa usando localStorage
- **🔒 Validación de Usuarios**: Sistema seguro de validación de credenciales
- **🎬 Búsqueda de Películas**: Busca películas en tiempo real usando la API de TMDB
- **📺 Visualización de Tráilers**: Reproducción de tráilers de YouTube integrados
- **🔥 Secciones Dinámicas**:
  - Tendencias (Hoy / Esta semana)
  - Películas Populares (Streaming / En TV / En Alquiler / En Cines)
  - Últimos Tráilers
- **🎯 Toggles Interactivos**: Cambia entre diferentes categorías con un solo clic
- **💳 Tarjetas de Películas**: Visualización profesional con pósters, calificaciones y fechas
- **📱 Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil

### Mejoras Profesionales
- ✅ Estructura HTML5 semántica
- ✅ Accesibilidad mejorada (ARIA labels, roles, navegación por teclado)
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga y mensajes de error
- ✅ SEO optimizado con meta tags
- ✅ Footer profesional con enlaces
- ✅ Navegación sticky
- ✅ Efectos hover en todos los elementos interactivos
- ✅ Sistema de autenticación con API REST simulada

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS, animaciones y responsive design
- **JavaScript (ES6+ Vanilla)**: Lógica de aplicación moderna con async/await
- **TMDB API**: Integración con The Movie Database API
- **Font Awesome**: Iconos profesionales

### Backend (Simulado)
- **json-server**: API REST simulada para desarrollo
- **db.json**: Base de datos local para usuarios registrados

## 📦 Instalación y Configuración

### Requisitos Previos
- **Node.js** (v14 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet (para cargar recursos externos y la API de TMDB)

### Pasos de Instalación

#### 1. Clonar el repositorio
```bash
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal
```

#### 2. Instalar dependencias
```bash
npm install
```

Este comando instalará:
- `json-server`: Para simular la API REST backend
- `concurrently`: Para ejecutar múltiples comandos simultáneamente

#### 3. Iniciar el servidor simulado (json-server)

**Opción A: Solo json-server**
```bash
npm run server
```

Esto iniciará json-server en `http://localhost:3000`.
La base de datos `db.json` será monitoreada automáticamente para cambios.

**Opción B: json-server + servidor HTTP (recomendado para desarrollo)**
```bash
npm run dev
```

Esto iniciará:
- json-server en `http://localhost:3000` (API)
- servidor HTTP en `http://localhost:8080` (Frontend)

#### 4. Abrir la aplicación

Abre tu navegador y visita:
- **Frontend**: `http://localhost:8080`
- **API**: `http://localhost:3000` (para ver los datos directamente)

### Alternativa: Servidor Python (si no tienes Node.js)

Si solo quieres ver la aplicación sin el sistema de autenticación:

```bash
python3 -m http.server 8080
# o
python -m http.server 8080
```

**Nota**: Sin json-server, las funciones de registro y login no funcionarán.

## 🎨 Estructura del Proyecto

```
PeliculasFinal/
│
├── index.html          # Página principal con películas
├── auth.html           # Página de login y registro
├── styles.css          # Estilos principales
├── auth-styles.css     # Estilos para autenticación
├── script.js           # Lógica de películas y API TMDB
├── app.js              # Lógica de autenticación
├── package.json        # Dependencias y scripts
├── db.json             # Base de datos de usuarios (json-server)
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Documentación
```

## 🔐 Sistema de Autenticación

### Características del Sistema

1. **Registro de Usuarios**:
   - Formulario con nombre, email y contraseña
   - Validación de formato de email
   - Confirmación de contraseña
   - Verificación de usuarios duplicados

2. **Inicio de Sesión**:
   - Login con email y contraseña
   - Validación de credenciales
   - Mensajes de error informativos

3. **Gestión de Sesiones**:
   - Sesión guardada en `localStorage`
   - UI actualizada según estado de autenticación
   - Botón de cierre de sesión

### Flujo de Uso

1. **Primera vez**: Haz clic en "Únete a TMDB" → Completa el formulario de registro
2. **Usuarios existentes**: Haz clic en "Iniciar sesión" → Ingresa tus credenciales
3. **Sesión activa**: Tu nombre aparecerá en la navegación con opción de cerrar sesión

### API Endpoints (json-server)

- `GET /usuarios` - Obtener todos los usuarios
- `GET /usuarios?email=example@email.com` - Buscar usuario por email
- `POST /usuarios` - Crear nuevo usuario
- `GET /usuarios/:id` - Obtener usuario por ID

### Estructura de Usuario en db.json

```json
{
  "usuarios": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "password": "123456",
      "createdAt": "2024-11-18T23:00:00.000Z"
    }
  ]
}
```

**⚠️ Nota de Seguridad**: 
En esta implementación de desarrollo, las contraseñas se almacenan en texto plano. 
En producción, **SIEMPRE** debes:
- Hashear las contraseñas (bcrypt, argon2, etc.)
- Usar HTTPS
- Implementar tokens JWT o sesiones seguras
- Validar en el servidor

## 🔧 Configuración de la API de TMDB

El proyecto utiliza una API key de TMDB pre-configurada. Si necesitas usar tu propia API key:

1. Regístrate en [TMDB](https://www.themoviedb.org/)
2. Obtén tu API key en tu perfil de desarrollador
3. Reemplaza la constante `API_KEY` en `script.js`:

```javascript
const API_KEY = 'TU_API_KEY_AQUI';
```

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (< 480px): Layout de una columna, navegación adaptada
- 📱 **Tablets** (480px - 1024px): Layout optimizado con ajustes de tamaño
- 💻 **Desktop** (> 1024px): Layout completo con todas las características

## 🎯 Scripts de npm Disponibles

```bash
# Iniciar solo json-server (puerto 3000)
npm run server

# Iniciar json-server + servidor HTTP (desarrollo completo)
npm run dev

# Iniciar solo servidor HTTP (puerto 8080)
npm start
```

## 🛠️ Desarrollo

### Modificar la Base de Datos

El archivo `db.json` se actualiza automáticamente cuando:
- Registras un nuevo usuario
- json-server está en ejecución

Para resetear la base de datos, simplemente edita `db.json`:

```json
{
  "usuarios": []
}
```

### Verificar Datos

Puedes ver todos los usuarios registrados visitando:
```
http://localhost:3000/usuarios
```

## 🌐 Navegadores Soportados

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)

## 🐛 Solución de Problemas

### El registro no funciona

**Problema**: Al hacer clic en "Crear Cuenta" no pasa nada.

**Solución**:
1. Verifica que json-server esté ejecutándose: `npm run server`
2. Asegúrate de que `http://localhost:3000` esté accesible
3. Revisa la consola del navegador (F12) para errores

### Error de CORS

**Problema**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solución**: 
json-server habilita CORS por defecto. Si aún tienes problemas, asegúrate de:
1. Acceder vía `http://localhost:8080` (no `file://`)
2. Reiniciar json-server

### Los tráilers de YouTube no se ven

**Problema**: El iframe del tráiler aparece vacío o con error.

**Solución**:
1. Verifica tu conexión a Internet
2. Algunos tráilers pueden estar restringidos por región
3. Asegúrate de que YouTube no esté bloqueado en tu red

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por proporcionar la API
- [json-server](https://github.com/typicode/json-server) por la API REST simulada
- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía Source Sans Pro

## 📞 Contacto

Hugo Rollan - [@hugorollan](https://github.com/hugorollan)

Link del Proyecto: [https://github.com/hugorollan/PeliculasFinal](https://github.com/hugorollan/PeliculasFinal)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

## 📝 Instrucciones Paso a Paso (Para Principiantes)

### Comandos para Ejecutar la Aplicación

**Terminal/CMD/PowerShell:**

```bash
# 1. Navega a la carpeta del proyecto
cd PeliculasFinal

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Inicia la aplicación completa (API + Frontend)
npm run dev
```

**Ahora abre tu navegador en:**
- Frontend: `http://localhost:8080`
- API: `http://localhost:3000/usuarios`

**Para detener los servidores:**
- Presiona `Ctrl + C` en la terminal

### Ejemplo de Uso

1. **Crear una cuenta**:
   - Abre `http://localhost:8080`
   - Haz clic en "Únete a TMDB"
   - Completa el formulario:
     - Nombre: "María García"
     - Email: "maria@example.com"
     - Contraseña: "123456"
   - Haz clic en "Crear Cuenta"

2. **Iniciar sesión**:
   - Ingresa tu email: "maria@example.com"
   - Ingresa tu contraseña: "123456"
   - Haz clic en "Iniciar Sesión"

3. **Explorar películas**:
   - Busca películas en la barra de búsqueda
   - Haz clic en cualquier película para ver detalles
   - Ve tráilers de YouTube integrados

4. **Cerrar sesión**:
   - Haz clic en "Cerrar Sesión" en la navegación
