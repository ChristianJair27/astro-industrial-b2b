// Todo el contenido del sitio vive aquí. Para un cliente nuevo: reemplaza cada TODO-CLIENTE.
// Contenido de ejemplo FICTICIO: la empresa, las cifras y los datos de contacto no existen.

export type IconName = 'lathe' | 'mill' | 'grind' | 'wire' | 'layers' | 'car' | 'plane' | 'home' | 'pulse' | 'gauge' | 'file' | 'truck';

export interface Process {
  title: string;
  description: string;
  icon: IconName;
  specs: string[];
}

export interface Industry {
  title: string;
  icon: IconName;
  description: string;
  parts: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const site = {
  // --- Identidad (TODO-CLIENTE) ---
  name: 'Ferrovant Maquinados',
  legalName: 'Ferrovant Maquinados (demo)',
  url: 'https://example.com', // dominio final sin "/" al final
  locale: 'es-MX',
  title: 'Maquinados CNC en Querétaro | Torneado y fresado de precisión | Ferrovant',
  description:
    'Proveedor de piezas maquinadas CNC en Querétaro para automotriz, aeroespacial y electrodomésticos. Torneado, fresado 5 ejes y rectificado. Envía tu RFQ y cotiza en 48 h.',
  /** 'LocalBusiness' (planta con dirección y horario) u 'Organization' (sin datos de local). */
  schemaType: 'LocalBusiness' as 'LocalBusiness' | 'Organization',
  themeColor: '#1b2a36',

  // --- Contacto (TODO-CLIENTE) ---
  phone: '+52 442 000 0000', // como se muestra
  phoneHref: '+524420000000', // E.164 para tel:
  whatsapp: '524420000000', // solo dígitos, con lada de país
  whatsappMessage: 'Hola, vi su sitio web y quiero solicitar una cotización de piezas maquinadas.',
  email: 'ventas@example.com',
  emailSubject: 'RFQ - Solicitud de cotización',
  address: {
    street: 'Circuito Ejemplo 12, Nave 4, Parque Industrial (TODO-CLIENTE)',
    locality: 'El Marqués',
    region: 'Qro.',
    postalCode: '76246',
    country: 'MX',
  },
  geo: { lat: 20.6236, lng: -100.2475 },
  mapQuery: 'El Marqués, Querétaro',
  areaServed: ['Querétaro', 'Guanajuato', 'San Luis Potosí', 'Aguascalientes', 'Nuevo León', 'Estado de México'],
  hours: [
    { days: 'Lunes a viernes', open: '08:00', close: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Sábado', open: '08:00', close: '13:00', schema: ['Saturday'] },
  ],
  locationNotes: [
    'Parque industrial con vigilancia 24/7 y acceso controlado',
    'Andén y patio de maniobras para caja seca de 53 pies',
    'Recepción de material y embarques: lunes a viernes 8:00–17:00',
    'Visitas de auditoría o arranque con cita previa',
  ],
  social: [] as { label: string; href: string }[],

  // --- Hero ---
  hero: {
    eyebrow: 'Maquinados CNC · El Marqués, Querétaro',
    heading: 'Piezas maquinadas a tolerancia, con entregas programadas y trazabilidad',
    sub: 'Torneado, fresado 3 y 5 ejes y rectificado para compradores e ingenieros de la industria automotriz, aeroespacial y de electrodomésticos. Del prototipo a producción en serie.',
    primaryCta: 'Solicitar cotización (RFQ)',
    secondaryCta: 'Ver capacidades',
    specs: [
      { value: '±0.01 mm', label: 'tolerancia típica' },
      { value: '1–50k', label: 'piezas por lote' },
      { value: '48 h', label: 'para cotizar' },
    ],
    imageAlt: 'Ilustración técnica de una brida maquinada con cotas (imagen de ejemplo)',
  },

  // --- Capacidades (TODO-CLIENTE: confirmar con el jefe de producción) ---
  processesIntro: 'Capacidad instalada para prototipos, preseries y producción recurrente bajo programa de entregas.',
  processes: [
    { icon: 'lathe', title: 'Torneado CNC', description: 'Tornos CNC con herramienta motorizada y alimentador de barra.', specs: ['Ø máx. 300 mm', 'Longitud máx. 600 mm', 'Barra hasta Ø 65 mm'] },
    { icon: 'mill', title: 'Fresado CNC 3 y 5 ejes', description: 'Centros de maquinado verticales y 5 ejes simultáneos para geometrías complejas.', specs: ['Recorrido 1000 × 500 × 500 mm', '5 ejes: Ø 400 mm', 'Husillo hasta 12,000 rpm'] },
    { icon: 'grind', title: 'Rectificado', description: 'Rectificado plano y cilíndrico para ajustes finos y acabados espejo.', specs: ['±0.005 mm', 'Ra 0.4 µm', 'Planicidad 0.005 mm'] },
    { icon: 'wire', title: 'Electroerosión por hilo', description: 'Cortes de precisión en aceros endurecidos, insertos y componentes de herramental.', specs: ['Espesor máx. 250 mm', '±0.005 mm', 'Hilo Ø 0.25 mm'] },
    { icon: 'layers', title: 'Acabados y ensamble', description: 'Coordinamos tratamientos térmicos y superficiales con proveedores calificados; ensamble y empaque a especificación.', specs: ['Anodizado / pavonado', 'Tratamiento térmico', 'Empaque retornable'] },
    { icon: 'gauge', title: 'Metrología', description: 'Inspección dimensional en sala con temperatura controlada y reportes por lote.', specs: ['Máquina de coordenadas (CMM)', 'Reporte de primera pieza', 'Certificados de material'] },
  ] satisfies Process[],
  materials: [
    { group: 'Aluminio', items: '6061-T6, 7075-T6, 2024, 5052' },
    { group: 'Acero al carbón y aleado', items: '1018, 1045, 4140, 4340, 8620' },
    { group: 'Acero inoxidable', items: '303, 304, 316, 17-4 PH, 420' },
    { group: 'Aceros grado herramienta', items: 'D2, H13, O1, A2' },
    { group: 'No ferrosos', items: 'Latón C360, bronce SAE 660, cobre' },
    { group: 'Plásticos de ingeniería', items: 'Nylon, acetal, UHMW, PEEK, policarbonato' },
  ],
  tolerances: [
    { feature: 'Tolerancia general (ISO 2768-m)', value: '±0.1 mm' },
    { feature: 'Torneado / fresado de precisión', value: '±0.01 mm' },
    { feature: 'Rectificado', value: '±0.005 mm' },
    { feature: 'Rugosidad típica', value: 'Ra 0.8–1.6 µm' },
    { feature: 'Roscas', value: 'Métrica, UNC/UNF, NPT' },
  ],
  capabilitiesNote: 'Valores de referencia de la demo. TODO-CLIENTE: confirmar con la capacidad real de la planta.',

  // --- Industrias ---
  industries: [
    { icon: 'car', title: 'Automotriz', description: 'Proveedor Tier 2 / Tier 3 para líneas de ensamble y sistemas.', parts: 'Bujes, flechas, soportes, carcasas, componentes de frenos y dirección.' },
    { icon: 'plane', title: 'Aeroespacial', description: 'Componentes de aluminio e inoxidable con trazabilidad por lote.', parts: 'Herrajes, brackets, conectores, herramentales de ensamble.' },
    { icon: 'home', title: 'Electrodomésticos', description: 'Piezas de producción y herramentales para línea blanca.', parts: 'Ejes, acoplamientos, insertos para moldes, fixtures de prueba.' },
    { icon: 'pulse', title: 'Equipo industrial', description: 'Refacciones y piezas de reemplazo para mantenimiento de planta.', parts: 'Engranes, poleas, placas de desgaste, refacciones por plano o muestra.' },
  ] satisfies Industry[],

  // --- Certificaciones: SOLO placeholders. No publicar certificaciones sin certificado vigente. ---
  certifications: [
    { label: 'Sistema de gestión de calidad', value: 'TODO-CLIENTE', note: 'Norma y número de certificado vigente (si aplica).' },
    { label: 'Sector automotriz', value: 'TODO-CLIENTE', note: 'Solo si el cliente cuenta con la certificación.' },
    { label: 'Sector aeroespacial', value: 'TODO-CLIENTE', note: 'Solo si el cliente cuenta con la certificación.' },
  ],
  qualityPractices: [
    'Plan de control e inspección por número de parte',
    'Reporte dimensional de primera pieza y por lote',
    'Certificados de material del proveedor (trazabilidad por colada)',
    'Firma de NDA antes de recibir planos',
  ],

  // --- Proceso de cotización ---
  rfqProcess: [
    { title: 'Envía tu RFQ', text: 'Número de parte, material, volumen anual y link a planos (PDF/STEP). Firmamos NDA si lo requieres.' },
    { title: 'Revisión de ingeniería', text: 'Analizamos manufacturabilidad (DFM), tolerancias críticas y te proponemos mejoras de costo.' },
    { title: 'Cotización formal', text: 'Precio por volumen, tiempo de entrega, herramental (si aplica) y condiciones comerciales en 48 h hábiles.' },
    { title: 'Muestras / primer artículo', text: 'Fabricamos muestras con reporte dimensional para tu aprobación.' },
    { title: 'Producción programada', text: 'Entregas contra programa o kanban, con certificados y reporte por lote.' },
  ],

  // --- Cifras (DEMO: reemplazar por cifras reales y comprobables, o eliminar) ---
  statsAreDemo: true,
  stats: [
    { value: '15+', label: 'años maquinando' },
    { value: '24', label: 'equipos CNC' },
    { value: '180', label: 'números de parte activos' },
    { value: '98%', label: 'entregas a tiempo (12 meses)' },
  ],

  faq: [
    { q: '¿Cuál es el volumen mínimo?', a: 'Hacemos desde prototipos de 1 pieza hasta producción recurrente. El precio unitario baja con el volumen anual y la frecuencia de liberación.' },
    { q: '¿Qué formatos de plano aceptan?', a: 'PDF con cotas y tolerancias, más el modelo 3D en STEP o IGES. Compártelos por link (Drive, OneDrive, WeTransfer o el portal de tu empresa).' },
    { q: '¿Firman acuerdo de confidencialidad?', a: 'Sí. Podemos firmar tu formato de NDA o el nuestro antes de recibir planos.' },
    { q: '¿Suministran el material?', a: 'Sí, compramos material con certificado de molino. También maquinamos material consignado por el cliente.' },
    { q: '¿Facturan y aceptan crédito?', a: 'Emitimos CFDI 4.0. Para clientes recurrentes manejamos crédito sujeto a alta de proveedor. TODO-CLIENTE: confirmar condiciones.' },
    { q: '¿Entregan fuera de Querétaro?', a: 'Sí. Entregamos con unidad propia en el Bajío y por paquetería o flete al resto del país.' },
  ] satisfies FaqItem[],

  form: {
    heading: 'Solicita tu cotización (RFQ)',
    sub: 'Un ingeniero de ventas revisa tu solicitud y responde en 1 día hábil. Cotización formal en 48 h hábiles.',
    materialOptions: ['Aluminio', 'Acero al carbón / aleado', 'Acero inoxidable', 'Acero grado herramienta', 'Latón / bronce / cobre', 'Plástico de ingeniería', 'Otro / por definir'],
    volumeOptions: ['Prototipo (1–10 pzs)', '10–500 pzs/año', '500–5,000 pzs/año', '5,000–50,000 pzs/año', 'Más de 50,000 pzs/año'],
  },

  cta: {
    heading: '¿Tienes un número de parte que cotizar hoy?',
    sub: 'Envíanos el plano por correo o escríbenos por WhatsApp y te confirmamos factibilidad.',
  },
};

export type Site = typeof site;
