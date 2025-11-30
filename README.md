# Todo Categories - Ionic Angular

Aplicación móvil desarrollada con **Ionic + Angular**, que permite gestionar tareas y categorías, asignar colores, editar y eliminarlas, además de integrar optimizaciones de rendimiento y soporte para Android e iOS mediante **Cordova**.

---

## Funcionalidades Principales

- Crear, editar y eliminar **tareas**
- Crear, editar y eliminar **categorías**
- Asignar colores a categorías
- Mostrar el color de cada categoría en la lista de tareas y categorías
- Marcar tareas como pendientes o completadas
- Persistencia con **Ionic Storage**
- Arquitectura limpia (domain / infrastructure / presentation)
- Optimización de listas grandes con `trackBy`
- Integración lista para Firebase Remote Config
- Compilación para **Android (APK)** e **iOS (IPA)**

---

## Requisitos Previos

### Instalaciones necesarias
- Node.js (LTS recomendado)
- Java JDK 11 (para Android)
- Android Studio + Android SDK
- Xcode (para iOS, solo en macOS)
- Ionic CLI
- Cordova CLI

### Comandos para instalar Ionic y Cordova
```bash
npm install -g @ionic/cli cordova
```

### Web
```bash
ionic serve
```

### Android
```bash
ionic cordova platform add android
ionic cordova build android --prod
```

### IOS
```bash
ionic cordova platform add ios
ionic cordova build ios --prod
```


