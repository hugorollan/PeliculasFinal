# TMDB - Películas, Series y Más

Una aplicación web profesional tipo clon de TMDB (The Movie Database) que permite explorar películas, series y más contenido de entretenimiento.

## 🌟 Características

### Funcionalidades Principales
- **Búsqueda de Películas**: Busca películas en tiempo real usando la API de TMDB
- **Secciones Dinámicas**:
  - Tendencias (Hoy / Esta semana)
  - Películas Populares (Streaming / En TV / En Alquiler / En Cines)
  - Últimos Tráilers
- **Toggles Interactivos**: Cambia entre diferentes categorías con un solo clic
- **Tarjetas de Películas**: Visualización profesional con pósters, calificaciones y fechas
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil

### Mejoras Profesionales
- ✅ Estructura HTML5 semántica
- ✅ Accesibilidad mejorada (ARIA labels, roles, navegación por teclado)
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga y mensajes de error
- ✅ SEO optimizado con meta tags
- ✅ Footer profesional con enlaces
- ✅ Navegación sticky
- ✅ Efectos hover en todos los elementos interactivos

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS, animaciones y responsive design
- **JavaScript (ES6+)**: Lógica de aplicación moderna con async/await
- **TMDB API**: Integración con The Movie Database API
- **Font Awesome**: Iconos profesionales

## 📦 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet (para cargar recursos externos y la API)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/hugorollan/PeliculasFinal.git
cd PeliculasFinal
```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local:

**Opción 1: Servidor Python**
```bash
python3 -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador.

**Opción 2: Servidor Node.js**
```bash
npx http-server -p 8000
```

**Opción 3: Extensión Live Server de VS Code**
- Instala la extensión "Live Server"
- Haz clic derecho en `index.html` → "Open with Live Server"

## 🎨 Estructura del Proyecto

```
PeliculasFinal/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS con animaciones y responsive design
├── script.js           # Lógica JavaScript y API integration
└── README.md          # Documentación
```

## 🔧 Configuración de la API

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

## 🎯 Características Técnicas

### HTML
- Uso de elementos semánticos (`header`, `main`, `nav`, `footer`, `section`)
- ARIA labels y roles para accesibilidad
- Meta tags para SEO
- Estructura de formulario accesible

### CSS
- Variables CSS para mantener consistencia de colores
- Flexbox y Grid para layouts responsivos
- Animaciones CSS (@keyframes)
- Transiciones suaves en elementos interactivos
- Media queries para responsive design
- Custom scrollbar styling
- Hover effects profesionales

### JavaScript
- Código modular y bien organizado
- Async/await para llamadas a API
- Manejo de errores robusto
- Estados de carga y mensajes de error
- Event delegation eficiente
- Document fragments para mejor rendimiento
- Accesibilidad por teclado

## 🌐 Navegadores Soportados

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)

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
- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía Source Sans Pro

## 📞 Contacto

Hugo Rollan - [@hugorollan](https://github.com/hugorollan)

Link del Proyecto: [https://github.com/hugorollan/PeliculasFinal](https://github.com/hugorollan/PeliculasFinal)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!