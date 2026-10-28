# QA Automation E2E - Practice Software Testing

Framework de pruebas automatizadas End-to-End (E2E) desarrollado con **Playwright** y **TypeScript** sobre la plataforma e-commerce [Practice Software Testing](https://practicesoftwaretesting.com/).

## Características y Arquitectura

* **Page Object Model (POM):** Separación clara entre la lógica de interacción con la UI (`pages/`) y las aserciones de prueba (`tests/`).
* **Custom Fixtures:** Inyección automática de Page Objects mediante `base.extend` (`fixtures/pageObjects.ts`).
* **Gestión de Sesión (`storageState`):** Autenticación previa mediante `auth.setup.ts` para ejecutar suites autenticadas (`checkout`, `smoke`) sin repetir el login por UI en cada test.
* **Data-Driven Testing:** Datos de prueba desacoplados en `data/`.
* **CI/CD con GitHub Actions:** Ejecución automatizada en cada push/PR con generación de reportes HTML como artefactos.

## Requisitos Previos

* Node.js (versión LTS recomendada)
* npm

## Instalación y Configuración

1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm ci
   npx playwright install --with-deps

2. Crear un archivo .env en la raiz del proyecto son las siguientes variables
   ```bash
   BASE_URL= https://practicesoftwaretesting.com
   USER_EMAIL= * utilizar algun email de prueba que brinda la pagina
   USER_PASSWORD= * utilizar contraseña de prueba que brinda la pagina
* O en su defecto utilizar las variables del archivo .env.example

## Ejecución de pruebas
* Correr toda la suite: npm test
* Correr solo el Smoke Test E2E: npm run test:smoke
* Modo interactivo (UI Mode): npm run test:ui
* Ver reporte HTML: npm run report