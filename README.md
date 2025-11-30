# 📱 Todo Categories -- Ionic Angular (Cordova)

Aplicación móvil desarrollada con **Ionic + Angular** que permite
gestionar tareas y categorías, asignar colores, editarlas, eliminarlas y
mantener persistencia local. El proyecto usa **Cordova** para
desplegar en **Android** e **iOS(No funciona)** de forma nativa.

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
git clone https://github.com/victor-espinosa97/frontend-accenture
cd todo-categories
npm install
```

## Ejecutar en Web

``` bash
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


