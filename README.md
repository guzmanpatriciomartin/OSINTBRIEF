¡Por supuesto! Un buen README es la puerta de entrada a tu proyecto. Basado en todo lo que hemos construido, aquí tienes un README.md completo y profesional.

Simplemente copia y pega este contenido en un nuevo archivo llamado README.md en la raíz de tu proyecto.

OSINT Brief - CTI Dashboard 🚀

![CTI Dashboard](https://i.imgur.com/aV7ec31.jpeg)

Una aplicación web de panel de control (dashboard) diseñada para centralizar, gestionar y visualizar datos de Inteligencia de Amenazas Cibernéticas (CTI). Permite a los analistas de seguridad registrar y consultar incidentes, exploits, vulnerabilidades (CVEs), alertas y más, todo desde una única interfaz intuitiva.

El backend está construido con Node.js, Express y Mongoose, y el frontend es una aplicación de una sola página (SPA) con HTML, CSS y JavaScript vainilla, sin necesidad de frameworks complejos.

✨ Características Principales

Dashboard Interactivo: Visualiza estadísticas clave y tendencias a través de gráficos dinámicos (líneas, barras, circulares, radar) con Chart.js.

Gestión de Datos (CRUD): Funcionalidad completa para Crear, Leer, Actualizar y Eliminar registros para 7 categorías de CTI:

Incidentes de Seguridad

Exploits Publicados

Vulnerabilidades de Día Cero (Zero-Days)

CVEs (Vulnerabilidades y Exposiciones Comunes)

Alertas de Seguridad

Fuentes de Inteligencia

Mitigaciones y Recomendaciones

Búsqueda y Filtrado: Filtra datos por rango de fechas en el dashboard y busca registros específicos en cada tabla.

Exportación de Reportes: Genera reportes profesionales en formato PDF y exporta todos los datos a un archivo Excel (.xlsx).

Importación de Datos: Carga masiva de registros desde un archivo Excel, respetando la estructura de cada categoría.

Seguridad: Manejo seguro de secretos (como la cadena de conexión a la base de datos) utilizando variables de entorno con dotenv.

Estructura Unificada: El servidor de Express sirve tanto la API REST como los archivos del frontend, permitiendo que toda la aplicación se ejecute con un solo comando.

🔧 Pila Tecnológica (Tech Stack)

Backend:

Node.js

Express.js

Mongoose (para modelado de objetos MongoDB)

dotenv (para variables de entorno)

Frontend:

HTML5

CSS3 (con variables para theming)

JavaScript (Vanilla)

Chart.js (para gráficos)

jsPDF y jsPDF-AutoTable (para exportar a PDF)

SheetJS (xlsx) (para exportar/importar a Excel)

Base de Datos:

MongoDB Atlas

🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

Prerrequisitos

Node.js (se recomienda la versión LTS)

Git

Una cuenta de MongoDB Atlas para crear un clúster gratuito.

Guía de Instalación

Clona el repositorio:

Generated bash
git clone https://github.com/guzmanpatriciomartin/OSINTBRIEF.git


Navega al directorio del proyecto:

Generated bash
cd OSINTBRIEF
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Instala las dependencias del proyecto:

Generated bash
npm install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Configura las variables de entorno:

Crea un archivo llamado .env en la raíz del proyecto.

Abre el archivo y añade tu cadena de conexión de MongoDB Atlas:

Generated env
DB_URI=mongodb+srv://<tu-usuario>:<tu-password>@<tu-cluster>.mongodb.net/<tu-db>?retryWrites=true&w=majority
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Env
IGNORE_WHEN_COPYING_END

Importante: Reemplaza <tu-usuario>, <tu-password>, <tu-cluster> y <tu-db> con tus credenciales reales.

Configura el acceso a la Base de Datos:

En tu panel de MongoDB Atlas, ve a Network Access.

Asegúrate de añadir tu dirección IP actual a la lista de acceso (o 0.0.0.0/0 para permitir el acceso desde cualquier IP, solo para desarrollo).

🚀 Uso

Una vez que la instalación esté completa, puedes usar los siguientes scripts desde la raíz del proyecto:

Para iniciar el servidor :

Generated bash
npm start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Después de ejecutar uno de los comandos, abre tu navegador y visita http://localhost:3000.

📂 Estructura del Proyecto
Generated code
/OSINTBRIEF
├── client/              # Contiene todos los archivos del frontend
│   └── index.html       # La aplicación de una sola página
├── server/              # Contiene la lógica del backend
│   └── server.js        # El servidor Express, API y conexión a la DB
├── .env                 # Archivo local con secretos (ignorado por Git)
├── .gitignore           # Archivos y carpetas ignorados por Git
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Este archivo
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END
📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

👨‍💻 Autor

Patricio Guzmán - guzmanpatriciomartin
