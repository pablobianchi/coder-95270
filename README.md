# Eventos — API de Plataforma de Eventos e Inscripciones

API backend construida con Node.js, Express y MongoDB (Mongoose) para gestionar usuarios, eventos e inscripciones. Es el proyecto base sobre el que se va a trabajar durante todo el curso de Backend II, incorporando en cada módulo autenticación, roles, autorización, arquitectura por capas y buenas prácticas de una API profesional.

## Temática elegida

Plataforma de eventos e inscripciones: permite administrar eventos (charlas, workshops, meetups, etc.), gestionar los usuarios que participan de la plataforma y llevar el registro de quién se inscribe a cada evento. Cada estudiante puede adaptar la temática a su propio proyecto (eventos musicales, torneos, cursos, ferias, etc.); la estructura técnica es la misma en todos los casos.

## Tecnologías utilizadas

- Node.js (módulos ESM)
- Express
- MongoDB + Mongoose
- dotenv

## Instalación

```bash
git clone <url-del-repositorio>
cd codigo
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (usar `.env.example` como referencia) con las siguientes variables:

| Variable      | Descripción                                   |
|---------------|------------------------------------------------|
| `PORT`        | Puerto donde se levanta el servidor            |
| `NODE_ENV`    | Entorno de ejecución (`development`/`production`) |
| `MONGO_URL`   | Cadena de conexión a MongoDB                   |
| `JWT_SECRET`  | Clave usada para firmar los tokens (se incorpora a partir del módulo de autenticación) |

## Cómo ejecutar el servidor

```bash
npm run dev     # levanta el servidor con recarga automática
npm start       # levanta el servidor en modo normal
```

El servidor queda disponible en `http://localhost:<PORT>`.

## Estructura de carpetas

```
src/
├── server.js          # arranque del servidor y conexión a la base de datos
├── config/            # configuración (conexión a MongoDB, variables de entorno)
├── routes/            # definición de endpoints
├── controllers/        # reciben la request y devuelven la response
├── models/             # schemas de Mongoose
├── middlewares/         # validaciones y lógica intermedia
└── utils/               # funciones reutilizables
app.js                   # configuración de la app de Express
```

`services/`, `repositories/`, `dao/` y `dto/` se incorporan en módulos posteriores del curso, a medida que el proyecto profesionaliza su arquitectura.

## Roles disponibles

El proyecto está preparado para trabajar con tres roles, que se implementan a partir del módulo de autorización:

- **admin**: gestiona usuarios, categorías, eventos e inscripciones.
- **organizer**: crea y administra eventos.
- **user**: consulta eventos y se inscribe o reserva su lugar.

## Endpoints principales

| Método | Endpoint            | Descripción                              |
|--------|---------------------|-------------------------------------------|
| GET    | `/api/health`        | Verifica que el servidor está activo      |
| GET    | `/api/users`          | Lista los usuarios registrados            |
| POST   | `/api/users`          | Crea un usuario                           |
| GET    | `/api/events`         | Lista los eventos disponibles             |
| POST   | `/api/events`         | Crea un evento                            |
| POST   | `/api/sessions`       | Endpoints de autenticación (login/registro) — se completan en los próximos módulos |

## Ejemplo de uso

```bash
curl http://localhost:3000/api/health
# { "status": "ok" }

curl http://localhost:3000/api/events
# { "message": [] }
```

## Estado del proyecto

Este README documenta el punto de partida arquitectónico del proyecto (Pre-entrega 1: estructura por capas, variables de entorno, endpoints base). Autenticación, roles, autorización y el resto de las reglas de negocio se van a ir incorporando módulo a módulo a lo largo del curso.
