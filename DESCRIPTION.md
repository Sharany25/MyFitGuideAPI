# MyFitGuideAPI - Descripción del Proyecto

## 📋 Descripción General

**MyFitGuideAPI** es un generador inteligente de rutinas y dietas que utiliza **GPT-3.5 Turbo** para crear planes de fitness completamente personalizados. La API está orientada a usuarios finales que desean recibir asistencia de entrenamiento y nutrición con tecnología de inteligencia artificial.

---

## 🎯 Objetivo Principal

Proporcionar una solución backend escalable y eficiente que permita a los usuarios obtener:

- ✅ Rutinas de entrenamiento personalizadas basadas en sus objetivos y nivel
- ✅ Planes nutricionales adaptados a sus necesidades específicas
- ✅ Recomendaciones inteligentes generadas con IA
- ✅ Seguimiento y gestión de su progreso fitness

---

## 💡 Características Clave

### 1. **Generación de Rutinas con IA**
- Crea planes de entrenamiento personalizados
- Adapta ejercicios según nivel (principiante, intermedio, avanzado)
- Considera objetivos (pérdida de peso, ganancia muscular, resistencia)
- Incluye descripciones y técnicas de ejecución

### 2. **Generación de Dietas Personalizadas**
- Planes nutricionales basados en objetivos
- Consideración de restricciones dietéticas
- Cálculo de macronutrientes
- Recomendaciones de alimentos

### 3. **Integración con OpenAI**
- Utiliza GPT-3.5 Turbo para generación de contenido
- Respuestas contextuales y relevantes
- Contenido dinámico y único para cada usuario

### 4. **Gestión de Usuarios**
- Autenticación segura con JWT
- Perfiles personalizables
- Preferencias y objetivos almacenados
- Histórico de rutinas y dietas

### 5. **API REST Completa**
- Endpoints para crear, leer, actualizar y eliminar recursos
- Documentación interactiva con Swagger
- Validación de datos robusta
- Manejo de errores consistente

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Usuarios      │
└────────┬────────┘
         │
┌────────▼────────────────────┐
│    MyFitGuideAPI            │
│  (NestJS + TypeScript)      │
│                             │
│  ├─ Auth Module            │
│  ├─ Users Module           │
│  ├─ Routines Module        │
│  ├─ Diets Module           │
│  └─ AI Integration         │
└────────┬─────────┬──────────┘
         │         │
    ┌────▼──┐  ┌───▼────────┐
    │MongoDB│  │ OpenAI API │
    │       │  │(GPT-3.5)   │
    └───────┘  └────────────┘
```

---

## 🔧 Tecnologías Utilizadas

### Backend
- **NestJS** v11.0 - Framework Node.js progresivo
- **TypeScript** v5.7 - Lenguaje tipado
- **Express** v5.0 - Servidor web

### Base de Datos
- **MongoDB** v8.13 - Base de datos NoSQL
- **Mongoose** v8.13 - ODM para MongoDB

### Autenticación & Seguridad
- **JWT** - JSON Web Tokens
- **Passport** - Estrategias de autenticación
- **bcrypt** - Hashing de contraseñas

### IA y APIs Externas
- **OpenAI SDK** v4.95 - Integración con GPT-3.5 Turbo
- **Firebase Admin** v13.5 - Servicios Firebase (opcional)

### Documentación & Testing
- **Swagger** v11.1 - Documentación interactiva
- **Jest** v29.7 - Testing
- **ESLint** - Linting

### Utilidades
- **class-validator** - Validación de datos
- **class-transformer** - Transformación de objetos
- **dotenv** - Gestión de variables de entorno
- **date-fns** - Utilidades de fechas
- **Nodemailer** - Envío de emails
- **web-push** - Push notifications

---

## 📊 Casos de Uso

### 1. Usuario Nuevo
```
1. Se registra en la aplicación
2. Completa su perfil (edad, peso, objetivos, etc.)
3. Solicita generar una rutina personalizada
4. Recibe rutina de entrenamiento adaptada
5. Solicita generar una dieta personalizada
6. Comienza su plan fitness
```

### 2. Usuario Regular
```
1. Inicia sesión
2. Ve sus rutinas y dietas guardadas
3. Solicita nuevas rutinas según su progreso
4. Recibe notificaciones de nuevas recomendaciones
5. Actualiza su perfil con progreso
```

### 3. Integración en App Móvil
```
1. La app móvil consume los endpoints de MyFitGuideAPI
2. Muestra rutinas y dietas al usuario
3. Rastrea progreso y envía notificaciones
4. Sincroniza datos en tiempo real
```

---

## 🎓 Objetivo de Aprendizaje

Este proyecto sirve como ejemplo de:

- ✅ Arquitectura de APIs REST modernas
- ✅ Integración con servicios de IA (OpenAI)
- ✅ Autenticación y autorización en APIs
- ✅ Prácticas de seguridad en backend
- ✅ Uso de bases de datos NoSQL
- ✅ Testing y cobertura de código
- ✅ Documentación de APIs
- ✅ Manejo de errores y validaciones

---

## 🚀 Próximos Pasos / Roadmap

- [ ] Sistema de suscripción (planes gratuito/premium)
- [ ] Integración con wearables (Apple Watch, Fitbit)
- [ ] Seguimiento de progreso con gráficos
- [ ] Chat con IA en tiempo real
- [ ] Comunidad de usuarios (compartir rutinas)
- [ ] Análisis de datos de fitness
- [ ] Integración con otras APIs de fitness
- [ ] Versión 2.0 con más modelos de IA

---

## 📞 Contacto

Para más información sobre este proyecto, contacta a:
- **Developer**: Diego Osorio
- **GitHub**: [@DiegoOsorioDEV](https://github.com/DiegoOsorioDEV)

---

**Última actualización**: Julio 2026
