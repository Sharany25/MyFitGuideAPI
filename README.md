# 💪 MyFitGuideAPI

**Generador inteligente de rutinas y dietas con IA**

MyFitGuideAPI es una API REST escalable que utiliza GPT-3.5 Turbo para crear planes de entrenamiento y dietas completamente personalizados. Diseñada para usuarios finales que buscan asistencia de fitness con tecnología de inteligencia artificial.

---

## 🌟 Características

- ✨ **Generación de rutinas personalizadas** con IA - Crea planes de entrenamiento basados en objetivos, nivel de experiencia y preferencias
- 🥗 **Dietas personalizadas** - Genera planes nutricionales adaptados a objetivos específicos
- 🤖 **Integración con GPT-3.5 Turbo** - Utiliza inteligencia artificial avanzada para crear contenido único
- 🔐 **Autenticación JWT** - Seguridad robusta con tokens JWT y Passport
- 📱 **API REST escalable** - Construida con NestJS para máxima eficiencia
- 📊 **Documentación Swagger** - API completamente documentada y lista para explorar
- 🗄️ **Base de datos MongoDB** - Almacenamiento flexible y escalable
- 📧 **Notificaciones por email** - Sistema de comunicación con usuarios
- 🔔 **Push notifications** - Alertas en tiempo real

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
|-----------|------------|
| **NestJS** | Framework Node.js progresivo para aplicaciones eficientes |
| **TypeScript** | Tipado estático para mayor seguridad |
| **MongoDB** | Base de datos NoSQL |
| **OpenAI API** | GPT-3.5 Turbo para generación de contenido |
| **JWT** | Autenticación segura |
| **Swagger** | Documentación interactiva |
| **Jest** | Testing y cobertura |

---

## 📋 Requisitos Previos

- Node.js >= 18.x
- npm o yarn
- MongoDB (local o Atlas)
- Clave API de OpenAI
- Variables de entorno configuradas

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/DiegoOsorioDEV/MyFitGuideAPI.git
cd MyFitGuideAPI
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/myfitguide

# OpenAI
OPENAI_API_KEY=tu_clave_api_aqui

# JWT
JWT_SECRET=tu_secreto_jwt_aqui
JWT_EXPIRATION=7d

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_contraseña

# Firebase (opcional)
FIREBASE_PROJECT_ID=tu_proyecto_firebase
FIREBASE_PRIVATE_KEY=tu_private_key
FIREBASE_CLIENT_EMAIL=tu_email_firebase

# Puerto
PORT=3000
```

---

## 💻 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Testing
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e

# Lint y formato
npm run lint
npm run format
```

---

## 📚 Endpoints Principales

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/refresh` - Refrescar token

### Rutinas (IA)
- `POST /routines/generate` - Generar rutina personalizada con IA
- `GET /routines/:id` - Obtener rutina específica
- `GET /routines` - Listar mis rutinas
- `DELETE /routines/:id` - Eliminar rutina

### Dietas (IA)
- `POST /diets/generate` - Generar dieta personalizada con IA
- `GET /diets/:id` - Obtener dieta específica
- `GET /diets` - Listar mis dietas
- `DELETE /diets/:id` - Eliminar dieta

### Usuarios
- `GET /users/profile` - Obtener perfil
- `PATCH /users/profile` - Actualizar perfil
- `POST /users/preferences` - Guardar preferencias

---

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:cov

# Tests E2E
npm run test:e2e
```

---

## 📖 Documentación API

Una vez que ejecutes el servidor, la documentación Swagger estará disponible en:

```
http://localhost:3000/api/docs
```

---

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Validación de datos con class-validator
- CORS configurado
- Manejo de errores seguro

---

## 📁 Estructura del Proyecto

```
src/
├── auth/              # Módulo de autenticación
├── users/             # Módulo de usuarios
├── routines/          # Módulo de rutinas (IA)
├── diets/             # Módulo de dietas (IA)
├── ai/                # Integración con OpenAI
├── common/            # Utilidades comunes
├── config/            # Configuración
└── main.ts            # Punto de entrada
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia UNLICENSED.

---

## 👨‍💻 Autor

**Diego Osorio**
- GitHub: [@DiegoOsorioDEV](https://github.com/DiegoOsorioDEV)

---

## 🙏 Agradecimientos

- [NestJS](https://nestjs.com/) - Framework increíble
- [OpenAI](https://openai.com/) - API de GPT-3.5 Turbo
- [MongoDB](https://www.mongodb.com/) - Base de datos

---

## 📞 Soporte

Si tienes preguntas o encuentras problemas, abre un [issue](https://github.com/DiegoOsorioDEV/MyFitGuideAPI/issues).

---

**⭐ Si este proyecto te fue útil, por favor considera darle una estrella en GitHub!**
