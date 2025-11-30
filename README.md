# 📱 Todo Categories -- Ionic Angular (Capacitor)

Aplicación móvil desarrollada con **Ionic + Angular** que permite
gestionar tareas y categorías, asignar colores, editarlas, eliminarlas y
mantener persistencia local. El proyecto usa **Capacitor** para
desplegar en **Android** e **iOS** de forma nativa.

## Funcionalidades Principales

-   Crear, editar y eliminar **tareas**
-   Crear, editar y eliminar **categorías**
-   Asignar colores a las categorías
-   Mostrar colores asociados en listas de tareas y categorías
-   Marcar tareas como completadas o pendientes
-   Persistencia local con **Ionic Storage**
-   Arquitectura limpia (domain / infrastructure / presentation)
-   Optimización de listas extensas con `trackBy`
-   Integración preparada para **Firebase Remote Config**
-   Generación de builds nativos para Android e iOS

## Requisitos Previos

### Instalaciones necesarias

-   Node.js (LTS)
-   Ionic CLI
-   Android Studio + Android SDK
-   Java JDK 11+
-   Xcode (macOS)

### Instalar Ionic CLI

``` bash
npm install -g @ionic/cli
```

## Instalación del Proyecto

``` bash
git clone https://github.com/victor-espinosa97/frontend-accenture/tree/feature/migrate-to-capacitor
cd todo-categories
npm install
```

## Ejecutar en Web

``` bash
ionic serve
```

## Capacitor -- Gestión de plataformas

``` bash
ionic build
npx cap sync
```

## Android

``` bash
npx cap add android
ionic build
npx cap sync android
npx cap open android
```

Ejecutar desde Android Studio: - Seleccionar emulador o dispositivo -
Run ▶️

Generar APK/AAB:

    Build → Build Bundle(s) / APK(s)

## iOS (requiere macOS)

``` bash
npx cap add ios
ionic build
npx cap sync ios
npx cap open ios
```

Ejecutar en simulador o dispositivo: - Seleccionar dispositivo - Run ▶️

Generar IPA:

    Product → Archive

## 🔄 Flujo recomendado

``` bash
ionic build
npx cap sync
```

Para solo copiar:

``` bash
npx cap copy
```
