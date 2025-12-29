# 💼 Portafolio Personal - Manuel Henriquez

Portafolio web profesional desarrollado con Vue 3, TypeScript y Vite. Presenta mi experiencia como Desarrollador Full Stack, proyectos destacados, habilidades técnicas y formación académica.

## 🌟 Características

- **Diseño Moderno y Responsivo**: Interfaz limpia y adaptable a cualquier dispositivo
- **Tema Claro/Oscuro**: Selector de tema con persistencia en localStorage
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales atractivos
- **Sistema de Modales**: Vista detallada de proyectos complejos (RapidRiders, ComerciaHN)
- **Arquitectura Modular**: Código organizado con separación de estilos por componente
- **Optimizado para Producción**: Build optimizado para hosting estático

## 🚀 Tecnologías Utilizadas

### Frontend
- **Vue 3** - Framework progresivo de JavaScript con Composition API
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Build tool ultrarrápido
- **CSS3** - Estilos personalizados con gradientes y animaciones

### Herramientas
- **ESLint** - Linter para mantener calidad de código
- **AOS** - Animaciones on scroll (opcional)
- **FontAwesome** - Iconos vectoriales

## 📂 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── assets/          # Recursos estáticos (CSS, imágenes)
│   │   ├── navBar.css   # Estilos del navbar
│   │   └── mainView.css # Estilos de la vista principal
│   ├── components/      # Componentes Vue
│   │   └── navBar.vue   # Barra de navegación
│   ├── views/           # Vistas principales
│   │   └── mainView.vue # Vista principal del portafolio
│   ├── app/
│   │   └── data/
│   │       └── portfolio-data.json  # Datos del portafolio
│   ├── App.vue          # Componente raíz
│   └── main.ts          # Punto de entrada
├── public/              # Archivos públicos
├── dist/                # Build de producción
└── index.html           # HTML base
```

## 📋 Secciones del Portafolio

1. **Hero/Inicio**: Presentación con llamada a la acción
2. **Acerca de Mí**: Biografía profesional y fortalezas
3. **Habilidades Técnicas**: Stack tecnológico con iconos
4. **Educación**: Formación académica y certificaciones
5. **Experiencia**: Historial laboral en timeline
6. **Proyectos**: Portafolio de trabajos destacados
7. **Contacto**: Información de contacto y redes sociales

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MHenriquezD/portfolio.git

# Navegar al directorio
cd portfolio

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Compilar para Producción

```bash
# Generar build optimizado
npm run build

# Vista previa del build
npm run preview
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🎨 Personalización

### Actualizar Contenido

Edita el archivo `src/app/data/portfolio-data.json` para modificar:
- Información de contacto
- Habilidades técnicas
- Educación y certificaciones
- Experiencia laboral
- Proyectos

**Ejemplo:**
```json
{
  "proyectos": [
    {
      "id": 1,
      "titulo": "Mi Proyecto",
      "img": "https://url-imagen.jpg",
      "url": "https://proyecto.com",
      "descripcion": "Descripción del proyecto"
    }
  ]
}
```

### Cambiar Colores y Estilos

Los estilos están separados por componente:
- `src/assets/navBar.css` - Estilos del navbar
- `src/assets/mainView.css` - Estilos principales

## 🌐 Deployment

### Hostinger / Hosting Estático

1. Compilar el proyecto:
   ```bash
   npm run build
   ```

2. Subir el contenido de la carpeta `dist/` a tu servidor

3. Configurar el servidor para servir `index.html` en todas las rutas

### Otras Plataformas

- **Netlify**: Conecta el repositorio y configura build command `npm run build`
- **Vercel**: Importa el proyecto y despliega automáticamente
- **GitHub Pages**: Usa GitHub Actions para deploy automático

## 📱 Responsividad

El portafolio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1920px+)

## 🔧 Configuración IDE Recomendada

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Manuel Henriquez**
- GitHub: [@MHenriquezD](https://github.com/MHenriquezD)
- LinkedIn: [Manuel Henriquez](https://www.linkedin.com/in/manuel-henriquez-a8541423a/)
- Email: mdhenriquez16@gmail.com

## 🤝 Contribuciones

Las contribuciones, issues y feature requests son bienvenidos.

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
