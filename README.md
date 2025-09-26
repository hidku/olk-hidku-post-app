# Hidku Portfolio Site

Un sitio web personal con menú flotante estilo Twitch, galería de proyectos y secciones editables con Markdown.

## 🚀 Características

- **Menú flotante**: Navegación horizontal que permanece siempre visible
- **Sección Home**: Descripción personal editable con Markdown
- **Galería de Post**: Catálogo de imágenes con modal interactivo
- **Sección Contact**: Información de contacto y servicios
- **Diseño responsivo**: Optimizado para móviles y desktop
- **Tema oscuro**: Estilo moderno con colores tipo Twitch

## 📁 Estructura del Proyecto

```
olk-hidku-post-app/
├── content/                 # Contenido en Markdown
│   ├── _index.md           # Página de inicio
│   ├── post/               # Galería de proyectos
│   │   ├── _index.md       # Descripción de la galería
│   │   └── proyecto-*.md   # Proyectos individuales
│   └── contact/            # Información de contacto
│       └── _index.md
├── layouts/                # Plantillas Hugo
│   ├── _default/
│   │   ├── baseof.html     # Layout principal
│   │   ├── list.html       # Lista de posts
│   │   └── single.html     # Páginas individuales
│   └── index.html          # Página de inicio
├── static/                 # Archivos estáticos
│   ├── css/
│   │   └── style.css       # Estilos principales
│   ├── js/
│   │   └── main.js         # JavaScript del modal
│   └── images/             # Imágenes locales
└── config.toml             # Configuración de Hugo
```

## 🛠️ Cómo usar

### 1. Instalar Hugo

```bash
# macOS
brew install hugo

# Windows
choco install hugo

# Linux
sudo apt install hugo
```

### 2. Ejecutar el sitio localmente

```bash
# Navegar al directorio del proyecto
cd olk-hidku-post-app

# Iniciar el servidor de desarrollo
hugo server -D

# El sitio estará disponible en http://localhost:1313
```

### 3. Editar contenido

#### Modificar la página de inicio
Edita `content/_index.md` para cambiar tu descripción personal.

#### Agregar nuevos proyectos
1. Crea un nuevo archivo en `content/post/` (ej: `mi-proyecto.md`)
2. Usa el siguiente formato:

```markdown
---
title: "Nombre del Proyecto"
date: 2024-01-01
draft: false
image: "URL_de_la_imagen_o_ruta_local"
---

Descripción breve del proyecto que aparecerá en la galería.
```

#### Modificar información de contacto
Edita `content/contact/_index.md` para actualizar tu información de contacto.

### 4. Personalizar el diseño

- **Colores**: Modifica las variables CSS en `static/css/style.css`
- **Fuentes**: Cambia la fuente en la sección `@import` del CSS
- **Logo**: Actualiza el título en `config.toml`

## 🎨 Personalización

### Cambiar colores del tema
Edita las variables CSS en `static/css/style.css`:

```css
:root {
    --primary-color: #9146ff;      /* Color principal */
    --background-color: #0f0f23;   /* Fondo */
    --surface-color: #1a1a2e;      /* Superficies */
    --text-primary: #ffffff;       /* Texto principal */
}
```

### Agregar imágenes locales
1. Coloca las imágenes en `static/images/`
2. Referencia con: `image: "/images/mi-imagen.jpg"`

## 📱 Funcionalidades

- **Modal de imágenes**: Haz clic en cualquier imagen de la galería para verla en grande
- **Navegación suave**: El menú se oculta al hacer scroll hacia abajo
- **Responsive**: Se adapta automáticamente a móviles y tablets
- **Animaciones**: Efectos suaves de entrada y hover

## 🚀 Despliegue

### Netlify (Recomendado)
1. Conecta tu repositorio a Netlify
2. Configura el comando de build: `hugo`
3. Directorio de publicación: `public`

### GitHub Pages
```bash
# Generar el sitio
hugo

# Subir la carpeta public a tu repositorio
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tus propios proyectos.

---

**¡Disfruta creando tu portfolio!** 🎉

