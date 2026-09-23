import svcAsesoria from "@/assets/svc-asesoria-2.png";
import svcConsultoria from "@/assets/svc-consultoria-2.png";
import svcPromocion from "@/assets/svc-promocion-2.png";
import svcAnalisis from "@/assets/svc-analisis-2.png";
import svcValor from "@/assets/svc-valor-2.png";
import svcLegal from "@/assets/svc-legal-2.png";
import artNoticias1 from "@/assets/art-noticias-1.jpeg";
import artNoticias2 from "@/assets/art-noticias-2.jpeg";
import artNoticias3 from "@/assets/art-noticias-3.jpeg";
import artNoticias4 from "@/assets/art-noticias-4.jpeg";
import artLey1 from "@/assets/art-ley-1.jpeg";
import artLey2 from "@/assets/art-ley-2.jpeg";
import artLey3 from "@/assets/art-ley-3.jpg";
import ev1 from "@/assets/ev-1.jpeg";
import ev2 from "@/assets/ev-2.jpg";
import ev3 from "@/assets/ev-3.webp";
import ev4 from "@/assets/ev-4.png";
import ev5 from "@/assets/ev-5.png";
import ev6 from "@/assets/ev-6.png";

// Textos finales entregados por el cliente (fase wireframe B/N).
// Solo texto: no colores de marca, no imágenes reales.

export const BIENVENIDA_RESUMEN =
  "Transformamos necesidades en oportunidades de inversión estratégicas con visión y seguridad.";

export const BIENVENIDA_PARRAFOS = [
  "Nuestro profundo conocimiento y expertise del mercado inmobiliario de Yucatán, con más de 30 años, nos permite identificar oportunidades estratégicas respaldadas por análisis, datos, tendencias y evidencia con visión de largo plazo. Más que vender y mostrar propiedades, asesoramos a cada cliente para que tome decisiones informadas y construya un patrimonio sólido.",
];

export const BIENVENIDA = BIENVENIDA_PARRAFOS.join(" ");

export const EMPRESA_INTRO_RESUMEN =
  "En Roche Realtors transformamos necesidades y deseos en oportunidades de inversión estratégicas con datos, visión y seguridad.";

export const EMPRESA_INTRO_PARRAFOS = [
  "Nuestro profundo conocimiento y expertise del mercado inmobiliario de Yucatán, con más de 30 años, nos permite identificar oportunidades estratégicas respaldadas por análisis, datos, tendencias y evidencia con visión de largo plazo. Más que mostrar propiedades, asesoramos a cada cliente para que tome decisiones informadas y construya un patrimonio sólido en una de las regiones con mayor desarrollo y potencial del país.",
];

export const YUCATAN_HOME_RESUMEN =
  "Yucatán vive hoy la transformación industrial y económica más importante de su historia.";

export const YUCATAN_HOME_PARRAFOS = [
  "Lo que una vez fue una joya colonial oculta del sureste mexicano, ahora se destaca como un ejemplo de modernización, inversiones, desarrollo sostenible, seguridad, calidad de vida y políticas públicas con visión a largo plazo e incentivos para las inversiones.",
];


export const YUCATAN_HOME = YUCATAN_HOME_PARRAFOS.join(" ");

export const SERVICIOS: { title: string; desc: string; icon: string }[] = [
  {
    title: "Asesoría inmobiliaria: compra, venta y renta",
    icon: svcAsesoria,
    desc: "Representación integral e intermediación en procesos de adquisición, venta y arrendamiento de inmuebles residenciales, comerciales e industriales.",
  },
  {
    title: "Consultoría para desarrolladores",
    icon: svcConsultoria,
    desc: "Asesoría estratégica a desarrolladores, aportando visión de mercado y experiencia especializada para la definición y dirección de sus proyectos.",
  },
  {
    title: "Promoción exclusiva",
    icon: svcPromocion,
    desc: "Estrategias de difusión y posicionamiento con proyección local, nacional e internacional, según sea el caso, dirigidas a audiencias calificadas de alto poder adquisitivo.",
  },
  {
    title: "Análisis de mercado",
    icon: svcAnalisis,
    desc: "Estudio de indicadores y comportamiento del mercado para fundamentar decisiones de inversión, adquisición y comercialización.",
  },
  {
    title: "Opinión de valor",
    icon: svcValor,
    desc: "Determinación objetiva del valor comercial de la propiedad en base a sus características y comportamiento del mercado para definir el precio óptimo de comercialización.",
  },
  {
    title: "Asesoría legal, fiscal y normativa",
    icon: svcLegal,
    desc: "Asesoría y coordinación con especialistas para atender los aspectos legales, fiscales, normativos y urbano ambientales.",
  },
];

export const POR_QUE_ROCHE_RESUMEN =
  "En Roche Realtors entendemos que una inversión inmobiliaria representa una decisión patrimonial de gran importancia.";

export const POR_QUE_ROCHE_PARRAFOS = [
  "Por ello, nuestro compromiso va más allá de comercializar propiedades: ofrecemos una asesoría estratégica sustentada en tus necesidades, estilo de vida, conocimiento del mercado, análisis objetivo y una atención personalizada en cada etapa del proceso.",
  "Como firma especializada en bienes raíces de alta gama e inversiones inmobiliarias estratégicas en Yucatán, representamos los intereses de nuestros clientes con profesionalismo, honestidad, transparencia y una visión de largo plazo.",
];

export const POR_QUE_ROCHE_INTRO = POR_QUE_ROCHE_PARRAFOS.join(" ");

export const PILARES_ROCHE: { title: string; desc: string }[] = [
  {
    title: "Asesoría estratégica",
    desc: "Analizamos cada oportunidad considerando el perfil del inversionista, sus necesidades, objetivos patrimoniales y las condiciones del mercado. Te ayudamos a identificar las mejores opciones que generan mayor valor con seguridad.",
  },
  {
    title: "Inteligencia de mercado",
    desc: "Nuestro profundo conocimiento del mercado inmobiliario de Yucatán, con más de 30 años de experiencia, nos permite leer el mercado, evaluar tendencias, identificar zonas con potencial de crecimiento y ofrecer información confiable para respaldar decisiones de inversión.",
  },
  {
    title: "Transparencia y confianza",
    desc: "Construimos relaciones de largo plazo basadas en la ética profesional, la honestidad, comunicación clara y recomendaciones objetivas. Cada propuesta se sustenta en tus necesidades, análisis, experiencia y datos del mercado, nunca en la presión por concretar una venta.",
  },
  {
    title: "Atención personalizada",
    desc: "Cada cliente tiene objetivos distintos. Por ello, diseñamos estrategias de acompañamiento adaptadas a sus necesidades y estilo de vida, ofreciendo un servicio cercano, discreto y altamente profesional durante todo el proceso.",
  },
  {
    title: "Alcance nacional e internacional",
    desc: "Nuestra experiencia y trayectoria, de más de 30 años, nos ha permitido construir una red de profesionales expertos y confiables a nivel local, nacional e internacional, lo cual nos permite mayor alcance y exposición.",
  },
];


export type Stat = { valor: string; label: string };

export type SeccionYucatan = {
  title: string;
  resumen: string;
  parrafos: string[];
  listaTitulo?: string;
  lista?: string[];
  listas?: { titulo: string; items: string[] }[];
  stats?: Stat[];
};

export const YUCATAN_STATS: Stat[] = [
  { valor: "≈ 3%", label: "Crecimiento económico anual promedio (últimos 10 años)" },
  { valor: "34 → 114 ha", label: "Ampliación del Puerto de Progreso" },
  { valor: "8° año", label: "Consecutivo como estado más pacífico de México" },
  { valor: "N.º 1", label: "Mérida, ciudad más segura de América Latina" },
  { valor: "1,973 MW", label: "Capacidad energética instalada en el estado" },
  { valor: "+25", label: "Especialidades médicas de alta atención" },
];


export const YUCATAN_SECCIONES: SeccionYucatan[] = [
  {
    title: "Una transformación en marcha",
    resumen:
      "Puerto, tren de carga, corredores industriales y un nuevo aeropuerto: la infraestructura que cambia al estado.",
    parrafos: [
      "Yucatán consolida un proceso de modernización con visión de largo plazo: expansión del Puerto de Altura de Progreso (de 34 a 114 hectáreas, con ampliación del canal de navegación), conexión del Tren Maya de carga, cuatro nuevos corredores industriales y el Aeropuerto Internacional Chichén Itzá como hub logístico y aeroespacial.",
      "Esta infraestructura, respaldada por inversión pública y privada, posiciona al estado como plataforma de negocios entre Norteamérica, Centroamérica y el Caribe.",
    ],
    stats: [{ valor: "34 → 114 ha", label: "Puerto de Progreso" }],
  },
  {
    title: "Seguridad y calidad de vida",
    resumen: "El estado más pacífico de México por octavo año consecutivo.",
    parrafos: [
      "Según el Índice de Paz México 2025, elaborado por el Instituto para la Economía y la Paz, Yucatán mantiene la tasa de homicidios más baja del país.",
      "Mérida, su capital, es reconocida como la ciudad más segura de América Latina y la segunda del continente americano, solo por debajo de Quebec, según el ranking de CEO World Magazine.",
      "Este entorno de seguridad y estabilidad se traduce en confianza para residentes, visitantes e inversionistas.",
    ],
    stats: [
      { valor: "8° año", label: "Estado más pacífico de México" },
      { valor: "N.º 1", label: "Ciudad más segura de América Latina" },
    ],
  },
  {
    title: "Ubicación estratégica y conectividad",
    resumen:
      "Puerta de entrada marítima y aérea hacia Norteamérica, el Caribe y Centroamérica.",
    parrafos: [
      "Yucatán ofrece acceso directo a la costa este de Estados Unidos y a los mercados de Centroamérica y Sudamérica, con Mérida como nodo central de conectividad aérea y marítima.",
      "El Puerto de Progreso conecta con líneas navieras internacionales, mientras que el nuevo Aeropuerto Internacional Chichén Itzá suma capacidad de carga y pasajeros como hub complementario.",
      "Mérida cuenta además con uno de los sistemas carreteros de mejor calidad y seguridad del país, que conecta con los principales destinos turísticos en menos de tres horas.",
    ],
    listas: [
      {
        titulo: "Rutas marítimas",
        items: [
          "Líneas navieras: Maersk, CMA CGM y MSC.",
          "Destinos: Houston, Nueva York, Montreal, Europa, Cuba, Kingston y Cartagena.",
        ],
      },
      {
        titulo: "Vuelos directos nacionales desde Mérida",
        items: [
          "Ciudad de México",
          "Ciudad de México – AIFA",
          "Guadalajara",
          "León/Bajío",
          "Monterrey",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Tijuana",
          "Toluca",
          "Tuxtla Gutiérrez",
          "Veracruz",
          "Villahermosa",
        ],
      },
      {
        titulo: "Vuelos directos internacionales desde Mérida",
        items: [
          "Miami (EE. UU.)",
          "Houston (EE. UU.)",
          "Orlando (EE. UU.)",
          "Dallas–Fort Worth (EE. UU., estacional)",
          "Los Ángeles (EE. UU., estacional)",
          "La Habana (Cuba)",
          "Ciudad de Guatemala (Guatemala)",
          "Flores (Guatemala)",
          "Toronto (Canadá, estacional)",
        ],
      },
      {
        titulo: "Destinos a menos de 3 horas en vehículo",
        items: [
          "Celestún, Sisal, Progreso y Telchac.",
          "Río Lagartos, Las Coloradas y El Cuyo.",
          "Uxmal, Chichén Itzá, Izamal y Valladolid.",
          "Cancún, Isla Mujeres, Playa del Carmen y Tulum.",
        ],
      },
    ],
  },
  {
    title: "Crecimiento económico sostenido",
    resumen: "Una década de expansión continua y por arriba del promedio nacional.",
    parrafos: [
      "El crecimiento económico anual promedio de Yucatán durante los últimos 10 años ha sido cercano al 3%, muy por encima del promedio nacional, que se ubica en 1.7%.",
      "El estado combina condiciones macroeconómicas estables, políticas públicas con visión estratégica y un entorno seguro que sostienen la confianza para la inversión de largo plazo.",
    ],
    listaTitulo: "Sectores productivos que impulsan la economía",
    lista: [
      "Textil",
      "Automotriz",
      "Aeronáutica",
      "Tecnologías de la Comunicación",
      "Agroindustria",
      "Bebidas",
      "Energías Verdes",
      "Industria Naval",
      "Turismo de Cruceros",
    ],
    stats: [
      { valor: "≈ 3%", label: "Crecimiento anual promedio (10 años)" },
      { valor: "1.7%", label: "Promedio nacional" },
    ],
  },

  {
    title: "Energía",
    resumen: "Capacidad instalada que prácticamente se duplicará en los próximos años.",
    parrafos: [
      "La entidad cuenta con una capacidad instalada de 1,973 MW, operando actualmente entre el 60% y 80% de su capacidad, con 426 MW en energías renovables —solar, eólica y distribuida— que representan el 25% del consumo eléctrico estatal y colocan a Yucatán en el 9° lugar nacional en capacidad de distribución.",
      "La Comisión Federal de Electricidad construye dos plantas de ciclo combinado, Mérida IV (499 MW) y Valladolid (1,020 MW), que prácticamente duplicarán la capacidad instalada del estado.",
      "En paralelo, la ampliación del gasoducto Cuxtal-Mayakan, a cargo de ENGIE, elevará el suministro de gas natural de 250-280 a 520 millones de pies cúbicos por día en 2026.",
    ],
    stats: [
      { valor: "1,973 MW", label: "Capacidad instalada" },
      { valor: "426 MW", label: "Energías renovables" },
    ],
  },
  {
    title: "Riqueza natural y cultural",
    resumen: "Patrimonio milenario, costa, cenotes y una identidad cultural viva.",
    parrafos: [
      "Yucatán conjuga un patrimonio encabezado por Chichén Itzá, una de las Nuevas Siete Maravillas del Mundo y sitio Patrimonio de la Humanidad por la UNESCO, con un entorno natural distintivo de cenotes, costa y selva.",
      "A ello se suma la calidez de su gente y una diversidad cultural que se expresa en tradiciones, artesanías, música y fiestas populares con raíces mayas e hispánicas, además de una gastronomía de reconocimiento internacional.",
    ],
    listaTitulo: "Un amplio abanico de atractivos",
    lista: [
      "Sitios arqueológicos: Uxmal, Ek Balam y Mayapán.",
      "Parques y reservas naturales: Celestún y Río Lagartos.",
      "Costa yucateca: más de 378 km, con Progreso, Telchac, Sisal y El Cuyo.",
      "Pueblos mágicos: Izamal y Valladolid.",
    ],
  },
  {
    title: "Educación de excelencia",
    resumen: "Mérida es el principal polo educativo del sureste de México.",
    parrafos: [
      "El ecosistema educativo está encabezado por la Universidad Autónoma de Yucatán (UADY) y complementado por instituciones privadas de sólida trayectoria.",
      "Esta combinación de instituciones públicas y privadas forma el capital humano que sostiene el crecimiento económico e industrial del estado.",
    ],
    listaTitulo: "Instituciones destacadas",
    lista: [
      "Universidad Autónoma de Yucatán (UADY).",
      "Universidad Anáhuac Mayab, primera universidad privada del sureste (1984).",
      "Universidad Marista de Mérida y Universidad Modelo (1997).",
      "Próximamente, la Universidad IBERO.",
      "Educación básica y media: Colegio CUM, Cumbres, Piaget, Rogers, Patria, Mérida de Mujeres y Alianz, entre otros.",
    ],
  },
  {
    title: "Servicios de salud y atención médica",
    resumen: "La capital médica del sureste mexicano, con hospitales de alta especialidad.",
    parrafos: [
      "El hospital Faro del Mayab, con certificación de la Joint Commission International (JCI), se suma a instituciones como Star Médica y el Centro de Especialidades Médicas del Sureste, ampliando la atención a más de 25 especialidades.",
      "Esta infraestructura ha impulsado el turismo médico, con ahorros de entre 40% y 60% frente a los costos de Estados Unidos.",
    ],
    stats: [{ valor: "+25", label: "Especialidades médicas" }],
  },
  {
    title: "Un nuevo capítulo para la región",
    resumen: "Uno de los destinos más prometedores de México para construir patrimonio.",
    parrafos: [
      "Entre infraestructura de talla internacional, inversión extranjera creciente y un gobierno enfocado en el desarrollo productivo, Yucatán escribe un nuevo capítulo en su historia económica y social.",
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQ_GRUPOS: { tema: string; items: Faq[] }[] = [
  {
    tema: "Compra e inversión",
    items: [
      { q: "¿En qué tipo de propiedades se especializan?", a: "Nuestra asesoría y gestión se divide en 3 tipos de propiedades: Residencial de Lujo, Comercial e Industrial. Residencial de lujo a su vez comprende Casas, Departamentos, Haciendas y Terrenos Residenciales. Comercial contempla terrenos con uso y factibilidad comercial y/o industrial, locales comerciales, plazas comerciales, oficinas, propiedades con uso y factibilidad comercial como haciendas y/o grandes residencias y edificios, entre otras. Industrial contempla terrenos con uso y factibilidad adecuada, parques industriales, naves y bodegas, entre otros." },
      { q: "¿En qué zonas trabajan?", a: "Centro Histórico, Norte de Mérida, Zona Country, Costa Yucateca y algunos pueblos mágicos en el interior del estado de Yucatán como Izamal y Valladolid." },
      { q: "¿Me ayudan a encontrar una propiedad aunque no esté publicada en su página?", a: "Sí. Nuestro equipo realiza una búsqueda personalizada de acuerdo con sus necesidades, estilo de vida y presupuesto. Posteriormente, pasan por un riguroso filtro y análisis y solo aquellas que lo pasan son propuestas a nuestros clientes." },
      { q: "¿Puedo comprar siendo extranjero?", a: "Sí. Asesoramos a clientes internacionales durante todo el proceso, incluyendo la estructura legal, fiscal y contable aplicable a sus necesidades para la adquisición de inmuebles en México." },
      { q: "¿También asesoran sobre opciones de inversión?", a: "Sí. Le asesoramos y presentamos las mejores alternativas en base a sus necesidades y objetivos de inversión para ayudarle a tomar decisiones informadas y seguras con potencial de plusvalía." },
      { q: "¿Qué tipo de inversiones recomiendan?", a: "Dependiendo de los objetivos del cliente, podemos recomendar terrenos con potencial de desarrollo, propiedades para renta, macrolotes, activos comerciales o proyectos de largo plazo." },
      { q: "¿Ofrecen asesoría para desarrolladores?", a: "Sí. Asesoramos a desarrolladores en la estructuración, posicionamiento y comercialización estratégica de proyectos inmobiliarios." },
    ],
  },
  {
    tema: "Venta y representación",
    items: [
      { q: "¿Por qué debería vender mi propiedad mediante representación exclusiva?", a: "La representación exclusiva permite desarrollar una estrategia integral de comercialización, controlar la información del inmueble, proteger el valor de la propiedad, cumplir con la normatividad y leyes vigentes, colaborar con una red de profesionales serios y confiables a nivel local, nacional e internacional y, por último, poner en manos expertas la gestión y negociación para maximizar los resultados. La representación exclusiva de una propiedad, en manos expertas y confiables, es la mejor forma de lograr resultados." },
      { q: "¿Cómo determinan el precio de venta?", a: "El precio de venta de una propiedad es el factor No.1 y el más importante que determinará el éxito y logro del objetivo final. Por lo tanto, realizamos una opinión de valor soportada en un análisis comparativo de mercado, zona y ubicación, accesibilidad y conectividad, servicios e infraestructura de la zona, diseño, características de la propiedad, estado de conservación, depreciación, oferta y demanda. Esto nos permite definir y recomendar el precio de venta correcto y no un precio aspiracional. Este es el error más común que observamos en el mercado: 3 de cada 4 propietarios, al igual que brokers e intermediarios, suelen cometer el error de establecer precios de salida irreales." },
      { q: "¿Cuánto tiempo tarda en venderse una propiedad?", a: "El tiempo de venta de una propiedad depende, principalmente, del valor o precio asignado, pero existen otros factores muy importantes como las características, ubicación, conectividad, antigüedad, mantenimiento, gestión y promoción profesional, visibilidad y alcance a nivel local, nacional e internacional según sea el caso y necesidad, oferta y demanda. Tomando en cuenta todos los factores, un asesor profesional experto con licencia debe poder estimar el rango de tiempo adecuado." },
      { q: "¿Qué hacen para promocionar mi propiedad?", a: "Desarrollamos una estrategia de marketing y comunicación profesional según el tipo de propiedad, objetivo y mercado meta. La estrategia varía según las necesidades y el objetivo que se persigue, al igual que el presupuesto disponible. La campaña puede ser sencilla con impacto local o más compleja y robusta con alcance nacional e internacional, según las necesidades. Por lo general, las campañas y estrategias incluyen fotografía y video profesional de alta calidad, vuelo de dron sobre la propiedad, revisión de la propiedad para corregir o adecuar temas que pudieran afectar visualmente su atractivo, resolver temas de funcionamiento y/o mantenimiento en caso necesario, creación de memoria descriptiva completa, generación de todo el material y arte necesario, presentación de la propiedad ante colegas serios y confiables, eventos y presentaciones especiales cuando es necesario, y generación de pautas promocionales en META, Google Ads, YouTube y medios especializados. Es importante que el propietario tome en cuenta la necesidad de invertir los recursos necesarios para lograr el objetivo y el éxito. Por lo general, la inversión y los recursos se aportan por ambas partes, propietario y promotor, según sea el caso." },
      { q: "¿Qué documentos necesito para vender mi propiedad?", a: "Generalmente se requiere escritura, sucesión testamentaria en su caso, identificación oficial, acta de nacimiento, acta de matrimonio, poder notarial en su caso, comprobantes fiscales, toda la documentación relacionada con el inmueble que varía según el tipo de propiedad, y estar al corriente de todas las obligaciones correspondientes." },
    ],
  },
  {
    tema: "Proceso, legal y documentación",
    items: [
      { q: "¿Cómo sé si una propiedad tiene la documentación en regla?", a: "Todas las propiedades pasan por un riguroso filtrado y revisión en coordinación con especialistas legales para verificar la situación y certeza jurídica antes de la operación." },
      { q: "¿Me acompañan durante todo el proceso?", a: "Sí. Brindamos acompañamiento desde la evaluación inicial hasta la firma ante notario y la entrega del inmueble." },
      { q: "¿También coordinan aspectos legales y fiscales?", a: "Sí. Trabajamos con especialistas para orientar a nuestros clientes en materia legal, fiscal y contable durante toda la operación." },
      { q: "¿Cómo puedo agendar una asesoría?", a: "Puede comunicarse por teléfono, correo electrónico, WhatsApp o mediante el formulario de contacto de nuestra página web. Uno de nuestros asesores se pondrá en contacto para conocer sus necesidades." },
    ],
  },
  {
    tema: "Zonas y mercado",
    items: [
      { q: "¿Cuál es la mejor zona para vivir en Mérida?", a: "La ubicación debe responder a sus objetivos y necesidades; depende de su estilo de vida, presupuesto y prioridades. Cada zona ofrece ventajas distintas en conectividad, servicios, seguridad y plusvalía. Le ayudamos a encontrar la que mejor se adapte a sus necesidades." },
      { q: "¿Cuál es la mejor zona para invertir?", a: "No existe una única respuesta. La mejor inversión dependerá de si busca plusvalía, rentabilidad por renta o desarrollo a largo plazo. Analizamos cada caso para recomendar las mejores oportunidades." },
      { q: "¿Qué colonias son ideales para obtener ingresos por renta?", a: "Algunas zonas mantienen una demanda constante por su ubicación estratégica y cercanía a universidades, hospitales y centros corporativos. Podemos orientarle hacia las opciones con mayor potencial de rentabilidad." },
      { q: "¿Qué factores influyen en la plusvalía de una zona?", a: "La infraestructura, el desarrollo urbano, la conectividad, los servicios y la demanda del mercado son algunos de los elementos que impulsan el crecimiento del valor de una propiedad." },
      { q: "¿Conviene invertir en la costa de Yucatán?", a: "La costa ofrece oportunidades muy interesantes, aunque no todas las ubicaciones tienen el mismo potencial. Le ayudamos a identificar proyectos con fundamentos sólidos y perspectivas de crecimiento." },
    ],
  },
];


export const FAQ_EMPRESA: Faq[] = FAQ_GRUPOS.flatMap((g) => g.items);

// Set corto para la página de Contacto (el set completo vive en Empresa).
const FAQ_CONTACTO_QS = [
  "¿Cómo puedo agendar una asesoría?",
  "¿Puedo comprar siendo extranjero?",
  "¿Me ayudan a encontrar una propiedad aunque no esté publicada en su página?",
  "¿En qué zonas trabajan?",
  "¿Por qué debería vender mi propiedad mediante representación exclusiva?",
  "¿Cuál es la mejor zona para vivir en Mérida?",
];

export const FAQ_CONTACTO: Faq[] = FAQ_CONTACTO_QS.map(
  (q) => FAQ_EMPRESA.find((f) => f.q === q)!,
);


export const CONTACTO = {
  direccion: "Calle 33 x 18 y 22 No. 216, Col. Monterreal, C.P. 97133, Mérida, Yucatán, México.",
  telefono: "+52 999 969 7229",
  email: "ventas@rocherealtors.com.mx",
  horario: "Lun–Vie · 9:00–18:00",
};

export type PaginaLegal = {
  slug: string;
  titulo: string;
  resumen: string;
  /** Secciones del documento. Vacío = contenido próximamente. */
  secciones: { titulo?: string; parrafos?: string[]; lista?: string[] }[];
  proximamente?: boolean;
  /** Documento descargable (PDF). Opcional. */
  archivo?: { titulo: string; url: string; nota?: string };
};

export const LEGALES: PaginaLegal[] = [
  {
    slug: "aviso-de-privacidad",
    titulo: "Aviso de Privacidad",
    resumen:
      "De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento, con el propósito de hacer del conocimiento de sus clientes y del público en general, se emite el presente Aviso de Privacidad en los siguientes términos:",
    secciones: [
      {
        titulo: "Identidad y domicilio del responsable que recaba los datos personales",
        parrafos: [
          "Roche Realtors Yucatán, con domicilio en Calle 33 #216 por 18 y 22, Colonia Monterreal, C.P. 97113, Mérida, Yucatán, México.",
        ],
      },
      {
        titulo: "Consentimiento",
        parrafos: [
          "Roche Realtors Yucatán utiliza datos personales para brindar sus servicios con mayor calidad, por tal motivo es necesario recabar el consentimiento tácito o expreso del titular de los datos personales, lo cual no implica ninguna sujeción para el titular ni condicionante para la contratación de nuestros servicios.",
          "Así mismo, es importante que los datos recopilados sean completos y correctos; para ello, gracias a su consentimiento, consultamos otras fuentes que nos corroboren o complementen la información, a través de instituciones públicas o privadas con arreglo y respeto de los derechos de los usuarios conforme a las leyes aplicables.",
        ],
      },
      {
        titulo: "Datos personales recabados y sujetos a tratamiento",
        parrafos: [
          "La información personal que se obtiene del titular de los datos personales es respecto de:",
        ],
        lista: [
          "Nombre completo y datos de identificación.",
          "Datos laborales, patrimoniales, financieros y de estado civil.",
          "De domicilio o residencia.",
          "De fecha y lugar de nacimiento.",
          "Datos de contacto como número telefónico y correo electrónico personales.",
        ],
      },
      {
        parrafos: [
          "Dicha información la obtiene directamente del titular de los datos personales, quien la proporciona de forma voluntaria a través de los formatos disponibles en el sitio de internet www.rocherealtors.com o proporcionados directamente por representantes o asesores de venta de Roche Realtors Yucatán.",
          "Roche Realtors Yucatán puede llegar a recabar datos sensibles de los titulares relacionados con el estado de salud presente y futuro de sus clientes.",
          "Roche Realtors Yucatán no recaba datos personales sensibles a los titulares, ni ninguno relacionado con aspectos como origen racial o étnico, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas, preferencia sexual u otra información similar.",
        ],
      },
      {
        titulo: "Uso de cookies en el sitio de Internet www.rocherealtors.com",
        parrafos: [
          "Las cookies utilizadas en el dominio o página www.rocherealtors.com almacenan información sobre los comportamientos de uso que el titular haga al utilizar dicho sitio de Internet; este proceso es necesario para mejorar la experiencia de uso y navegación del sitio de internet, puesto que permite personalizar el contenido y los anuncios, ofrecer algunas funciones de redes sociales y analizar el tráfico de datos de la Internet.",
          "Dicha información puede ser compartida con nuestros proveedores de redes sociales, de publicidad y de análisis web. No obstante, si así lo desea, el usuario o titular puede modificar la configuración de su ordenador para eliminar las cookies almacenadas.",
        ],
      },
      {
        titulo: "Finalidad del tratamiento de datos",
        parrafos: [
          "Los datos recabados tienen como finalidad mantener contacto con los titulares y dar continuidad a la consecución de los servicios que presta Roche Realtors Yucatán y que los titulares hayan contratado o pretendan contratar; así también, para confirmar la identidad de los titulares y veracidad de los datos proporcionados en los términos de las leyes aplicables.",
          "Así mismo, Roche Realtors Yucatán utilizará los datos recabados para hacer publicidad, comercialización y promoción de sus productos y servicios.",
          "Roche Realtors Yucatán y los terceros que intervengan en cualquier fase del tratamiento de datos personales guardarán confidencialidad respecto de éstos, obligación que subsistirá aún después de finalizar sus relaciones con el titular o, en su caso, con el responsable.",
        ],
      },
      {
        titulo: "Opciones y medios para limitar el uso o divulgación de los datos",
        parrafos: [
          "Los datos personales del titular serán mantenidos en estricta confidencialidad, de acuerdo con las medidas de seguridad administrativas, técnicas y físicas que al efecto Roche Realtors Yucatán implemente en sus políticas y procedimientos, que permitan proteger los datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.",
          "Las vulneraciones de seguridad ocurridas en cualquier fase del tratamiento que afecten de forma significativa los derechos patrimoniales o morales de los titulares serán informadas de forma inmediata al titular en los medios de contacto proporcionados, a fin de que este último pueda tomar las medidas correspondientes a la defensa de sus derechos.",
        ],
      },
      {
        titulo:
          "Medios para ejercer los derechos de acceso, rectificación, cancelación u oposición (ARCO)",
        parrafos: [
          "El titular o su representante legal podrán solicitar al responsable en el momento que lo desee el acceso, rectificación, cancelación u oposición respecto de los datos personales que le conciernen. Esta solicitud deberá contener al menos los siguientes datos:",
        ],
        lista: [
          "Nombre del titular y domicilio u otro medio para notificar la respuesta a su solicitud.",
          "Documentos que acrediten la identidad o, en su caso, la representación legal del titular.",
          "Descripción clara y precisa de los datos personales respecto de los que se busca ejercer alguno de los derechos antes mencionados, y cualquier otro elemento o documento que ayude a la localización de los datos personales.",
        ],
      },
      {
        parrafos: [
          "Roche Realtors Yucatán pondrá a disposición de los titulares la ayuda necesaria para que puedan ejercer sus derechos ARCO si así lo solicitan; para ello sírvase enviar un correo a ventas@rocherealtors.com.mx.",
        ],
      },
      {
        titulo: "Transferencias de datos",
        parrafos: [
          "Roche Realtors Yucatán comparte los datos con terceros que le prestan servicios o proveedores, o con socios comerciales con quienes se tengan celebrados contratos para la comercialización de productos y/o servicios, en beneficio de los clientes.",
          "El tratamiento de los datos se hará conforme a lo convenido en el aviso de privacidad y el titular, al proporcionar sus datos a Roche Realtors Yucatán, acepta la transferencia a terceros; de igual manera, el tercero receptor asumirá las obligaciones de confidencialidad de los datos y el manejo de los mismos solo para el fin expresamente conferido por Roche Realtors Yucatán.",
        ],
      },
      {
        titulo:
          "Procedimiento y medio por el cual se comunicará a los titulares de cambios al aviso de privacidad",
        parrafos: [
          "En caso de realizarse cambios a este aviso de privacidad, Roche Realtors Yucatán notificará a los titulares de datos personales dichos cambios por vía Internet, a través de la dirección de correo electrónico que fue proporcionada por el titular.",
          "Si el titular considera que sus datos personales han sufrido algún tipo de vulneración, puede contactar a nuestros agentes encargados en Protección de Datos Personales, enviando un correo electrónico a ventas@rocherealtors.com.mx.",
        ],
      },
    ],
  },
  {
    slug: "licencia-inmobiliaria",
    titulo: "Licencia Inmobiliaria",
    resumen: "Información sobre nuestra licencia inmobiliaria estatal.",
    secciones: [],
    proximamente: true,
  },
  {
    slug: "contrato-de-adhesion-profeco",
    titulo: "Modelo de Contrato de Adhesión registrado ante PROFECO",
    resumen:
      "Roche Realtors Yucatán opera bajo el modelo de Contrato de Adhesión tipo “Intermediación para la Compraventa de Inmueble” aprobado e inscrito en el Registro Público de Contratos de Adhesión de la Procuraduría Federal del Consumidor (PROFECO) el 13 de agosto de 2025, bajo el número 3834-2025, en cumplimiento de la Ley Federal de Protección al Consumidor y de la NOM-247-SE-2021.",
    secciones: [],
    archivo: {
      titulo: "Modelo de Contrato de Adhesión · Registro PROFECO 3834-2025",
      url: "",
      nota:
        "Documento formal de 18 páginas. Puede consultarlo en línea o descargarlo en formato PDF.",
    },
  },
  {
    slug: "politicas-de-no-discriminacion",
    titulo: "Política de No Discriminación",
    resumen:
      "En Roche Realtors consideramos que la confianza es el fundamento de toda relación inmobiliaria. Nuestro compromiso es brindar una asesoría profesional, transparente y respetuosa, garantizando que cada persona reciba un trato digno, equitativo e imparcial.",
    secciones: [
      {
        parrafos: [
          "Rechazamos cualquier forma de discriminación y no establecemos preferencias, restricciones o condiciones de atención basadas en origen étnico o nacional, género, edad, discapacidad, condición social o económica, estado civil, religión, opiniones, orientación sexual, identidad o expresión de género, condición de salud o cualquier otra característica personal, salvo las distinciones expresamente justificadas por la legislación aplicable.",
          "Nuestro servicio se rige por principios de ética, respeto, igualdad, transparencia y profesionalismo. Cada cliente tiene derecho a recibir información clara y veraz sobre los inmuebles y servicios que ofrecemos, así como asesoría acorde con sus necesidades y objetivos, sin prácticas discriminatorias o condiciones injustificadas.",
          "Asimismo, promovemos estos principios en nuestras relaciones con propietarios, compradores, inversionistas, arrendatarios, asesores, colaboradores y proveedores, procurando mantener un entorno profesional basado en el respeto y la igualdad de oportunidades.",
        ],
      },
      {
        titulo: "Atención de inquietudes y quejas",
        parrafos: [
          "Cualquier persona que considere que ha recibido un trato contrario a esta política podrá comunicarlo a través de nuestros canales oficiales:",
        ],
        lista: [
          "Correo electrónico: ventas@rocherealtors.com.mx",
          "Teléfono: +52 999 969 7229",
          "Sitio web: www.rocherealtors.com",
        ],
      },
      {
        parrafos: [
          "Toda inquietud será atendida con seriedad, respeto y confidencialidad, procurando realizar la revisión correspondiente y, cuando proceda, implementar las medidas necesarias.",
          "En Roche Realtors entendemos que nuestra labor va más allá de facilitar una transacción: acompañamos decisiones que impactan la vida y el patrimonio de nuestros clientes. Por ello, nuestro compromiso es ofrecer un servicio profesional, ético y respetuoso, basado en la igualdad, la dignidad y la confianza.",
        ],
      },
    ],
  },
  {
    slug: "carta-de-derechos-del-cliente",
    titulo: "Carta de Derechos del Cliente",
    resumen: "Los consumidores cuentan con los siguientes derechos:",
    secciones: [
      {
        lista: [
          "Recibir, respecto de los bienes inmuebles ofertados, información y publicidad veraz, clara y actualizada, sin importar el medio por el que se comunique, incluyendo los medios digitales, de forma tal que le permita al consumidor tomar la mejor decisión de compra conociendo de manera veraz las características del inmueble que está adquiriendo, conforme a lo dispuesto por la Ley.",
          "Conocer la información sobre las características del inmueble, entre éstas: la extensión del terreno, superficie construida, tipo de estructura, instalaciones, acabados, accesorios, lugar de estacionamiento, áreas de uso común, servicios con que cuenta y estado general físico del inmueble.",
          "Elegir libremente el inmueble que mejor satisfaga sus necesidades y se ajuste a su capacidad de compra.",
          "No realizar pago alguno hasta que conste por escrito la relación contractual, exceptuando los referentes a anticipos y gastos operativos, en los términos previstos por la LFPC.",
          "Firmar un contrato de adhesión bajo el modelo inscrito en la Procuraduría Federal del Consumidor, en el que consten los términos y condiciones de la compraventa del bien inmueble. Posterior a su firma, el proveedor tiene la obligación de entregar una copia del contrato firmado al consumidor.",
          "Adquirir un inmueble que cuente con las características de seguridad y calidad que estén contenidas en la normatividad aplicable y plasmadas en la información y publicidad que haya recibido.",
          "Recibir el bien inmueble en el plazo y condiciones acordados con el proveedor en el contrato de adhesión respectivo.",
          "En su caso, ejercer las garantías sobre bienes inmuebles previstas en la LFPC, considerando las especificaciones previstas en el contrato de adhesión respectivo.",
          "Recibir la bonificación o compensación correspondiente en términos de la LFPC, en caso de que una vez ejercida la garantía persistan defectos o fallas en el inmueble. Asimismo, a que se realicen las reparaciones necesarias en caso de defectos o fallas imputables al proveedor, u optar por la sustitución del inmueble o rescisión del contrato cuando proceda.",
          "Contar con canales y mecanismos de atención gratuitos y accesibles para consultas, solicitudes, reclamaciones y sugerencias al proveedor, y conocer el domicilio señalado por el proveedor para oír y recibir notificaciones.",
          "Derecho a la protección por parte de las autoridades competentes y conforme a las leyes aplicables, incluyendo el derecho a presentar denuncias y reclamaciones ante las mismas.",
          "Tener a su disposición un Aviso de Privacidad para conocer el tratamiento que se dará a los datos personales que proporcione y consentirlo, en su caso; que sus datos personales sean tratados conforme a la normatividad aplicable y conocer los mecanismos disponibles para realizar el ejercicio de sus Derechos de Acceso, Rectificación, Cancelación y Oposición.",
          "Recibir un trato libre de discriminación, sin que se le pueda negar o condicionar la atención o venta de una vivienda por razones de género, nacionalidad, étnicas, preferencia sexual, religiosas o cualquiera otra particularidad en los términos de la legislación aplicable.",
          "Elegir libremente al notario público para realizar el trámite de escrituración.",
        ],
      },
    ],
  },
  {
    slug: "canales-de-atencion",
    titulo: "Canales de Atención de Solicitudes, Quejas y Reclamaciones",
    resumen:
      "Roche Realtors Yucatán pone a disposición de sus clientes los siguientes canales para la recepción y atención de solicitudes, quejas o reclamaciones relacionadas con los servicios y la atención brindada:",
    secciones: [
      {
        titulo: "Datos de contacto",
        lista: [
          "Horario de atención: lunes a viernes, de 9:00 a.m. a 6:00 p.m.",
          "Domicilio: Calle 23 No. 216, entre 18 y 22, Col. Monterreal, C.P. 97130, Mérida, Yucatán, México.",
          "Teléfono: +52 999 969 7229",
          "Correo electrónico: ventas@rocherealtors.com.mx",
        ],
      },
      {
        parrafos: [
          "Los datos personales recabados serán tratados con la finalidad de mantener contacto con los titulares y dar seguimiento a las solicitudes, quejas o reclamaciones recibidas, así como a los servicios proporcionados por Roche Realtors Yucatán.",
        ],
      },
    ],
  },
];


export const REDES = ["Instagram", "Facebook", "LinkedIn", "YouTube"];

export const DESARROLLOS_INTRO =
  "Desarrollos inmobiliarios en Mérida y Yucatán, seleccionados por su diseño, calidad constructiva, seguridad, ubicación y proyección de plusvalía.";


export const FIRMA =
  "Roger Roche M. — Director Fundador, Roche Realtors Yucatán y Termómetro Inmobiliario.";

export type Bloque = { h?: string; p?: string; list?: string[] };

export type Articulo = {
  slug: string;
  categoria: string;
  titulo: string;
  entradilla: string;
  imagen?: string;
  bloques: Bloque[];
  referencias?: string[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "primeras-licencias-inmobiliarias-yucatan",
    imagen: artNoticias1,
    categoria: "Noticias",
    titulo:
      "Yucatán emite las primeras licencias inmobiliarias, un paso decisivo hacia un mercado más seguro y profesional",
    entradilla:
      "La profesionalización del sector inmobiliario entra en una nueva etapa con la emisión de las primeras 130 Licencias Inmobiliarias.",
    bloques: [
      { h: "La profesionalización del sector inmobiliario entra en una nueva etapa", p: "El mercado inmobiliario de Yucatán continúa avanzando hacia un modelo basado en la preparación, profesionalización y certeza jurídica. El pasado 6 de julio de 2026, el Gobierno del Estado, a través del Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY), anunció la emisión de las primeras 130 Licencias Inmobiliarias otorgadas a asesoras y asesores que cumplieron con los requisitos establecidos por la Ley que Regula la Prestación de Servicios Inmobiliarios del Estado de Yucatán." },
      { p: "Este hecho marca un momento importante para el sector, ya que representa el inicio de la implementación práctica de una regulación diseñada para brindar mayor seguridad a quienes compran, venden o invierten en bienes inmuebles en el estado y así combatir la informalidad que tanto daño ha causado." },
      { h: "Un registro que sigue creciendo", p: "De acuerdo con el comunicado oficial, el Registro Estatal de Asesores Inmobiliarios ya cuenta con 1,272 personas inscritas, reflejando el interés del sector por cumplir con el nuevo marco regulatorio. Asimismo:" },
      { list: [
        "638 asesores habían concluido las primeras 10 horas de capacitación impartidas por el INSEJUPY.",
        "130 profesionales recibieron las primeras licencias oficiales para ejercer la intermediación inmobiliaria conforme a la legislación vigente.",
      ] },
      { p: "Estas cifras muestran que la implementación de la Ley Inmobiliaria avanza de forma gradual y con una participación importante de los profesionales del sector." },
    ],
  },
  {
    slug: "impacto-nueva-ley-inmobiliaria-yucatan-2026",
    imagen: artNoticias2,
    categoria: "Noticias",
    titulo: "El impacto de la nueva Ley Inmobiliaria en Yucatán 2026",
    entradilla:
      "Mayor protección para compradores e inversionistas y un mercado más competitivo y confiable.",
    bloques: [
      { h: "Mayor protección para compradores e inversionistas", p: "Uno de los principales objetivos de esta política pública es reducir los riesgos asociados a operaciones inmobiliarias realizadas por personas sin preparación o sin reconocimiento oficial. Durante la presentación del programa, la directora general del INSEJUPY, Dalia Isela Piña Alberto, destacó que la emisión de estas licencias busca fortalecer la protección del patrimonio de las familias y contribuir a la prevención de fraudes inmobiliarios." },
      { p: "La legislación vigente también establece que las personas que realicen actividades de intermediación inmobiliaria deben contar con la licencia expedida por el Instituto, y que los notarios públicos deben verificar la participación de asesores licenciados en las operaciones donde exista intermediación. Estas disposiciones fortalecen la transparencia y generan mayor confianza para quienes participan en la compraventa de bienes inmuebles." },
      { h: "Un mercado más competitivo y confiable", p: "La consolidación del Registro Estatal y la emisión de las primeras licencias representan un avance significativo para el mercado inmobiliario yucateco. En un estado que continúa atrayendo inversión nacional e internacional, contar con un sector inmobiliario profesional y regulado contribuye a:" },
      { list: [
        "Incrementar la confianza de inversionistas.",
        "Reducir riesgos durante las operaciones.",
        "Profesionalizar la intermediación inmobiliaria.",
        "Elevar la calidad de los servicios ofrecidos.",
        "Fortalecer la competitividad del mercado estatal.",
      ] },
      { p: "Más allá del cumplimiento normativo, este nuevo esquema favorece un entorno donde compradores, vendedores, desarrolladores y asesores participan bajo reglas más claras y con mayores mecanismos de supervisión." },
      { h: "¿Qué significa esto para quienes desean invertir en Yucatán?", p: "Para un inversionista, adquirir un inmueble implica tomar decisiones patrimoniales de largo plazo. Contar con un asesor que opere conforme al marco legal vigente puede aportar un nivel adicional de confianza durante todo el proceso." },
      { p: "Si bien la Licencia Inmobiliaria no sustituye la debida diligencia que debe realizar cualquier comprador, sí constituye un indicador de que el profesional ha cumplido con los requisitos establecidos por la autoridad estatal y participa en un esquema de capacitación y supervisión. Este nuevo modelo fortalece la imagen de Yucatán como un mercado inmobiliario cada vez más ordenado, transparente y preparado para atender a inversionistas nacionales e internacionales." },
    ],
    referencias: [
      "Gobierno del Estado de Yucatán",
      "Ley que Regula la Prestación de Servicios Inmobiliarios del Estado de Yucatán",
      "Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY)",
    ],
  },
  {
    slug: "yucatan-se-transforma-infraestructura-estrategica",
    imagen: artNoticias3,
    categoria: "Noticias",
    titulo:
      "Yucatán se transforma: infraestructura estratégica que impulsa una nueva etapa de desarrollo",
    entradilla:
      "Puerto de Altura, Tren Maya de carga y corredores industriales consolidan al estado como polo de inversión.",
    bloques: [
      { p: "El estado de Yucatán atraviesa una etapa de transformación impulsada por proyectos de infraestructura estratégica orientados a fortalecer su conectividad, capacidad logística y desarrollo productivo. Las iniciativas actualmente proyectadas y en desarrollo consolidan al estado como uno de los polos más relevantes del sureste mexicano para la inversión y el crecimiento económico." },
      { h: "Puerto de Altura de Progreso: expansión con visión internacional", p: "Uno de los proyectos más relevantes es la expansión del canal de navegación del Puerto de Progreso, infraestructura clave para fortalecer la capacidad logística y comercial del estado. Este proyecto busca consolidar al puerto como un punto estratégico para el movimiento de carga y la conectividad marítima de la región. La modernización del puerto representa una oportunidad para incrementar la competitividad de Yucatán y facilitar nuevas dinámicas comerciales, industriales y logísticas, alineadas con el crecimiento económico del sureste del país." },
      { h: "Conexión del Tren Maya de carga a Progreso", p: "Otro de los proyectos estratégicos es la conexión del Tren Maya de carga con Progreso, enfocada en fortalecer el movimiento de mercancías y mejorar la integración logística del estado. Esta conexión representa un paso importante para optimizar la movilidad de carga dentro de la región y ampliar las capacidades de distribución y conectividad terrestre, integrando infraestructura ferroviaria y portuaria en un mismo ecosistema logístico." },
      { h: "Corredores industriales para fortalecer la productividad", p: "La estrategia de transformación también contempla el desarrollo de corredores industriales orientados a impulsar las fortalezas productivas de Yucatán. Estos corredores representan una plataforma para detonar nuevas inversiones, fomentar la especialización productiva y generar condiciones favorables para el crecimiento industrial y empresarial en distintas regiones del estado." },
      { h: "Infraestructura como motor de crecimiento", p: "La localización estratégica de los proyectos de infraestructura refleja una visión integral de desarrollo para el estado. La combinación entre expansión portuaria, conectividad ferroviaria y corredores industriales posiciona a Yucatán como una entidad con alto potencial para fortalecer su competitividad regional y atraer nuevas oportunidades de inversión." },
      { p: "En un entorno donde la infraestructura se ha convertido en uno de los principales factores de desarrollo económico, Yucatán avanza hacia una nueva etapa de crecimiento respaldada por proyectos que buscan consolidar su papel como punto estratégico de conexión, logística y productividad en el sureste de México." },
    ],
    referencias: ["Secretaría de Fomento Económico y Trabajo (SEFOET)"],
  },
  {
    slug: "segunda-etapa-ampliacion-puerto-de-altura",
    imagen: artNoticias4,
    categoria: "Noticias",
    titulo:
      "Concluye la primera e inicia la segunda etapa de ampliación del Puerto de Altura",
    entradilla:
      "El dragado del canal de navegación avanza con una inversión privada cercana a los 948 millones de pesos.",
    bloques: [
      { p: "La ampliación del Puerto de Altura de Progreso continúa avanzando y marca un nuevo capítulo para el desarrollo económico de Yucatán. El Gobierno del Estado anunció la conclusión de la primera etapa del dragado del canal de navegación y el inicio de la segunda fase del proyecto, una obra estratégica que busca fortalecer la capacidad logística del estado y consolidarlo como uno de los principales centros portuarios del sureste mexicano." },
      { p: "La primera etapa contempló trabajos de dragado para aumentar la profundidad y mejorar las condiciones de operación del puerto, permitiendo el ingreso de embarcaciones de mayor calado y capacidad. Con ello, Progreso incrementa su competitividad para el manejo de carga, la actividad industrial y el comercio internacional." },
      { p: "La segunda etapa incorpora una inversión privada cercana a los $948 millones de pesos, destinada a continuar la modernización de la infraestructura portuaria y ampliar su capacidad operativa. Esta fase permitirá responder al crecimiento del comercio marítimo y atraer nuevas inversiones nacionales e internacionales." },
      { h: "¿Qué representa para Yucatán?", p: "La modernización del Puerto de Altura forma parte de una estrategia integral para fortalecer la infraestructura logística del estado. Su desarrollo complementa otros proyectos de gran escala, como el Tren Maya en su modalidad de carga, los Polos de Desarrollo para el Bienestar y nuevas inversiones industriales, creando mejores condiciones para la instalación de empresas y el crecimiento del comercio exterior." },
      { h: "Impacto en el mercado inmobiliario", p: "Las grandes inversiones en infraestructura suelen convertirse en un factor que impulsa la demanda de suelo industrial, comercial y habitacional. Municipios como Progreso y su zona de influencia, así como el corredor entre Mérida y la costa, podrían registrar un mayor dinamismo conforme avance la consolidación del puerto." },
      { p: "Para inversionistas inmobiliarios, este tipo de proyectos representa un indicador relevante del potencial de crecimiento económico de la región. Si bien la plusvalía depende de diversos factores, la mejora en la conectividad y la capacidad logística fortalece el atractivo de Yucatán como destino para nuevas inversiones productivas." },
      { p: "La ampliación del Puerto de Altura de Progreso confirma una tendencia que se ha venido consolidando en los últimos años: Yucatán continúa desarrollando infraestructura estratégica para integrarse con mayor fuerza a las cadenas de comercio nacional e internacional, generando un entorno favorable para el crecimiento económico y el desarrollo inmobiliario de largo plazo." },
    ],
    referencias: ["Secretaría de Fomento Económico y Trabajo (SEFOET)"],
  },
  {
    slug: "evolucion-ley-inmobiliaria-yucatan",
    imagen: artLey1,
    categoria: "Ley y normatividad",
    titulo:
      "La evolución de la Ley Inmobiliaria en Yucatán: cómo la regulación fortaleció la confianza del mercado",
    entradilla:
      "De la NOM-247 a las primeras Licencias Inmobiliarias estatales: el camino hacia un mercado más seguro.",
    bloques: [
      { p: "En los últimos años, Yucatán se ha consolidado como uno de los destinos más atractivos para la inversión inmobiliaria en México. La seguridad, el crecimiento económico, la infraestructura y la calidad de vida han impulsado la llegada de inversionistas nacionales y extranjeros, así como el desarrollo de nuevos proyectos habitacionales, comerciales y turísticos." },
      { p: "Este crecimiento también evidenció la necesidad de establecer reglas claras para proteger a compradores, vendedores e inversionistas, así como profesionalizar la actividad de quienes participan en la intermediación inmobiliaria. La regulación actual es el resultado de un proceso que comenzó a nivel nacional y que posteriormente fue fortalecido por el Estado de Yucatán." },
      { h: "La NOM-247 marca el inicio de una nueva etapa", p: "El primer gran paso hacia la profesionalización del sector fue la entrada en vigor de la NOM-247-SE-2021, emitida por la Secretaría de Economía y vigente desde septiembre de 2022. Esta Norma Oficial Mexicana estableció requisitos para la comercialización de inmuebles destinados a casa habitación, con el objetivo de brindar mayor transparencia y protección a los consumidores. Entre sus principales disposiciones destacan:" },
      { list: [
        "Información clara y verificable en la publicidad inmobiliaria.",
        "Reglas sobre la información que debe proporcionarse al comprador.",
        "Requisitos mínimos para los contratos de adhesión.",
        "Obligaciones para desarrolladores, comercializadores y demás proveedores que participan en la venta de vivienda.",
      ] },
      { p: "Aunque la NOM-247 tiene un alcance federal y se enfoca principalmente en la comercialización de vivienda nueva, sentó las bases para una mayor profesionalización del sector inmobiliario en todo el país." },
      { h: "Yucatán publica su Ley Inmobiliaria", p: "Como parte de este proceso de fortalecimiento institucional, el 12 de enero de 2024 se publicó en el Diario Oficial del Estado la Ley que Regula la Prestación de Servicios Inmobiliarios del Estado de Yucatán, entrando en vigor al día siguiente. A diferencia de la NOM-247, esta Ley regula específicamente la actividad de las personas físicas y morales que prestan servicios de intermediación inmobiliaria dentro del estado. Su objetivo es:" },
      { list: [
        "Profesionalizar el ejercicio de la actividad inmobiliaria.",
        "Brindar mayor certeza jurídica a las operaciones.",
        "Proteger el patrimonio de compradores y vendedores.",
        "Combatir el ejercicio informal de la profesión.",
        "Fortalecer la confianza en el mercado inmobiliario de Yucatán.",
      ] },
      { h: "Se fortalece el marco regulatorio", p: "Tras la publicación de la Ley, el Congreso del Estado aprobó diversas reformas para facilitar su implementación y fortalecer las atribuciones de las autoridades responsables. Entre los principales avances destacan:" },
      { list: [
        "La consolidación del Registro Estatal de Prestadores de Servicios Inmobiliarios.",
        "La definición del procedimiento para la expedición y renovación de la Licencia Inmobiliaria Estatal.",
        "El fortalecimiento de las atribuciones del Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY) como autoridad encargada de administrar el registro y emitir las licencias.",
      ] },
      { p: "Estas adecuaciones permitieron pasar de un marco legal a un sistema operativo capaz de supervisar y profesionalizar la actividad inmobiliaria." },
      { h: "Inicia la emisión de las Licencias Inmobiliarias", p: "En julio de 2026, el Gobierno del Estado anunció la entrega de las primeras 130 Licencias Inmobiliarias, marcando el inicio formal de la aplicación del nuevo modelo regulatorio. La Licencia Inmobiliaria acredita que un asesor o empresa ha cumplido con los requisitos establecidos por la legislación estatal, incluyendo procesos de capacitación y registro ante la autoridad competente." },
      { h: "¿Qué significa esta evolución para los inversionistas?", p: "La regulación inmobiliaria en Yucatán ha evolucionado de manera progresiva para ofrecer un entorno de mayor seguridad y confianza. Hoy, quienes desean comprar, vender o invertir en bienes inmuebles cuentan con un marco legal que promueve:" },
      { list: [
        "Mayor transparencia en las operaciones.",
        "Profesionales sujetos a requisitos de capacitación y registro.",
        "Mecanismos para verificar a los asesores inmobiliarios.",
        "Mayor protección para el patrimonio de los consumidores.",
      ] },
      { p: "Si bien ninguna legislación elimina por completo los riesgos inherentes a una operación inmobiliaria, este marco regulatorio fortalece la certeza jurídica y contribuye a elevar los estándares de calidad del sector." },
    ],
    referencias: [
      "Ley que Regula la Prestación de Servicios Inmobiliarios del Estado de Yucatán.",
      "Diario Oficial del Gobierno del Estado de Yucatán.",
      "Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY).",
    ],
  },
  {
    slug: "nom-247-se-2021",
    imagen: artLey2,
    categoria: "Ley y normatividad",
    titulo: "NOM-247-SE-2021: la norma que transformó la comercialización de vivienda en México",
    entradilla:
      "Qué regula, a quién aplica y qué beneficios ofrece al consumidor la Norma Oficial Mexicana vigente desde 2022.",
    bloques: [
      { p: "La NOM-247-SE-2021 es una Norma Oficial Mexicana emitida por la Secretaría de Economía que establece las prácticas comerciales que deben cumplir quienes comercializan inmuebles destinados a casa habitación en México. Entró en vigor el 19 de septiembre de 2022 con el propósito de brindar mayor protección a los consumidores y promover operaciones inmobiliarias más transparentes y seguras." },
      { h: "¿Por qué se creó?", p: "Antes de su entrada en vigor, la información proporcionada a los compradores variaba considerablemente entre desarrolladores y comercializadores, lo que podía generar confusión o incertidumbre durante el proceso de compra. La NOM-247 busca establecer criterios uniformes para que los consumidores reciban información clara, suficiente y verificable antes de adquirir una vivienda. Sus principales objetivos son:" },
      { list: [
        "Proteger los derechos del consumidor.",
        "Transparentar la comercialización de vivienda.",
        "Establecer estándares mínimos de información.",
        "Fortalecer la confianza en el mercado inmobiliario.",
      ] },
      { h: "¿A quién aplica?", p: "La Norma aplica a proveedores que comercializan bienes inmuebles destinados a casa habitación, entre ellos:" },
      { list: [
        "Desarrolladores inmobiliarios.",
        "Constructores.",
        "Promotores de vivienda.",
        "Empresas comercializadoras.",
        "Personas físicas o morales que participan como proveedores en la venta de vivienda nueva.",
      ] },
      { p: "Es importante señalar que no regula todas las operaciones inmobiliarias, como la compraventa de inmuebles usados entre particulares, salvo que intervenga un proveedor en los términos establecidos por la propia Norma." },
      { h: "Obligaciones para desarrolladores e inmobiliarias", p: "La NOM-247 establece diversas obligaciones para los proveedores que participan en la comercialización de vivienda, entre ellas:" },
      { list: [
        "Proporcionar información clara y verificable sobre el inmueble.",
        "Informar las características, precio, condiciones de venta y forma de pago.",
        "Contar con procedimientos de atención para los consumidores.",
        "Cumplir con las garantías y obligaciones previstas en la legislación aplicable.",
      ] },
      { p: "El objetivo es que el comprador pueda tomar una decisión informada antes de realizar una inversión patrimonial." },
      { h: "Contratos de adhesión", p: "La Norma establece que, cuando corresponda, los contratos utilizados para la comercialización de vivienda deben cumplir con los requisitos establecidos por la legislación de protección al consumidor y, en muchos casos, estar registrados ante la PROFECO. Esto brinda mayor claridad sobre los derechos y obligaciones de ambas partes durante la operación." },
      { h: "Publicidad inmobiliaria", p: "La publicidad también está regulada por la NOM-247. Toda promoción comercial debe ser veraz, comprobable y no inducir a error respecto de las características, precio, disponibilidad o condiciones de venta del inmueble. La información difundida en anuncios, folletos, páginas web o redes sociales debe ser consistente con la que posteriormente se proporciona al comprador." },
      { h: "Beneficios para el consumidor", p: "La implementación de la NOM-247 ha contribuido a fortalecer la confianza en el mercado inmobiliario mediante:" },
      { list: [
        "Mayor transparencia en la información.",
        "Mejor protección de los derechos del comprador.",
        "Mayor claridad durante el proceso de adquisición.",
        "Estándares más altos para la comercialización de vivienda.",
        "Mayor certeza jurídica en las operaciones.",
      ] },
      { p: "Para quienes desean adquirir una vivienda, representa una herramienta que favorece decisiones mejor informadas y reduce riesgos derivados de información incompleta o poco clara." },
    ],
    referencias: [
      "Diario Oficial de la Federación. NOM-247-SE-2021.",
      "Secretaría de Economía.",
      "Procuraduría Federal del Consumidor (PROFECO).",
    ],
  },
  {
    slug: "licencia-inmobiliaria-yucatan",
    imagen: artLey3,
    categoria: "Ley y normatividad",
    titulo: "Licencia Inmobiliaria en Yucatán: por qué fortalece la confianza en el mercado",
    entradilla:
      "Fundamento legal, requisitos, verificación y beneficios de la licencia expedida por el INSEJUPY.",
    bloques: [
      { p: "La Licencia Inmobiliaria del Estado de Yucatán es la autorización oficial que acredita que una persona física o moral cumple con los requisitos establecidos por la legislación estatal para prestar servicios de intermediación inmobiliaria. Su implementación forma parte del proceso de profesionalización del sector y busca ofrecer mayor certeza jurídica a quienes compran, venden o invierten en bienes inmuebles en el estado. La licencia es expedida por el Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY), autoridad encargada de administrar el Registro Estatal de Prestadores de Servicios Inmobiliarios." },
      { h: "Fundamento legal", p: "La Licencia Inmobiliaria tiene su fundamento en la Ley que Regula la Prestación de Servicios Inmobiliarios del Estado de Yucatán, publicada en el Diario Oficial del Estado el 12 de enero de 2024. Esta legislación establece las bases para regular la actividad inmobiliaria en la entidad, definiendo los requisitos, derechos y obligaciones de quienes prestan servicios de intermediación, así como las atribuciones del INSEJUPY para emitir las licencias y administrar el registro correspondiente." },
      { h: "¿Quiénes deben obtenerla?", p: "La licencia debe ser obtenida por las personas que realizan profesionalmente actividades de intermediación inmobiliaria en el Estado de Yucatán, entre ellas:" },
      { list: [
        "Asesores inmobiliarios independientes.",
        "Agentes inmobiliarios.",
        "Personas físicas o morales que ofrecen servicios de promoción, comercialización, compraventa, arrendamiento o intermediación de bienes inmuebles.",
      ] },
      { p: "Su finalidad es que quienes ofrecen estos servicios lo hagan bajo un marco regulatorio que garantice mayor profesionalismo y transparencia." },
      { h: "Requisitos generales", p: "Para obtener la Licencia Inmobiliaria es necesario cumplir con los requisitos establecidos por la Ley y las disposiciones emitidas por el INSEJUPY. De manera general, el solicitante debe:" },
      { list: [
        "Presentar la documentación requerida por la autoridad.",
        "Acreditar la capacitación obligatoria en materia inmobiliaria.",
        "Inscribirse en el Registro Estatal de Prestadores de Servicios Inmobiliarios.",
        "Cumplir con los requisitos administrativos previstos por la legislación vigente.",
      ] },
      { p: "Estos requisitos buscan asegurar que los profesionales inmobiliarios cuenten con conocimientos mínimos sobre el marco jurídico, la ética profesional y las mejores prácticas del sector." },
      { h: "El Registro Estatal de Prestadores de Servicios Inmobiliarios", p: "La licencia está vinculada al Registro Estatal de Prestadores de Servicios Inmobiliarios, un padrón oficial administrado por el INSEJUPY. Este registro concentra la información de los asesores y empresas que cumplen con los requisitos legales para ejercer la actividad inmobiliaria en Yucatán. Su objetivo es brindar transparencia al mercado y facilitar que los ciudadanos puedan identificar a profesionales debidamente registrados." },
      { h: "¿Cómo verificar que un asesor cuenta con Licencia Inmobiliaria?", p: "Antes de iniciar una operación inmobiliaria, es recomendable verificar que el profesional con quien se realizará la negociación cuente con la autorización correspondiente. Para ello, el consumidor puede:" },
      { list: [
        "Solicitar el número de Licencia Inmobiliaria del asesor.",
        "Verificar que se encuentre inscrito en el Registro Estatal administrado por el INSEJUPY.",
        "Confirmar la vigencia de su registro cuando la autoridad habilite los mecanismos de consulta pública.",
      ] },
      { p: "Esta verificación representa una medida adicional de seguridad al momento de realizar una inversión patrimonial." },
      { h: "Beneficios para compradores y vendedores", p: "La Licencia Inmobiliaria ofrece ventajas tanto para los profesionales del sector como para quienes contratan sus servicios. Entre sus principales beneficios destacan:" },
      { list: [
        "Mayor confianza en las operaciones inmobiliarias.",
        "Asesoría respaldada por un marco legal estatal.",
        "Profesionales sujetos a requisitos de capacitación y registro.",
        "Mayor transparencia durante el proceso de compraventa.",
        "Contribución a la prevención de malas prácticas y fraudes.",
        "Fortalecimiento de la seguridad jurídica para compradores, vendedores e inversionistas.",
      ] },
    ],
    referencias: [
      "Diario Oficial del Gobierno del Estado de Yucatán.",
      "Instituto de Seguridad Jurídica Patrimonial de Yucatán (INSEJUPY).",
    ],
  },
];

export const CATEGORIAS_RECURSOS = [
  "Todos",
  "Noticias",
  "Ley y normatividad",
  "Termómetro Inmobiliario",
  "Estilo de vida",
];

export type VideoTermometro = {
  id: string;
  titulo: string;
  url: string;
  duracion: string;
  fecha: string;
};

/** Para agregar un video nuevo: pegue la URL de YouTube; la portada se genera sola. */
export const VIDEOS_TERMOMETRO: VideoTermometro[] = [
  { id: "WqetMPdW918", titulo: "Lo que dicen los datos, no la publicidad, mercado inmobiliario premium en Yucatán 2026.", url: "https://www.youtube.com/watch?v=WqetMPdW918", duracion: "7:50", fecha: "27 jul 2026" },
  { id: "34ltCnfETaQ", titulo: "Bienvenido a Termómetro Inmobiliario, el canal de inversiones inmobiliarias en Mérida, Yucatán.", url: "https://www.youtube.com/watch?v=34ltCnfETaQ", duracion: "32:10", fecha: "30 abr 2026" },
  { id: "yM7Q6jKnFY8", titulo: "Yucatán se transforma: dónde sí y dónde no invertir en 2026 | Parte 2", url: "https://www.youtube.com/watch?v=yM7Q6jKnFY8", duracion: "26:26", fecha: "10 mar 2026" },
  { id: "Z95AXawRBF0", titulo: "✅ Dónde SÍ y dónde NO invertir en Yucatán en 2026", url: "https://www.youtube.com/watch?v=Z95AXawRBF0", duracion: "32:51", fecha: "11 feb 2026" },
  { id: "B2K4ww7Q9DI", titulo: "PARTE 2 ¿Del Boom al Colapso Inmobiliario en México? ¿Se acabó el sueño inmobiliario en México?", url: "https://www.youtube.com/watch?v=B2K4ww7Q9DI", duracion: "26:07", fecha: "11 dic 2025" },
  { id: "CFnmN2we-CE", titulo: "🔥 \"DEL BOOM AL COLAPSO INMOBILIARIO\" – ¿Se acabó el sueño inmobiliario en México?", url: "https://www.youtube.com/watch?v=CFnmN2we-CE", duracion: "34:34", fecha: "4 dic 2025" },
  { id: "1oCK2mcKiJ4", titulo: "🎯 ¡Invitado Especial! 🏠 Todo Sobre la Ley Inmobiliaria con Experto en el Tema", url: "https://www.youtube.com/watch?v=1oCK2mcKiJ4", duracion: "40:25", fecha: "13 ago 2025" },
  { id: "9AeqcNuV8KU", titulo: "PARTE 2 🔥📍 Zonas y Colonias Destacadas para Vivir e Invertir en Mérida", url: "https://www.youtube.com/watch?v=9AeqcNuV8KU", duracion: "22:01", fecha: "30 jul 2025" },
  { id: "5I-BLLO0dYk", titulo: "🔥📍 Zonas y Colonias Destacadas para Vivir e Invertir en Mérida", url: "https://www.youtube.com/watch?v=5I-BLLO0dYk", duracion: "14:53", fecha: "23 jul 2025" },
];

export const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
export const ytThumbFallback = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export type RecursoEstiloVida = {
  id: string;
  titulo: string;
  texto: string;
  url: string;
  fuente: string;
  imagen: string;
};

export const ESTILO_DE_VIDA: RecursoEstiloVida[] = [
  {
    id: "ev-1",
    titulo: "Seguridad en Yucatán",
    texto:
      "Yucatán se mantiene como uno de los estados más seguros de México. Conozca cómo trabaja la Secretaría de Seguridad Pública (SSP) para mantener este nivel de tranquilidad y qué números de emergencia debe tener siempre a la mano.",
    url: "http://www.ssp.yucatan.gob.mx/",
    fuente: "SSP Yucatán",
    imagen: ev1,
  },
  {
    id: "ev-2",
    titulo: "Pueblos Mágicos de Yucatán",
    texto:
      "Yucatán cuenta con siete Pueblos Mágicos —Izamal, Valladolid, Maní, Tekax, Sisal, Motul y Espita— reconocidos oficialmente por su valor histórico y cultural. Descubra las rutas turísticas oficiales para planear su próxima escapada de fin de semana.",
    url: "https://yucatan.travel/",
    fuente: "Yucatán Travel",
    imagen: ev2,
  },
  {
    id: "ev-3",
    titulo: "Conectividad aérea: Aeropuerto de Mérida",
    texto:
      "El Aeropuerto Internacional de Mérida conecta al estado con destinos nacionales e internacionales en Estados Unidos, Canadá, Centroamérica y el Caribe. Conozca las aerolíneas, horarios y servicios disponibles antes de su próximo viaje.",
    url: "https://www.asur.com.mx/",
    fuente: "ASUR",
    imagen: ev3,
  },
  {
    id: "ev-4",
    titulo: "Consulados en Mérida",
    texto:
      "Mérida alberga consulados de distintos países que atienden a residentes extranjeros y visitantes en la península. Si es ciudadano extranjero o tiene trámites migratorios pendientes, aquí tiene el punto de partida oficial.",
    url: "https://mx.usembassy.gov/es/visas-es/u-s-embassy-mexico-city-es/u-s-consulate-general-merida-es/",
    fuente: "Consulado de EE. UU.",
    imagen: ev4,
  },
  {
    id: "ev-5",
    titulo: "Salud y atención médica en Yucatán",
    texto:
      "Yucatán se ha consolidado como un polo de atención médica de calidad en el sureste de México. Conozca los servicios públicos de salud disponibles y cómo acceder a trámites y unidades médicas en el estado.",
    url: "https://salud.yucatan.gob.mx/",
    fuente: "Salud Yucatán",
    imagen: ev5,
  },
  {
    id: "ev-6",
    titulo: "Trámites y vida cotidiana",
    texto:
      "Desde constancias hasta trámites vehiculares y de salud, el Gobierno de Yucatán pone a su disposición una plataforma digital para hacer sus gestiones de forma rápida y segura, sin salir de casa.",
    url: "https://tramites.yucatan.gob.mx/",
    fuente: "Gobierno de Yucatán",
    imagen: ev6,
  },
];


/**
 * Sección "Zonas y Colonias" (página Propiedades).
 * `publicado: false` muestra el estado "Próximamente" sin borrar el contenido real.
 * Al cambiar a `true` (desde el panel de administración) se reactiva el mapa y la lista.
 */
export const ZONAS_SECCION = {
  publicado: false,
  proximamente: {
    titulo: "Próximamente",
    nota: "Estamos preparando el mapa interactivo de zonas y colonias.",
  },
  mapa: undefined as string | undefined,
  zonas: [
    "Norte de Mérida",
    "Temozón",
    "Cholul",
    "Conkal",
    "Chablekal",
    "Sisal",
    "Progreso",
    "Yucatán Country Club",
    "Altabrisa",
    "Montebello",
  ],
};
