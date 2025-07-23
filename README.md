# OSINT Brief - CTI Dashboard 🚀

![OSINT Brief Logo](https://i.imgur.com/aV7ec31.jpeg)
Una aplicación web de panel de control (dashboard) diseñada para centralizar, gestionar y visualizar datos de Inteligencia de Amenazas Cibernéticas (CTI). Permite a los analistas de seguridad registrar y consultar incidentes, exploits, vulnerabilidades (CVEs), alertas y más, todo desde una única interfaz intuitiva.

El backend está construido con **Node.js, Express y Mongoose**, y el frontend es una aplicación de una sola página (SPA) con **HTML, CSS y JavaScript vainilla**, sin necesidad de frameworks complejos.

---

## ✨ Características Principales

*   **Dashboard Interactivo:** Visualiza estadísticas clave y tendencias a través de gráficos dinámicos (líneas, barras, circulares, radar) con Chart.js.
*   **Gestión de Datos (CRUD):** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar registros para 7 categorías de CTI:
    *   Incidentes de Seguridad
    *   Exploits Publicados
    *   Vulnerabilidades de Día Cero (Zero-Days)
    *   CVEs (Vulnerabilidades y Exposiciones Comunes)
    *   Alertas de Seguridad
    *   Fuentes de Inteligencia
    *   Mitigaciones y Recomendaciones
*   **Búsqueda y Filtrado:** Filtra datos por rango de fechas en el dashboard y busca registros específicos en cada tabla.
*   **Exportación de Reportes:** Genera reportes profesionales en formato **PDF** y exporta todos los datos a un archivo **Excel (.xlsx)**.
*   **Importación de Datos:** Carga masiva de registros desde un archivo Excel, respetando la estructura de cada categoría.
*   **Seguridad:** Manejo seguro de secretos (como la cadena de conexión a la base de datos) utilizando variables de entorno con `dotenv`.
*   **Estructura Unificada:** El servidor de Express sirve tanto la API REST como los archivos del frontend, permitiendo que toda la aplicación se ejecute con un solo comando.

---

## 🔧 Pila Tecnológica (Tech Stack)

*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [Mongoose](https://mongoosejs.com/) (para modelado de objetos MongoDB)
    *   [dotenv](https://www.npmjs.com/package/dotenv) (para variables de entorno)
*   **Frontend:**
    *   HTML5
    *   CSS3 (con variables para theming)
    *   JavaScript (Vanilla)
    *   [Chart.js](https://www.chartjs.org/) (para gráficos)
    *   [jsPDF](https://github.com/parallax/jsPDF) y [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) (para exportar a PDF)
    *   [SheetJS (xlsx)](https://sheetjs.com/) (para exportar/importar a Excel)
*   **Base de Datos:**
    *   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
*   [Git](https://git-scm.com/)
*   Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para crear un clúster gratuito.

### Guía de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/guzmanpatriciomartin/OSINTBRIEF.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd OSINTBRIEF
    ```

3.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    *   Crea un archivo llamado `.env` en la raíz del proyecto.
    *   Abre el archivo y añade tu cadena de conexión de MongoDB Atlas:
      ```env
      DB_URI=mongodb+srv://<tu-usuario>:<tu-password>@<tu-cluster>.mongodb.net/<tu-db>?retryWrites=true&w=majority
      ```
    *   **Importante:** Reemplaza `<tu-usuario>`, `<tu-password>`, `<tu-cluster>` y `<tu-db>` con tus credenciales reales.

5.  **Configura el acceso a la Base de Datos:**
    *   En tu panel de MongoDB Atlas, ve a `Network Access`.
    *   Asegúrate de añadir tu dirección IP actual a la lista de acceso (o `0.0.0.0/0` para permitir el acceso desde cualquier IP, solo para desarrollo).

---

## 🚀 Uso

Una vez que la instalación esté completa, puedes usar los siguientes scripts desde la raíz del proyecto:

*   **Para iniciar el servidor en modo de desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

*   **Para iniciar el servidor en modo de producción:**
    ```bash
    npm start
    ```

Después de ejecutar uno de los comandos, abre tu navegador y visita **`http://localhost:3000`**.

---

## 📂 Estructura del Proyecto

```
/OSINTBRIEF
├── client/              # Contiene todos los archivos del frontend
│   └── index.html       # La aplicación de una sola página
├── server/              # Contiene la lógica del backend
│   └── server.js        # El servidor Express, API y conexión a la DB
├── .env                 # Archivo local con secretos (ignorado por Git)
├── .gitignore           # Archivos y carpetas ignorados por Git
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Este archivo
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

*   **Patricio Guzmán** - [guzmanpatriciomartin](https://github.com/guzmanpatriciomartin)') <!-- Reemplaza esto con una URL a un logo o screenshot -->

Una aplicación web de panel de control (dashboard) diseñada para centralizar, gestionar y visualizar datos de Inteligencia de Amenazas Cibernéticas (CTI). Permite a los analistas de seguridad registrar y consultar incidentes, exploits, vulnerabilidades (CVEs), alertas y más, todo desde una única interfaz intuitiva.

El backend está construido con **Node.js, Express y Mongoose**, y el frontend es una aplicación de una sola página (SPA) con **HTML, CSS y JavaScript vainilla**, sin necesidad de frameworks complejos.

---

## ✨ Características Principales

*   **Dashboard Interactivo:** Visualiza estadísticas clave y tendencias a través de gráficos dinámicos (líneas, barras, circulares, radar) con Chart.js.
*   **Gestión de Datos (CRUD):** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar registros para 7 categorías de CTI:
    *   Incidentes de Seguridad
    *   Exploits Publicados
    *   Vulnerabilidades de Día Cero (Zero-Days)
    *   CVEs (Vulnerabilidades y Exposiciones Comunes)
    *   Alertas de Seguridad
    *   Fuentes de Inteligencia
    *   Mitigaciones y Recomendaciones
*   **Búsqueda y Filtrado:** Filtra datos por rango de fechas en el dashboard y busca registros específicos en cada tabla.
*   **Exportación de Reportes:** Genera reportes profesionales en formato **PDF** y exporta todos los datos a un archivo **Excel (.xlsx)**.
*   **Importación de Datos:** Carga masiva de registros desde un archivo Excel, respetando la estructura de cada categoría.
*   **Seguridad:** Manejo seguro de secretos (como la cadena de conexión a la base de datos) utilizando variables de entorno con `dotenv`.
*   **Estructura Unificada:** El servidor de Express sirve tanto la API REST como los archivos del frontend, permitiendo que toda la aplicación se ejecute con un solo comando.

---

## 🔧 Pila Tecnológica (Tech Stack)

*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [Mongoose](https://mongoosejs.com/) (para modelado de objetos MongoDB)
    *   [dotenv](https://www.npmjs.com/package/dotenv) (para variables de entorno)
*   **Frontend:**
    *   HTML5
    *   CSS3 (con variables para theming)
    *   JavaScript (Vanilla)
    *   [Chart.js](https://www.chartjs.org/) (para gráficos)
    *   [jsPDF](https://github.com/parallax/jsPDF) y [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) (para exportar a PDF)
    *   [SheetJS (xlsx)](https://sheetjs.com/) (para exportar/importar a Excel)
*   **Base de Datos:**
    *   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
*   [Git](https://git-scm.com/)
*   Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para crear un clúster gratuito.

### Guía de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/guzmanpatriciomartin/OSINTBRIEF.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd OSINTBRIEF
    ```

3.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    *   Crea un archivo llamado `.env` en la raíz del proyecto.
    *   Abre el archivo y añade tu cadena de conexión de MongoDB Atlas:
      ```env
      DB_URI=mongodb+srv://<tu-usuario>:<tu-password>@<tu-cluster>.mongodb.net/<tu-db>?retryWrites=true&w=majority
      ```
    *   **Importante:** Reemplaza `<tu-usuario>`, `<tu-password>`, `<tu-cluster>` y `<tu-db>` con tus credenciales reales.

5.  **Configura el acceso a la Base de Datos:**
    *   En tu panel de MongoDB Atlas, ve a `Network Access`.
    *   Asegúrate de añadir tu dirección IP actual a la lista de acceso (o `0.0.0.0/0` para permitir el acceso desde cualquier IP, solo para desarrollo).

---

## 🚀 Uso

Una vez que la instalación esté completa, puedes usar los siguientes scripts desde la raíz del proyecto:

*   **Para iniciar el servidor en modo de desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

*   **Para iniciar el servidor en modo de producción:**
    ```bash
    npm start
    ```

Después de ejecutar uno de los comandos, abre tu navegador y visita **`http://localhost:3000`**.

---

## 📂 Estructura del Proyecto

```
/OSINTBRIEF
├── client/              # Contiene todos los archivos del frontend
│   └── index.html       # La aplicación de una sola página
├── server/              # Contiene la lógica del backend
│   └── server.js        # El servidor Express, API y conexión a la DB
├── .env                 # Archivo local con secretos (ignorado por Git)
├── .gitignore           # Archivos y carpetas ignorados por Git
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Este archivo
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

*   **Patricio Guzmán** - [guzmanpatriciomartin](https://github.com/guzmanpatriciomartin)) <!-- Reemplaza esto con una URL a un logo o screenshot -->

Una aplicación web de panel de control (dashboard) diseñada para centralizar, gestionar y visualizar datos de Inteligencia de Amenazas Cibernéticas (CTI). Permite a los analistas de seguridad registrar y consultar incidentes, exploits, vulnerabilidades (CVEs), alertas y más, todo desde una única interfaz intuitiva.

El backend está construido con **Node.js, Express y Mongoose**, y el frontend es una aplicación de una sola página (SPA) con **HTML, CSS y JavaScript vainilla**, sin necesidad de frameworks complejos.

---

## ✨ Características Principales

*   **Dashboard Interactivo:** Visualiza estadísticas clave y tendencias a través de gráficos dinámicos (líneas, barras, circulares, radar) con Chart.js.
*   **Gestión de Datos (CRUD):** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar registros para 7 categorías de CTI:
    *   Incidentes de Seguridad
    *   Exploits Publicados
    *   Vulnerabilidades de Día Cero (Zero-Days)
    *   CVEs (Vulnerabilidades y Exposiciones Comunes)
    *   Alertas de Seguridad
    *   Fuentes de Inteligencia
    *   Mitigaciones y Recomendaciones
*   **Búsqueda y Filtrado:** Filtra datos por rango de fechas en el dashboard y busca registros específicos en cada tabla.
*   **Exportación de Reportes:** Genera reportes profesionales en formato **PDF** y exporta todos los datos a un archivo **Excel (.xlsx)**.
*   **Importación de Datos:** Carga masiva de registros desde un archivo Excel, respetando la estructura de cada categoría.
*   **Seguridad:** Manejo seguro de secretos (como la cadena de conexión a la base de datos) utilizando variables de entorno con `dotenv`.
*   **Estructura Unificada:** El servidor de Express sirve tanto la API REST como los archivos del frontend, permitiendo que toda la aplicación se ejecute con un solo comando.

---

## 🔧 Pila Tecnológica (Tech Stack)

*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [Mongoose](https://mongoosejs.com/) (para modelado de objetos MongoDB)
    *   [dotenv](https://www.npmjs.com/package/dotenv) (para variables de entorno)
*   **Frontend:**
    *   HTML5
    *   CSS3 (con variables para theming)
    *   JavaScript (Vanilla)
    *   [Chart.js](https://www.chartjs.org/) (para gráficos)
    *   [jsPDF](https://github.com/parallax/jsPDF) y [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) (para exportar a PDF)
    *   [SheetJS (xlsx)](https://sheetjs.com/) (para exportar/importar a Excel)
*   **Base de Datos:**
    *   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Prerrequisitos

*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
*   [Git](https://git-scm.com/)
*   Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para crear un clúster gratuito.

### Guía de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/guzmanpatriciomartin/OSINTBRIEF.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd OSINTBRIEF
    ```

3.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    *   Crea un archivo llamado `.env` en la raíz del proyecto.
    *   Abre el archivo y añade tu cadena de conexión de MongoDB Atlas:
      ```env
      DB_URI=mongodb+srv://<tu-usuario>:<tu-password>@<tu-cluster>.mongodb.net/<tu-db>?retryWrites=true&w=majority
      ```
    *   **Importante:** Reemplaza `<tu-usuario>`, `<tu-password>`, `<tu-cluster>` y `<tu-db>` con tus credenciales reales.

5.  **Configura el acceso a la Base de Datos:**
    *   En tu panel de MongoDB Atlas, ve a `Network Access`.
    *   Asegúrate de añadir tu dirección IP actual a la lista de acceso (o `0.0.0.0/0` para permitir el acceso desde cualquier IP, solo para desarrollo).

---

## 🚀 Uso

Una vez que la instalación esté completa, puedes usar los siguientes scripts desde la raíz del proyecto:

*   **Para iniciar el servidor**
    ```bash
    npm start
    ```

Después de ejecutar uno de los comandos, abre tu navegador y visita **`http://localhost:3000`**.

---

## 📂 Estructura del Proyecto

```
/OSINTBRIEF
├── client/              # Contiene todos los archivos del frontend
│   └── index.html       # La aplicación de una sola página
├── server/              # Contiene la lógica del backend
│   └── server.js        # El servidor Express, API y conexión a la DB
├── .env                 # Archivo local con secretos (ignorado por Git)
├── .gitignore           # Archivos y carpetas ignorados por Git
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Este archivo
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

*   **Patricio Guzmán** - [guzmanpatriciomartin](https://github.com/guzmanpatriciomartin)
