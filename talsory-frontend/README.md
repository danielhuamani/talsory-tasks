# Frontend - Gestión de Tareas

Este proyecto es la interfaz de usuario desarrollada en **Angular** para una aplicación de gestión de tareas. Utiliza **PrimeNG** para los componentes UI y consume una API REST creada con Django.

## 🧱 Estructura principal

- `pages/`: Contiene las páginas principales como login, registro, listado, creación y edición de tareas.
- `layout/`: Contiene el layout general de la aplicación.
- `services/`: Contiene los servicios de consumo de APIs.
- `guards/`: Contiene los guards como `authGuard` para proteger rutas.
- `app.routes.ts`: Define la configuración de rutas.
- `app.config.ts`: Configuración global de Angular, incluyendo interceptores y tema de PrimeNG.

## 🚀 Cómo iniciar

### Usando Docker
Posicionarse en la raiz del directorio

```bash
docker compose up --build
