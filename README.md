# Proyecto Talsory

Este repositorio contiene el código fuente completo de la aplicación **Talsory**, que permite la gestión de tareas mediante una API backend en Django y un frontend en Angular.

## 📁 Estructura de Carpetas

### `talsory-backend/`
Contiene el código del backend construido con **Django** y **Django REST Framework**.

Incluye:
- Modelos y serializadores para tareas.
- Autenticación con JWT (`djangorestframework-simplejwt`).
- Paginación personalizada y filtros por estado y prioridad.
- API REST segura y protegida por permisos.

### `talsory-frontend/`
Contiene el proyecto **Angular standalone**.

Incluye:
- Autenticación con JWT y manejo de sesión.
- Páginas para login, registro, listado y edición de tareas.
- Componentes UI usando **PrimeNG**.
- Paginación, filtrado, validaciones y modales de confirmación.


## 🚀 Cómo ejecutar el proyecto con Docker Compose


```bash
cp .env.template .env
docker-compose up --build
