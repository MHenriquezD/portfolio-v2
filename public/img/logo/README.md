# Paquete de logo — MH

4 variantes finales, cada una en SVG (vectorial), PNG en varios tamaños, y favicon.ico multi-resolución.

## Contenido

- `4A_mh-code-blue` → `<MH/>` con ángulos azules
- `4D_mh-code-mint` → `<MH/>` con ángulos verde menta
- `5A_angles-blue` → `< / >` solo, azul
- `5D_angles-mint` → `< / >` solo, verde menta

Cada variante incluye:
- `svg/NOMBRE.svg` — vectorial, fondo negro sólido (para favicon)
- `svg/NOMBRE_transparent.svg` — vectorial, fondo transparente (para usarlo sobre secciones del sitio)
- `png/NOMBRE_16.png`, `_32.png`, `_48.png` — tamaños de favicon
- `png/NOMBRE_180.png` — tamaño para `apple-touch-icon` (iOS/Safari)
- `png/NOMBRE_512.png` — tamaño para PWA / redes sociales / avatar
- `png/NOMBRE_transparent_512.png` — versión grande sin fondo
- `png/NOMBRE_favicon.ico` — ICO multi-resolución (16/32/48), listo para usar directo

## Cómo instalarlo en tu proyecto Vue (Vite)

1. Elegí la variante que más te guste y copiá su `favicon.ico` a la carpeta `public/` de tu proyecto, reemplazando el actual.
2. Copiá también el `_512.png` a `public/` como `apple-touch-icon.png` (o el `_180.png` si querés el tamaño exacto recomendado por Apple).
3. En tu `index.html` (raíz del proyecto), asegurate de tener algo así en el `<head>`:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

4. Si querés usar el logo también dentro del sitio (navbar, footer), usá el SVG transparente — por ejemplo en un componente Vue:

```vue
<img src="@/assets/logo.svg" alt="MH" class="h-8 w-8" />
```

Copiá el `_transparent.svg` de la variante elegida a `src/assets/logo.svg`.

5. Vite cachea agresivamente el favicon en desarrollo — si no ves el cambio, hacé un hard refresh (Ctrl+Shift+R) o abrí en pestaña de incógnito.

## Nota sobre tipografías

Los SVG usan fuentes del sistema (Poppins para "MH", DejaVu Sans Mono para los ángulos de código) como aproximación a Baloo 2 / JetBrains Mono que usás en el sitio. Si querés el resultado pixel-perfect con esas fuentes exactas, avisame y te regenero los archivos con el texto convertido a paths usando las fuentes reales.
