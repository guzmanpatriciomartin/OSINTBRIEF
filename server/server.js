// 1. IMPORTAR LOS PAQUETES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

// 2. INICIALIZAR LA APLICACIÓN Y PUERTO
const app = express();
const PORT = 3000;

// 3. CONFIGURAR MIDDLEWARE
app.use(cors());
app.use(express.json()); // Middleware para parsear bodies de requests JSON
app.use(express.static(path.join(__dirname, '..', 'client')));

// 4. CONEXIÓN A LA BASE DE DATOS REMOTA
const dbURI = process.env.DB_URI
mongoose.connect(dbURI)
.then(() => console.log(`ÉXITO: Conectado a la base de datos remota de MongoDB Atlas en el cluster "Cluster0"`))
.catch(err => console.error('ERROR: No se pudo conectar a la base de datos remota. Verifica la cadena de conexión y que la IP actual esté en la lista blanca de MongoDB Atlas.', err));


// =============================================================================
// 5. DEFINICIÓN DE SCHEMAS Y MODELOS
// =============================================================================

const incidenteSchema = new mongoose.Schema({ fecha: { type: Date, required: true }, tipo: String, entidad: String, pais: String, sector: String, descripcion: String, datosComprometidos: String, actor: String, url: String }, { timestamps: true });
const exploitSchema = new mongoose.Schema({ fecha: { type: Date, required: true }, nombre: String, tipo: String, plataforma: String, cve: String, url: String }, { timestamps: true });
const zeroDaySchema = new mongoose.Schema({ idZD: String, fecha: { type: Date, required: true }, nombre: String, plataforma: String, cvss: Number, estado: String, url: String, descripcion: String }, { timestamps: true });
const alertaSchema = new mongoose.Schema({ titulo: String, descripcion: String, criticidad: String, fecha: { type: Date, required: true }, url: String }, { timestamps: true });

const fuenteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    tipo: String,
    url: String,
    descripcion: String
}, { timestamps: true });

const mitigacionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    fecha: { type: Date, required: true },
    categoria: String,
    prioridad: String,
    descripcion: String,
    url: String
}, { timestamps: true });

const cveSchema = new mongoose.Schema({
    cveId: { type: String, required: true, uppercase: true, trim: true, unique: true },
    fecha: { type: Date, required: true },
    aplicativo: String,
    cvss: Number,
    estado: String,
    descripcion: String,
    url: String
}, { timestamps: true });

// --- Modelos ---
const Incidente = mongoose.model('Incidente', incidenteSchema);
const Exploit = mongoose.model('Exploit', exploitSchema);
const ZeroDay = mongoose.model('ZeroDay', zeroDaySchema);
const Alerta = mongoose.model('Alerta', alertaSchema);
const Fuente = mongoose.model('Fuente', fuenteSchema);
const Mitigacion = mongoose.model('Mitigacion', mitigacionSchema);
const Cve = mongoose.model('Cve', cveSchema);

// =============================================================================
// 6. RUTAS DE LA API (ENDPOINTS)
// =============================================================================

const apiRouter = express.Router();

// Función genérica para crear rutas CRUD para los modelos estándar
const createCrudRoutesFor = (modelName, model) => {
    const router = express.Router();
    
    // GET all
    router.get('/', async (req, res) => { try { const sortKey = model.schema.path('fecha') ? { fecha: -1 } : { createdAt: -1 }; const items = await model.find().sort(sortKey); res.status(200).json(items); } catch (err) { res.status(500).json({ message: `Error al obtener datos para ${modelName}`, error: err.message }); } });
    
    // POST
    router.post('/', async (req, res) => { try { const newItem = new model(req.body); const savedItem = await newItem.save(); res.status(201).json(savedItem); } catch (err) { console.error(`Error en POST /${modelName}:`, err); res.status(400).json({ message: `Error al crear el elemento en ${modelName}`, error: err.message, details: err.errors }); } });
    
    // PUT
    router.put('/:id', async (req, res) => { try { const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!updatedItem) return res.status(404).json({ message: "Elemento no encontrado para actualizar" }); res.status(200).json(updatedItem); } catch (err) { console.error(`Error en PUT /${modelName}/:id:`, err); res.status(400).json({ message: `Error al actualizar el elemento en ${modelName}`, error: err.message, details: err.errors }); } });
    
    // DELETE
    router.delete('/:id', async (req, res) => { try { const deletedItem = await model.findByIdAndDelete(req.params.id); if (!deletedItem) return res.status(404).json({ message: "Elemento no encontrado para eliminar" }); res.status(204).send(); } catch (err) { res.status(500).json({ message: `Error al eliminar el elemento en ${modelName}`, error: err.message }); } });
    
    return router;
};

// --- Router específico para CVEs ---
const cveRouter = express.Router();

// GET all CVEs
cveRouter.get('/', async (req, res) => {
    try {
        const items = await Cve.find().sort({ fecha: -1 });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener datos para cves', error: err.message });
    }
});

// POST new CVE
cveRouter.post('/', async (req, res) => {
    try {
        const newItem = new Cve(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: `Error: El CVE ID '${req.body.cveId}' ya existe.`, error: err.message });
        }
        res.status(400).json({ message: 'Error al crear el elemento en cves', error: err.message, details: err.errors });
    }
});

// PUT (Update) a CVE
cveRouter.put('/:id', async (req, res) => {
    try {
        const updateData = { ...req.body };
        delete updateData.cveId;

        const updatedItem = await Cve.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        
        if (!updatedItem) {
            return res.status(404).json({ message: "CVE no encontrado para actualizar" });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(`Error en PUT /cves/:id:`, err);
        res.status(400).json({ message: 'Error al actualizar el CVE', error: err.message });
    }
});

// DELETE a CVE
cveRouter.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Cve.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Elemento no encontrado para eliminar" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el elemento en cves', error: err.message });
    }
});

// =============================================================================
// ENDPOINT ESPECIAL PARA DETALLES DE CVE (CÓDIGO INTEGRADO AQUÍ)
// =============================================================================
apiRouter.get('/cve-details/:cveId', async (req, res) => {
    const { cveId } = req.params;
    const nvdUrl = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`;
    const circlUrl = `https://cve.circl.lu/api/cve/${cveId}`;

    try {
        // --- Intento #1: API Oficial NVD (sin clave, con rate limit bajo) ---
        console.log(`Intentando obtener ${cveId} desde la API de NVD...`);
        const nvdResponse = await axios.get(nvdUrl);

        if (nvdResponse.data && nvdResponse.data.vulnerabilities && nvdResponse.data.vulnerabilities.length > 0) {
            const vulnerability = nvdResponse.data.vulnerabilities[0].cve;
            let cvssScore = 0;
            let severity = 'N/A';

            // Busca la métrica CVSS más relevante (v3.1 es la preferida)
            if (vulnerability.metrics.cvssMetricV31) {
                cvssScore = vulnerability.metrics.cvssMetricV31[0].cvssData.baseScore;
                severity = vulnerability.metrics.cvssMetricV31[0].cvssData.baseSeverity;
            } else if (vulnerability.metrics.cvssMetricV30) {
                cvssScore = vulnerability.metrics.cvssMetricV30[0].cvssData.baseScore;
                severity = vulnerability.metrics.cvssMetricV30[0].cvssData.baseSeverity;
            }

            console.log(`Éxito con NVD para ${cveId}`);
            return res.status(200).json({
                cveId: vulnerability.id,
                cvss: cvssScore,
                severity: severity,
                description: (vulnerability.descriptions.find(d => d.lang === 'en') || {}).value || 'No description.'
            });
        }
        // Si NVD responde pero no encuentra el CVE, lanza un error para pasar al fallback
        throw new Error("CVE not found in NVD, trying fallback.");

    } catch (nvdError) {
        console.warn(`La API de NVD falló para ${cveId} (razón: ${nvdError.message}). Intentando con el fallback de CIRCL...`);

        // --- Intento #2: API de Respaldo CIRCL ---
        try {
            const circlResponse = await axios.get(circlUrl);

            if (!circlResponse.data || Object.keys(circlResponse.data).length === 0) {
                return res.status(404).json({ message: `CVE ID ${cveId} no se encontró en ninguna fuente.` });
            }

            const cveData = circlResponse.data;
            const cvssScore = cveData.cvss || 0;
            
            let severity = 'N/A';
            if (cvssScore >= 9.0) severity = 'CRITICAL';
            else if (cvssScore >= 7.0) severity = 'HIGH';
            else if (cvssScore >= 4.0) severity = 'MEDIUM';
            else if (cvssScore > 0) severity = 'LOW';
            
            console.log(`Éxito con CIRCL para ${cveId}`);
            return res.status(200).json({
                cveId: cveData.id,
                cvss: cvssScore,
                severity: severity,
                description: cveData.summary || 'No description available.'
            });

        } catch (circlError) {
            console.error(`El fallback de CIRCL también falló para ${cveId} (razón: ${circlError.message}).`);
            return res.status(500).json({ message: 'Ambas APIs (NVD y CIRCL) fallaron al obtener los datos del CVE.' });
        }
    }
});


// --- Asignación de Rutas a la API ---
apiRouter.use('/incidentes', createCrudRoutesFor('incidentes', Incidente));
apiRouter.use('/exploits', createCrudRoutesFor('exploits', Exploit));
apiRouter.use('/zero-days', createCrudRoutesFor('zero-days', ZeroDay));
apiRouter.use('/alertas', createCrudRoutesFor('alertas', Alerta));
apiRouter.use('/fuentes', createCrudRoutesFor('fuentes', Fuente));
apiRouter.use('/mitigaciones', createCrudRoutesFor('mitigaciones', Mitigacion));
apiRouter.use('/cves', cveRouter); 

// Montamos nuestro router principal de la API en la ruta /api
app.use('/api', apiRouter);

// Servir el frontend para cualquier otra ruta
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// 7. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en http://localhost:${PORT}`);
    console.log(`Frontend disponible en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});