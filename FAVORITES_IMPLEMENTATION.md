# Implementación del Sistema de Favoritos

Este documento describe la implementación completa del sistema de favoritos ("Mi Lista") para la aplicación de películas TMDB.

## 📋 Resumen de Características

El sistema de favoritos permite a los usuarios autenticados:
- ✅ Agregar películas a su lista de favoritos
- ✅ Remover películas de su lista de favoritos
- ✅ Ver todas sus películas favoritas en una sección dedicada
- ✅ Persistencia de datos en json-server
- ✅ Sincronización con localStorage
- ✅ Feedback visual inmediato

## 🔧 Cambios Técnicos Implementados

### 1. Base de Datos (db.json)

**Modificación:**
```json
{
  "usuarios": [
    {
      "id": 1,
      "name": "Usuario",
      "email": "usuario@example.com",
      "password": "contraseña",
      "createdAt": "2025-11-18T23:24:07.613Z",
      "favorites": []  // ← Nuevo campo
    }
  ]
}
```

- Agregado campo `favorites` como array vacío para cada usuario
- Los IDs de películas se almacenan como números en este array

### 2. HTML (index.html)

**Cambios:**

1. **Botón de Favoritos en Navegación:**
```html
<button id="favorites-toggle-btn" class="icon-btn" style="display: none;" aria-label="Mis Favoritos">
    <i class="fas fa-heart"></i>
</button>
```
- Visible solo cuando el usuario está autenticado
- Permite alternar la vista de favoritos

2. **Nueva Sección de Favoritos:**
```html
<section class="favorites-section" id="favorites-section" style="display: none;">
    <div class="section-header">
        <h2 id="favorites-title">Mis Favoritos</h2>
    </div>
    <div class="scroller-wrapper">
        <div id="favorites-container" class="scroller"></div>
        <div id="favorites-empty" class="empty-favorites" style="display: none;">
            <i class="fas fa-heart"></i>
            <p>No tienes películas favoritas aún.</p>
            <p class="empty-subtitle">¡Comienza a agregar películas a tu lista!</p>
        </div>
    </div>
</section>
```

### 3. JavaScript (script.js)

**Funciones Nuevas:**

#### `getCurrentUser()`
```javascript
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}
```
- Obtiene el usuario actual desde localStorage

#### `updateCurrentUser(user)`
```javascript
function updateCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
```
- Actualiza el usuario en localStorage

#### `toggleFavorite(movieId)`
```javascript
async function toggleFavorite(movieId) {
    // 1. Verifica si hay usuario autenticado
    // 2. Agrega o remueve el ID de la película del array
    // 3. Hace PATCH a http://localhost:3000/usuarios/{userId}
    // 4. Actualiza localStorage
    // 5. Actualiza la UI inmediatamente
}
```
- Función principal para manejar favoritos
- Maneja errores si json-server no está disponible
- Actualiza múltiples botones del mismo movieId

#### `loadFavorites()`
```javascript
async function loadFavorites() {
    // 1. Obtiene IDs de favoritos del usuario
    // 2. Hace fetch a TMDB API para cada película
    // 3. Muestra las películas en favorites-container
    // 4. Maneja estado vacío
}
```
- Carga los detalles completos de las películas favoritas desde TMDB
- Muestra mensaje apropiado si no hay favoritos

#### `toggleFavoritesSection()`
```javascript
function toggleFavoritesSection() {
    // Alterna la visibilidad de la sección de favoritos
    // Oculta/muestra otras secciones
}
```

#### `setupFavoritesToggle()`
```javascript
function setupFavoritesToggle() {
    // Configura el botón de favoritos en la navegación
    // Lo muestra solo si hay usuario autenticado
}
```

**Modificaciones a Funciones Existentes:**

#### `createMovieCard(movie)` - Actualizada
```javascript
function createMovieCard(movie) {
    // ... código existente ...
    
    // NUEVO: Verificar si la película está en favoritos
    const currentUser = getCurrentUser();
    const isFavorite = currentUser && currentUser.favorites && 
                      currentUser.favorites.includes(id);
    
    // NUEVO: Botón de favorito en la tarjeta
    card.innerHTML = `
        <div class="image-content">
            <img src="${IMAGE_URL + poster_path}" alt="${title}">
            <button class="favorite-btn ${isFavorite ? 'favorite-active' : ''}" 
                    data-movie-id="${id}">
                <i class="fas fa-heart"></i>
            </button>
            <!-- ... resto del HTML ... -->
        </div>
    `;
    
    // NUEVO: Event listener para el botón de favorito
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(id);
    });
    
    // ... resto del código ...
}
```

#### `init()` - Actualizada
```javascript
function init() {
    // ... código existente ...
    setupFavoritesToggle(); // NUEVO
    // ... resto del código ...
}
```

### 4. JavaScript (app.js)

**Modificación en `registerUser()`:**
```javascript
const newUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    createdAt: new Date().toISOString(),
    favorites: []  // ← NUEVO
};
```

**Modificación en `updateUIForAuthenticatedUser()`:**
```javascript
function updateUIForAuthenticatedUser(user) {
    // ... código existente ...
    
    // NUEVO: Mostrar botón de favoritos
    const favoritesToggleBtn = document.getElementById('favorites-toggle-btn');
    if (favoritesToggleBtn) {
        favoritesToggleBtn.style.display = 'block';
    }
    
    // ... resto del código ...
}
```

### 5. CSS (styles.css)

**Nuevos Estilos:**

```css
/* Botón de favorito en tarjeta de película */
.favorite-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(3, 37, 65, 0.8);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--tmdb-white);
    font-size: 1rem;
    transition: all var(--transition-speed);
    z-index: 10;
    opacity: 0;
}

.card:hover .favorite-btn {
    opacity: 1;
}

.favorite-btn:hover {
    background-color: rgba(3, 37, 65, 1);
    transform: scale(1.15);
}

.favorite-btn:active {
    transform: scale(0.95);
    animation: heartPulse 0.3s ease-in-out;
}

.favorite-btn.favorite-active {
    background-color: var(--error-red);
    opacity: 1;
}

.favorite-btn.favorite-active:hover {
    background-color: #c91f4f;
}

/* Animación de pulso del corazón */
@keyframes heartPulse {
    0% { transform: scale(1); }
    25% { transform: scale(1.3); }
    50% { transform: scale(1); }
    75% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* Sección de favoritos */
.favorites-section {
    max-width: 1300px;
    margin: 30px auto;
    padding: 0 40px;
}

/* Estado vacío de favoritos */
.empty-favorites {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
    color: var(--text-secondary);
}

.empty-favorites i {
    font-size: 4rem;
    color: var(--tmdb-grey);
    margin-bottom: 20px;
}

.empty-favorites p {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.empty-favorites .empty-subtitle {
    font-size: 1rem;
    color: rgba(0,0,0,0.5);
}

/* Botón de favoritos en navegación */
#favorites-toggle-btn {
    color: var(--tmdb-white);
    background-color: transparent;
    position: relative;
}

#favorites-toggle-btn:hover {
    color: var(--error-red);
}
```

## 🚀 Flujo de Usuario

### Agregar a Favoritos
1. Usuario hace clic en el icono de corazón en una tarjeta de película
2. Si no está autenticado → Redirección a `/auth.html`
3. Si está autenticado:
   - Se agrega el ID de la película al array `favorites` del usuario
   - Se hace PATCH a `http://localhost:3000/usuarios/{userId}`
   - Se actualiza localStorage
   - El botón de corazón cambia a rojo (estado activo)
   - Animación de pulso se ejecuta

### Remover de Favoritos
1. Usuario hace clic en el corazón rojo (activo)
2. Se filtra el ID de la película del array
3. Se hace PATCH a json-server
4. Se actualiza localStorage
5. El botón vuelve al estado inactivo

### Ver Favoritos
1. Usuario hace clic en el botón de corazón en la navegación
2. Las secciones de tendencias/populares/tráilers se ocultan
3. Se muestra la sección de favoritos
4. Se cargan los detalles de las películas desde TMDB API
5. Si no hay favoritos → Mensaje de estado vacío

## 🔄 Flujo de Datos

```
┌─────────────────┐
│  Usuario hace   │
│  clic en ❤️     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ toggleFavorite()│
│  verifica user  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ PATCH request   │─────▶│ json-server  │
│ /usuarios/{id}  │      │  db.json     │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐
│  Actualiza      │
│  localStorage   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Actualiza UI   │
│  (botón ❤️)     │
└─────────────────┘
```

## 🧪 Pruebas Manuales

### Prerequisitos
```bash
# Terminal 1: Iniciar json-server
npm run server

# Terminal 2: Iniciar servidor HTTP
npm start
```

### Casos de Prueba

1. **Usuario No Autenticado**
   - ✅ Botón de favoritos en navegación no visible
   - ✅ Al hacer clic en corazón → Alerta + Redirección a login

2. **Usuario Autenticado**
   - ✅ Botón de favoritos visible en navegación
   - ✅ Agregar película a favoritos
   - ✅ Remover película de favoritos
   - ✅ Ver sección de favoritos vacía
   - ✅ Ver sección de favoritos con películas

3. **Persistencia**
   - ✅ Favoritos persisten después de cerrar sesión y volver a iniciar
   - ✅ db.json actualizado correctamente

4. **UI/UX**
   - ✅ Animación de pulso al hacer clic
   - ✅ Corazón rojo cuando está en favoritos
   - ✅ Hover effects funcionando
   - ✅ Botón solo visible en hover de tarjeta (excepto si está activo)

## 📊 Estructura de API

### Endpoint de Usuario
```
PATCH http://localhost:3000/usuarios/{userId}
Content-Type: application/json

{
  "favorites": [550, 680, 27205]
}
```

### Respuesta
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456",
  "createdAt": "2025-11-18T23:24:07.613Z",
  "favorites": [550, 680, 27205]
}
```

## 🎨 Estados Visuales

| Estado | Apariencia | Condición |
|--------|-----------|-----------|
| Inactivo | Corazón gris, opacity 0 | No en favoritos, sin hover |
| Inactivo Hover | Corazón blanco, opacity 1 | No en favoritos, con hover |
| Activo | Corazón rojo, opacity 1 | En favoritos |
| Activo Hover | Corazón rojo oscuro | En favoritos, con hover |
| Click | Animación de pulso | Durante el clic |

## 🔒 Seguridad

- ✅ Sin vulnerabilidades encontradas (CodeQL scan)
- ✅ Validación de usuario autenticado antes de operaciones
- ✅ Manejo de errores para prevenir crashes
- ✅ Sanitización de entrada (IDs de película son números)

## 📝 Notas de Desarrollo

- El botón de favoritos está en la esquina superior izquierda de cada tarjeta
- Solo es visible al hacer hover sobre la tarjeta (excepto si está activo)
- Usa `e.stopPropagation()` para prevenir que el clic abra el modal de detalles
- La función `toggleFavorite()` usa async/await para operaciones de red
- Los favoritos se cargan bajo demanda (lazy loading)

## 🐛 Posibles Mejoras Futuras

1. Agregar un contador de favoritos en el botón de navegación
2. Implementar drag & drop para reordenar favoritos
3. Agregar categorías o tags para organizar favoritos
4. Sincronización en tiempo real con WebSockets
5. Exportar/importar lista de favoritos
6. Compartir lista de favoritos con otros usuarios
