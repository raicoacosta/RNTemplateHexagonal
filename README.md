# RNTemplateHexagonal

**React Native Template con Arquitectura Hexagonal**

Este es un template de [**React Native**](https://reactnative.dev) con arquitectura hexagonal, bootstrapped usando [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Comenzando](#-comenzando)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#-configuración)
- [Troubleshooting](#-troubleshooting)
- [Recursos de Aprendizaje](#-recursos-de-aprendizaje)

## ✨ Características

- ⚡ **React Native 0.82.0** con New Architecture habilitada
- 🏗️ **Arquitectura Hexagonal** (Clean Architecture)
- 📦 **TypeScript 5.9.3** para type safety
- 🎨 **React 19.1.1** con las últimas características
- 🧭 **React Navigation 7.x** para navegación
- 💾 **AsyncStorage 2.x** para persistencia de datos
- 🔥 **Axios 1.12.2** para peticiones HTTP
- ✅ **Zod 4.x** para validación de esquemas
- 🎯 **Path aliases** configurados para imports limpios
- 📱 **Safe Area Context** para manejo de áreas seguras
- 🧪 **Jest** configurado para testing
- 📏 **ESLint & Prettier** para consistencia de código

## 📦 Requisitos Previos

Asegúrate de haber completado las instrucciones de [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) antes de proceder.

**Requisitos mínimos:**

- **Node.js**: >= 20
- **React Native**: 0.82.0
- **iOS**: Xcode 15+ (para desarrollo iOS)
- **Android**: Android Studio con SDK 35, NDK 26.1.10909125

## 🚀 Instalación

Clona el repositorio e instala las dependencias:

```bash
# Clonar el repositorio
git clone https://github.com/raicoacosta/RNTemplateHexagonal.git
cd RNTemplateHexagonal

# Instalar dependencias
yarn install

# Para iOS, instalar pods
cd ios && pod install && cd ..
```

## 🎯 Comenzando

### Paso 1: Iniciar Metro Server

Primero, necesitas iniciar **Metro**, el _bundler_ de JavaScript que viene con React Native:

```bash
yarn start
```

### Paso 2: Iniciar tu Aplicación

Deja que Metro Bundler corra en su propia terminal. Abre una _nueva_ terminal desde la raíz de tu proyecto React Native y ejecuta:

#### Para Android

```bash
yarn android
```

#### Para iOS

```bash
yarn ios
```

Si todo está configurado correctamente, deberías ver tu nueva app ejecutándose en tu Emulador de Android o Simulador de iOS.

También puedes ejecutar la app directamente desde Android Studio o Xcode.

### Paso 3: Modificar tu App

Ahora que has ejecutado exitosamente la app, modifícala:

1. Abre `src/app/App.tsx` en tu editor de texto y edita algunas líneas.
2. Para **Android**: Presiona la tecla <kbd>R</kbd> dos veces o selecciona **"Reload"** desde el **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> en Windows/Linux o <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> en macOS).
3. Para **iOS**: Presiona <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> en tu Simulador iOS para recargar la app.

## 🛠️ Stack Tecnológico

### Core

| Librería | Versión | Descripción |
|----------|---------|-------------|
| React Native | 0.82.0 | Framework principal |
| React | 19.1.1 | Librería UI con Actions y use hook |
| TypeScript | 5.9.3 | Superset tipado de JavaScript |

### Navegación

| Librería | Versión | Descripción |
|----------|---------|-------------|
| @react-navigation/native | 7.1.18 | Navegación base |
| @react-navigation/native-stack | 7.3.28 | Stack navigator nativo |
| @react-navigation/stack | 7.4.10 | Stack navigator JS |
| react-native-screens | 4.17.1 | Optimización de pantallas |
| react-native-gesture-handler | 2.28.0 | Gestos nativos |
| react-native-safe-area-context | 5.6.1 | Safe areas nativas |

### Utilidades

| Librería | Versión | Descripción |
|----------|---------|-------------|
| axios | 1.12.2 | Cliente HTTP |
| zod | 4.1.12 | Validación de esquemas TypeScript-first |
| @react-native-async-storage/async-storage | 2.2.0 | Almacenamiento persistente |

### Desarrollo

| Librería | Versión | Descripción |
|----------|---------|-------------|
| @react-native/eslint-config | 0.82.0 | Configuración ESLint |
| prettier | 3.6.2 | Formateador de código |
| jest | 29.7.0 | Framework de testing |
| babel-plugin-module-resolver | 5.0.2 | Resolución de paths |

## 🏗️ Arquitectura

Este proyecto implementa una **Arquitectura Hexagonal** (también conocida como Ports & Adapters), que es parte de la familia de Clean Architectures propuesta por Robert C. Martin (Uncle Bob).

### ¿Cuál es el objetivo de una arquitectura?

1. **Mantenibilidad:** Una arquitectura bien estructurada facilita la mantenibilidad del software a lo largo del tiempo. Permite a los desarrolladores realizar cambios y mejoras en el sistema de manera más sencilla y con menos riesgo de introducir errores.

2. **Separación de preocupaciones:** Una buena arquitectura divide el sistema en capas y componentes con responsabilidades específicas. Esto facilita la comprensión del código y permite a los desarrolladores enfocarse en aspectos particulares del sistema sin tener que preocuparse por todo al mismo tiempo.

3. **Flexibilidad:** Al desacoplar las diferentes partes del sistema, una arquitectura sólida permite reemplazar o actualizar componentes de manera más fácil. Por ejemplo, si un componente de la infraestructura necesita ser reemplazado por una tecnología diferente, el impacto en el resto del sistema será mínimo.

4. **Escalabilidad:** Una arquitectura bien definida facilita la escalabilidad del sistema, permitiendo agregar nuevas funcionalidades o mejorar el rendimiento sin tener que rediseñar la aplicación completa.

### Metas de la arquitectura de software

1. **Mantener el costo de desarrollo constante:** Una arquitectura efectiva permite que el costo de desarrollo se mantenga constante a lo largo del tiempo, evitando que aumente exponencialmente a medida que el proyecto crece y evoluciona.

2. **Facilitar la incorporación de nuevos miembros al equipo:** Una buena arquitectura hace que sea más fácil para los nuevos miembros del equipo comprender y contribuir al proyecto, ya que proporciona una estructura clara y bien organizada.

3. **Desacoplar componentes:** Desacoplar componentes es clave para lograr una arquitectura flexible y mantenible. Esto permite reemplazar o modificar partes del sistema sin afectar al resto, lo que facilita la adaptación a cambios en los requisitos o las tecnologías.

4. **Separación de preocupaciones:** La arquitectura debe dividir el sistema en capas y componentes con responsabilidades específicas. Esto facilita la comprensión del código y permite a los desarrolladores enfocarse en aspectos particulares del sistema sin tener que preocuparse por todo al mismo tiempo.

5. **Permitir la evolución del sistema:** Una buena arquitectura de software permite que el sistema evolucione y se adapte a nuevos requisitos, cambios en la tecnología o en el entorno.

### Clean Architecture

La Clean Architecture se basa en varios principios de diseño, como la inversión de dependencias, el principio de responsabilidad única y el principio de segregación de interfaces. Estos principios ayudan a guiar la organización del código y las relaciones entre los diferentes componentes del sistema.

#### Principios fundamentales (SOLID)

1. **Principio de responsabilidad única (SRP):** Cada módulo, clase o función debe tener una única responsabilidad.
2. **Principio Abierto/Cerrado (OCP):** Los módulos, clases o funciones deben ser abiertos para la extensión, pero cerrados para la modificación.
3. **Principio de sustitución de Liskov (LSP):** Los objetos de una clase derivada deben poder sustituir a los objetos de la clase base sin afectar la corrección del programa.
4. **Principio de segregación de interfaces (ISP):** Los clientes no deben verse obligados a depender de interfaces que no utilizan.
5. **Principio de inversión de dependencias (DIP):** Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones.

#### Capas de la Clean Architecture

La Clean Architecture se compone de varias capas concéntricas, cada una con responsabilidades específicas:

- **Capa de dominio (Domain):** Esta capa contiene la lógica de negocio principal y las reglas del dominio. Incluye entidades, objetos de valor y lógica de dominio. Las entidades son objetos que tienen una identidad única y representan conceptos clave del dominio del problema. Los objetos de valor son inmutables y se definen por sus atributos en lugar de una identidad única.

- **Capa de aplicación (Application):** Esta capa se encarga de coordinar y orquestar la lógica de negocio en casos de uso específicos. Los casos de uso representan acciones o flujos de trabajo que los usuarios pueden realizar en la aplicación. La capa de aplicación interactúa con la capa de dominio y la capa de infraestructura, pero no contiene lógica de negocio específica.

- **Capa de infraestructura (Infrastructure):** Esta capa proporciona implementaciones concretas de interfaces definidas en las capas de dominio y aplicación. Incluye la comunicación con sistemas externos, como APIs, Storage, Cámara, etc. La capa de infraestructura es responsable de la persistencia de datos, la gestión de conexiones y la implementación de detalles técnicos.

- **Capa de presentación (Presentation):** Esta capa es responsable de la interacción con el usuario y la representación visual de la aplicación. Incluye componentes de interfaz de usuario, como pantallas y componentes, así como la lógica de presentación, como la validación de formularios y la manipulación del estado de la interfaz de usuario.

<div style="text-align: center; margin-block: 3rem">
  <img src="./docs/template/ca_1.svg" width="50%" alt="Clean architecture" />
</div>

### Vertical Slicing

Este proyecto combina la Arquitectura Hexagonal con **Vertical Slicing**, un enfoque para organizar y estructurar el código de una aplicación en función de características o módulos, en lugar de agruparlos por capas técnicas.

**Beneficios del Vertical Slicing:**

- ✅ Facilita la colaboración entre equipos
- ✅ Hace que el código sea más fácil de mantener y navegar
- ✅ Permite trabajar en características individuales sin interferencias
- ✅ Mantiene una estructura de proyecto clara y coherente

Al aplicar el Vertical Slicing, cada característica o módulo tiene todos los archivos relacionados agrupados en una carpeta. Esto incluye componentes, servicios, modelos y archivos de infraestructura relacionados con esa característica específica.

## 📁 Estructura del Proyecto

```
RNTemplateHexagonal/
├── android/                          # Código nativo Android
│   ├── app/
│   │   ├── build.gradle             # Configuración Gradle de la app
│   │   └── src/
│   │       └── main/
│   │           ├── java/com/rntemplatehexagonal/
│   │           │   ├── MainActivity.kt
│   │           │   └── MainApplication.kt
│   │           ├── res/             # Recursos Android
│   │           └── AndroidManifest.xml
│   ├── build.gradle                 # Configuración Gradle raíz
│   └── gradle.properties            # Propiedades Gradle (New Architecture habilitada)
│
├── ios/                             # Código nativo iOS
│   ├── RNTemplateHexagonal/
│   │   ├── AppDelegate.h
│   │   ├── AppDelegate.mm
│   │   └── Info.plist
│   ├── RNTemplateHexagonal.xcodeproj/
│   ├── RNTemplateHexagonal.xcworkspace/
│   └── Podfile                      # Dependencias CocoaPods
│
├── src/
│   └── app/
│       ├── App.tsx                  # Componente principal
│       │
│       ├── core/                    # Core de la aplicación
│       │   │
│       │   ├── Infrastructure/      # Implementaciones de infraestructura
│       │   │   ├── Contracts/       # Interfaces y contratos
│       │   │   │   ├── Http.interface.ts
│       │   │   │   ├── Methods.ts
│       │   │   │   └── Storage.interface.ts
│       │   │   │
│       │   │   ├── Http/            # Implementación HTTP (Axios)
│       │   │   │   ├── Http.implementation.ts
│       │   │   │   └── index.tsx
│       │   │   │
│       │   │   └── Storage/         # Implementación Storage
│       │   │       └── async/
│       │   │           ├── AsyncStorage.implementation.ts
│       │   │           └── index.tsx
│       │   │
│       │   └── Modules/             # Módulos de negocio (Vertical Slices)
│       │       └── CreditCards/     # Ejemplo: Módulo de Tarjetas de Crédito
│       │           │
│       │           ├── Applications/    # Capa de Aplicación
│       │           │   └── UseCases/    # Casos de uso
│       │           │       ├── CreditCardUseCase.ts
│       │           │       └── index.tsx
│       │           │
│       │           └── Domain/          # Capa de Dominio
│       │               ├── Dtos/        # Data Transfer Objects
│       │               │   └── CreditCard.dto.ts
│       │               ├── Entities/    # Entidades del dominio
│       │               │   └── CreditCard.ts
│       │               ├── Mappers/     # Mappers (DTO → Entity)
│       │               │   └── DtoToCreditCard.ts
│       │               └── Repository/  # Interfaces de repositorios
│       │                   └── CreditCard.repository.ts
│       │
│       ├── screens/                 # Capa de Presentación
│       │   └── Auth/                # Ejemplo: Módulo de Autenticación
│       │       ├── index.tsx        # Barrel export
│       │       │
│       │       ├── Login/           # Pantalla de Login
│       │       │   ├── Login.hook.ts        # Custom hook con lógica
│       │       │   ├── Login.presenter.tsx  # Componente presentacional
│       │       │   └── Login.style.ts       # Estilos
│       │       │
│       │       ├── RecoverPassword/ # Pantalla de Recuperación
│       │       │   ├── RecoverPassword.hook.ts
│       │       │   ├── RecoverPassword.presenter.tsx
│       │       │   └── RecoverPassword.style.ts
│       │       │
│       │       └── components/      # Componentes específicos del módulo
│       │           ├── FormLogin/
│       │           │   ├── FormLogin.styles.ts
│       │           │   └── index.tsx
│       │           └── FormRecoverPassword/
│       │               ├── FormRecoverPassword.styles.ts
│       │               └── index.tsx
│       │
│       └── shared/                  # Código compartido
│           ├── Components/          # Componentes reutilizables
│           │   └── Button/
│           │       ├── Button.styles.ts
│           │       └── index.tsx
│           │
│           ├── Enums/              # Enumeraciones
│           │   ├── Storage.enum.ts
│           │   └── index.ts
│           │
│           └── Helpers/            # Funciones auxiliares
│               └── ZodValidator.ts
│
├── __tests__/                      # Tests
│   └── App.test.tsx
│
├── .eslintrc.js                    # Configuración ESLint
├── .prettierrc.js                  # Configuración Prettier
├── babel.config.js                 # Configuración Babel
├── tsconfig.json                   # Configuración TypeScript
├── metro.config.js                 # Configuración Metro Bundler
├── jest.config.js                  # Configuración Jest
├── app.json                        # Configuración de la app
├── package.json                    # Dependencias y scripts
├── index.js                        # Punto de entrada (con SafeAreaProvider)
└── README.md                       # Este archivo
```

### Explicación de la Estructura

#### 📦 Core (`src/app/core/`)

**Infrastructure/Contracts**: Define las interfaces que deben implementar los adaptadores de infraestructura.
```typescript
// Ejemplo: Http.interface.ts
export interface IHttp {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}
```

**Infrastructure/Http**: Implementación concreta del cliente HTTP usando Axios.

**Infrastructure/Storage**: Implementación concreta del almacenamiento usando AsyncStorage.

**Modules**: Cada módulo representa una funcionalidad completa del negocio siguiendo Vertical Slicing.

#### 🎯 Módulos (`src/app/core/Modules/`)

Cada módulo sigue la estructura de Clean Architecture:

- **Domain**: Contiene las entidades, DTOs, mappers y contratos de repositorios (lógica de negocio pura, sin dependencias externas).
- **Applications/UseCases**: Orquesta las operaciones del negocio, interactuando con el dominio y la infraestructura.

#### 🖥️ Screens (`src/app/screens/`)

Organización por características o flujos de usuario:

- **Hook (.hook.ts)**: Lógica de la pantalla (estado, efectos, handlers)
- **Presenter (.presenter.tsx)**: Componente de presentación (UI pura)
- **Style (.style.ts)**: Estilos específicos de la pantalla
- **components/**: Componentes específicos de ese flujo

#### 🔧 Shared (`src/app/shared/`)

Código compartido entre módulos:

- **Components**: Componentes reutilizables (Button, Input, Card, etc.)
- **Enums**: Enumeraciones globales
- **Helpers**: Funciones auxiliares y utilidades

## 📜 Scripts Disponibles

```bash
# Desarrollo
yarn start          # Inicia Metro Bundler
yarn android        # Ejecuta la app en Android
yarn ios            # Ejecuta la app en iOS

# Calidad de Código
yarn lint           # Ejecuta ESLint
yarn test           # Ejecuta tests con Jest

# Mantenimiento
yarn upgrade        # Actualiza dependencias
yarn outdated       # Lista dependencias desactualizadas
```

## ⚙️ Configuración

### Path Aliases

El proyecto está configurado con path aliases para imports limpios:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@enums/*": ["src/app/shared/Enums/*"],
      "@components/*": ["src/app/shared/Components/*"],
      "@helpers/*": ["src/app/shared/Helpers/*"]
    }
  }
}
```

**Uso:**
```typescript
// ❌ Antes
import { Button } from '../../../shared/Components/Button';

// ✅ Después
import { Button } from '@components/Button';
```

### New Architecture

Este proyecto tiene la **New Architecture de React Native habilitada** por defecto:

**Android** (`android/gradle.properties`):
```properties
newArchEnabled=true
```

**iOS** (`ios/RNTemplateHexagonal/Info.plist`):
```xml
<key>RCTNewArchEnabled</key>
<true/>
```

### ESLint

Configuración personalizada para React Native 0.82.0:

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@react-native/no-deep-imports': 'off', // Deshabilitada por incompatibilidad
  },
};
```

### Safe Area

El proyecto usa `react-native-safe-area-context` en lugar del `SafeAreaView` deprecado de React Native:

```tsx
// index.js - Punto de entrada
import {SafeAreaProvider} from 'react-native-safe-area-context';

function AppWithProvider() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
```

```tsx
// En componentes
import {SafeAreaView} from 'react-native-safe-area-context';

function MyScreen() {
  return (
    <SafeAreaView>
      {/* Contenido */}
    </SafeAreaView>
  );
}
```

## 🐛 Troubleshooting

### Android

**Error: SDK location not found**
```bash
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

**Error: Gradle daemon**
```bash
cd android
./gradlew clean
cd ..
```

**Error: Port 8081 already in use**
```bash
lsof -ti:8081 | xargs kill -9
```

### iOS

**Error: Pod install fails**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Error: Xcode build fails**
```bash
cd ios
xcodebuild clean
cd ..
```

### General

**Error: Metro bundler cache**
```bash
yarn start --reset-cache
```

**Error: Node modules**
```bash
rm -rf node_modules yarn.lock
yarn install
```

Si no puedes solucionar un problema, consulta la página de [Troubleshooting de React Native](https://reactnative.dev/docs/troubleshooting).

## 📚 Recursos de Aprendizaje

### React Native

- [React Native Website](https://reactnative.dev) - Documentación oficial
- [Getting Started](https://reactnative.dev/docs/environment-setup) - Setup del entorno
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - Tour guiado de los básicos
- [Blog](https://reactnative.dev/blog) - Posts oficiales del blog
- [GitHub Repository](https://github.com/facebook/react-native) - Repositorio oficial

### Arquitectura

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Por Uncle Bob
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) - Por Alistair Cockburn
- [SOLID Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) - Principios de diseño

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Documentación oficial
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Guía práctica

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado.

## 👥 Autores

- **Raico Acosta** - [@raicoacosta](https://github.com/raicoacosta)

---

⭐ Si este template te resultó útil, considera darle una estrella en GitHub!
