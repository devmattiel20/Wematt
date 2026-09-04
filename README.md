# Wematt

Wematt es una aplicacion web para consultar el clima actual de cualquier ciudad. Permite buscar una ubicacion y visualizar su temperatura, humedad, velocidad del viento y estado meteorologico.

La aplicacion esta construida con React y Vite, y utiliza la API publica de [Open-Meteo](https://open-meteo.com/) para obtener los datos.

## Requisitos

- Node.js 20.19 o superior
- npm, incluido con Node.js
- Git, si quieres clonar o subir el proyecto a GitHub

## Instalacion local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/devmattiel20/Wematt.git
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd Wematt
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre en tu navegador la URL que muestra Vite, normalmente:

   ```text
   http://localhost:5173
   ```

No es necesario configurar variables de entorno ni claves de API.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la version optimizada para produccion en la carpeta `dist`.
- `npm run preview`: sirve localmente la version generada en `dist`.
- `npm run lint`: revisa el codigo con ESLint.

## Crear una build de produccion

```bash
npm run build
npm run preview
```

## Subir el proyecto a GitHub

Si el repositorio aun no existe en GitHub:

1. Crea un repositorio nuevo y vacio en GitHub.
2. Inicializa Git en la carpeta del proyecto:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Conecta el repositorio local con GitHub y sube los archivos:

   ```bash
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

Reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con tus datos de GitHub.

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Open-Meteo API

## Licencia

Este proyecto es de uso educativo y personal.
