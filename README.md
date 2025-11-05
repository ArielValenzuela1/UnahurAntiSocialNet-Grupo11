## UnahurAntiSocialNet — Grupo 11

Aplicación web construida con React y TypeScript que ofrece una experiencia tipo red social para la comunidad de la Universidad Nacional de Hurlingham. Permite a las personas usuarias registrarse, iniciar sesión (login simulado), explorar un feed de publicaciones, ver el detalle de cada post con sus comentarios e imágenes, crear sus propias publicaciones con etiquetas y gestionar su perfil. El frontend consume la API provista por el profesor, para obtener y persistir la información.

### Requerimientos
- Node.js 18+ y npm
- Acceso a la API en ejecución en `http://localhost:3001`

### Correr el proyecto en local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir la app en el navegador (Vite muestra la URL, por defecto `http://localhost:5173`).

Nota: La app asume que la API está disponible en `http://localhost:3001`. Asegurate de tener el backend activo antes de usar las funcionalidades que consumen datos.

### API utilizada

- Url: `http://localhost:3001`
- Repositorio de la api: `https://github.com/lucasfigarola/backend-api`
- Endpoints usados
  - `GET /posts`, `GET /posts/:id`, `POST /posts`
  - `GET /comments/post/:postId`
  - `GET /tags`, `POST /tags`
  - `POST /postImages` y `GET /postimages/post/:postId`
  - `GET /users`, `POST /users`

