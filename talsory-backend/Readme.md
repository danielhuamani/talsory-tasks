# 🛠️ Backend - API de Gestión de Tareas

Este proyecto es el backend de una aplicación de gestión de tareas, desarrollado con **Django** y **Django REST Framework**. Provee autenticación con JWT, registro de usuarios, y operaciones CRUD sobre tareas asociadas a cada usuario.

## 📂 Estructura del proyecto

- `apps/`
  - `custom_auth/`: Lógica de autenticación personalizada (registro, login, serializadores, vistas).
  - `tasks/`: Gestión de tareas (modelo, serializador, vistas y filtros).
  - `core/`: Configuración principal del proyecto (settings, urls, wsgi).
- `manage.py`: Script principal para comandos de Django.
- `requirements.txt`: Lista de dependencias del proyecto.

## 🚀 Cómo iniciar

### Usando Docker
Posicionarse en la raiz del proyecto

```bash
docker compose up --build
