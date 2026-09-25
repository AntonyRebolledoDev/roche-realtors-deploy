import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BIENVENIDA_PARRAFOS,
  BIENVENIDA_RESUMEN,
  CONTACTO,
  EMPRESA_INTRO_PARRAFOS,
  EMPRESA_INTRO_RESUMEN,
  FAQ_CONTACTO,
  FAQ_GRUPOS,
  LEGALES,
  PILARES_ROCHE,
  POR_QUE_ROCHE_PARRAFOS,
  POR_QUE_ROCHE_RESUMEN,
  SERVICIOS,
  YUCATAN_HOME_PARRAFOS,
  YUCATAN_HOME_RESUMEN,
  YUCATAN_SECCIONES,
  YUCATAN_STATS,
  ZONAS_SECCION,
  DESARROLLOS_INTRO,
} from "@/content/textos";
import {
  ABSORCION,
  CALLOUTS_MUNICIPIO,
  DEMOGRAFICOS,
  KPIS_HORIZONTAL,
  KPIS_VERTICAL,
  MERCADO_META,
  NOTA_MUNICIPIOS,
  PRECIO_HORIZONTAL,
  PRECIO_SEGMENTO,
  PRECIO_VERTICAL,
  PROYECTOS_MUNICIPIO,
} from "@/content/mercado";

// Imágenes actuales del sitio: se conservan tal cual como valor inicial.
import banner2 from "@/assets/HOM_BANNER_2.jpg";
import banner3 from "@/assets/HOM_BANNER_3.jpg";
import banner4 from "@/assets/HOM_BANNER_4.jpg";
import banner7 from "@/assets/HOM_BANNER_7.jpg";
import banner2m from "@/assets/HOM_BANNER_2_mobile.jpg";
import banner3m from "@/assets/HOM_BANNER_3_mobile.jpg";
import banner4m from "@/assets/HOM_BANNER_4_mobile.jpg";
import banner7m from "@/assets/HOM_BANNER_7_mobile.jpg";
import logoAmpi from "@/assets/LOGO_AMPI-2.png";
import logoNar from "@/assets/NATIONAL_ASSOCIA-2.png";
import logoConocer from "@/assets/CONOCER.png";
import imgBienvenida from "@/assets/bienvenida-v2.jpg";
import imgYucatanHome from "@/assets/por-que-yucatan-home-v2.png";
import heroPropiedades from "@/assets/propiedades-hero.jpg";
import catCasas from "@/assets/cat-casas.webp";
import catDeptos from "@/assets/cat-departamentos.jpg";
import catTerrenos from "@/assets/cat-terrenos.jpg";
import catHaciendas from "@/assets/cat-haciendas.jpg";
import catComercial from "@/assets/cat-comercial.png";
import heroDesarrollos from "@/assets/desarrollos-hero.png";
import heroYucatan from "@/assets/yucatan-hero.png";
import imgSeguridad from "@/assets/yuc-seguridad.jpeg";
import imgUbicacion from "@/assets/yuc-ubicacion.jpg";
import imgEnergia from "@/assets/yuc-energia.png";
import imgEducacion from "@/assets/yuc-educacion.jpg";
import imgSalud from "@/assets/yuc-salud.jpg";
import imgEconomia from "@/assets/yuc-economia.jpeg";
import imgCultura from "@/assets/yuc-cultura.png";
import imgRegion from "@/assets/yuc-region.png";
import gal1 from "@/assets/gal1.jpg";
import gal2 from "@/assets/gal2.jpg";
import gal3 from "@/assets/gal3.jpeg";
import gal4 from "@/assets/gal4.jpeg";
import gal6 from "@/assets/gal6.jpeg";
import gal7 from "@/assets/gal7.jpeg";
import galGastronomia from "@/assets/gal-gastronomia.jpeg";
import galFlora from "@/assets/gal-flora-fauna.jpeg";
import heroMercado from "@/assets/mercado-hero.jpeg";
import heroMercadoM from "@/assets/mercado-hero-mobile.png";
import heroEmpresa from "@/assets/empresa-hero.jpg";
import imgBoutique from "@/assets/boutique.jpg";
import imgPorQueRoche from "@/assets/por-que-roche.jpg";
import fotoRoger from "@/assets/equipo-roger.jpg";
import fotoYamile from "@/assets/equipo-yami.jpg";
import fotoAlejandrina from "@/assets/equipo-ale.jpg";
import iconMail from "@/assets/Mail2.png";
import iconVideollamada from "@/assets/Videollamada_Google_Meet_2.png";
import iconWhatsapp from "@/assets/WhatsApp2.png";

const IMAGENES_YUCATAN: Record<string, { imagen: string; imagenAlt: string; sinRecorte?: boolean }> = {
  "Seguridad y calidad de vida": {
    imagen: imgSeguridad,
    imagenAlt: "Familia caminando en un fraccionamiento residencial en Yucatán",
  },
  "Ubicación estratégica y conectividad": {
    imagen: imgUbicacion,
    imagenAlt: "Mapa de conectividad de la península con aeropuerto y Tren Maya",
    sinRecorte: true,
  },
  "Crecimiento económico sostenido": {
    imagen: imgEconomia,
    imagenAlt: "Vista aérea del corredor corporativo de Mérida al atardecer",
  },
  Energía: {
    imagen: imgEnergia,
    imagenAlt: "Infraestructura energética: parque solar, eólico y planta de ciclo combinado",
  },
  "Riqueza natural y cultural": {
    imagen: imgCultura,
    imagenAlt: "Cenote de aguas turquesa junto a una fachada colonial del centro de Mérida",
    sinRecorte: true,
  },
  "Educación de excelencia": {
    imagen: imgEducacion,
    imagenAlt: "Universidades y preparatorias de Mérida",
  },
  "Servicios de salud y atención médica": {
    imagen: imgSalud,
    imagenAlt: "Hospitales y clínicas de Mérida",
  },
  "Un nuevo capítulo para la región": {
    imagen: imgRegion,
    imagenAlt: "Monumento a la Patria en el Paseo de Montejo, Mérida, vista aérea",
  },
};

const YUCATAN_SECCIONES_CON_IMAGEN = YUCATAN_SECCIONES.map((s) => ({
  ...s,
  imagen: IMAGENES_YUCATAN[s.title]?.imagen ?? "",
  imagenAlt: IMAGENES_YUCATAN[s.title]?.imagenAlt ?? "",
  sinRecorte: IMAGENES_YUCATAN[s.title]?.sinRecorte ?? false,
}));

/**
 * Contenido editable del sitio, agrupado por módulo del panel.
 * Estos valores son el punto de partida: mientras no se guarde nada en el
 * panel, el sitio público los usa tal cual. Al guardar, la versión del panel
 * los sustituye inmediatamente.
 */
export const CONTENT_DEFAULTS = {
  inicio: {
    hero: {
      titulo: "Bienes Raíces e Inversiones Inmobiliarias en Mérida y Yucatán.",
      lema: "Experiencia · Visión · Seguridad",
      botonPropiedades: "Ver propiedades",
      botonCita: "Agendar cita",
      newsletterTitulo: "Inteligencia de mercado",
      newsletterEtiqueta: "Correo electrónico",
      newsletterBoton: "Suscribirme",
      imagenes: [
        { desktop: banner2, mobile: banner2m },
        { desktop: banner3, mobile: banner3m },
        { desktop: banner4, mobile: banner4m },
        { desktop: banner7, mobile: banner7m },
      ],
    },
    aliados: {
      titulo: "Con la confianza de",
      logos: [
        { src: logoAmpi, alt: "AMPI México" },
        { src: logoNar, alt: "National Association of Realtors" },
        { src: logoConocer, alt: "CONOCER" },
      ],
    },
    bienvenida: {
      eyebrow: "Sección",
      titulo: "Bienvenida",
      resumen: BIENVENIDA_RESUMEN,
      parrafos: BIENVENIDA_PARRAFOS,
      textoBoton: "Conozca más",
      imagen: imgBienvenida,
      imagenAlt: "Roger Roche M., director fundador de Roche Realtors",
    },
    destacadas: {
      titulo: "Propiedades destacadas",
      intro: "Selección curada por nuestro equipo.",
      textoBoton: "Ver todas las propiedades",
    },
    desarrollosDestacados: {
      titulo: "Desarrollos destacados",
      intro: "Proyectos seleccionados por nuestro equipo.",
      textoBoton: "Ver todos los desarrollos",
    },
    yucatanTeaser: {
      eyebrow: "Editorial",
      titulo: "Por qué Yucatán",
      resumen: YUCATAN_HOME_RESUMEN,
      parrafos: YUCATAN_HOME_PARRAFOS,
      textoBoton: "Conozca más",
      imagen: imgYucatanHome,
      imagenAlt: "Crecimiento inmobiliario en Yucatán",
    },
    serviciosTitulo: "Servicios",
    servicios: SERVICIOS,
    recursos: { titulo: "Recursos", textoBoton: "Ver todos los recursos" },
    newsletter: {
      titulo: "Reciba inteligencia de mercado",
      etiqueta: "Correo electrónico",
      textoBoton: "Suscribirme",
      confirmacion: "¡Gracias! Su suscripción ha sido registrada.",
    },
    agendaCita: {
      titulo: "Agende una cita",
      texto: "Converse con un asesor de Roche Realtors.",
      textoBoton: "Agendar",
    },
  },
  propiedades: {
    portada: {
      eyebrow: "Bienes Raíces · Mérida y Yucatán",
      titulo: "Propiedades Curadas en Mérida y Yucatán",
      subtitulo:
        "Casas, departamentos, terrenos, haciendas y espacios comerciales o industriales seleccionados uno a uno por nuestro equipo de asesores.",
      imagen: heroPropiedades,
      imagenAlt: "Propiedades en Yucatán",
    },
    seleccionTitulo: "Elija una categoría para comenzar",
    zonasTitulo: "Zonas y Colonias",
    categorias: [
      { nombre: "Casas", imagen: catCasas },
      { nombre: "Departamentos", imagen: catDeptos },
      { nombre: "Terrenos", imagen: catTerrenos },
      { nombre: "Haciendas", imagen: catHaciendas },
      { nombre: "Comercial / Industrial", imagen: catComercial },
    ],
    zonas: ZONAS_SECCION,
  },
  desarrollos: {
    portada: {
      eyebrow: "Inversiones Inmobiliarias · Mérida y Yucatán",
      titulo: "Desarrollos Seguros en Mérida y Yucatán.",
      subtitulo:
        "Comunidades y desarrollos de lujo, seleccionados por su confiabilidad, alta calidad, ubicación estratégica y potencial de plusvalía.",
      imagen: heroDesarrollos,
      imagenAlt: "Desarrollo residencial con campo de golf en Yucatán",
      intro: DESARROLLOS_INTRO,
      textoBoton: "Ver desarrollos",
      tituloListado: "Desarrollos",
    },
  },
  yucatan: {
    hero: {
      eyebrow: "El estado que cambió de escala",
      titulo: "Por qué Yucatán",
      subtitulo:
        "Seguridad, conectividad y crecimiento sostenido: Yucatán dejó de ser la joya oculta y hoy es una de las regiones más dinámicas de México.",
      imagen: heroYucatan,
      imagenAlt: "Crecimiento inmobiliario y económico de Mérida, Yucatán",
    },
    cifras: {
      titulo: "Yucatán en cifras",
      intro: "Los indicadores que explican el momento del estado.",
    },
    indicadores: YUCATAN_STATS,
    secciones: YUCATAN_SECCIONES_CON_IMAGEN,
    galeria: {
      eyebrow: "Galería",
      titulo: "Yucatán en imágenes",
      items: [
        { src: gal1, alt: "Convento de San Antonio de Padua en Izamal", caption: "Izamal, la ciudad amarilla" },
        { src: gal2, alt: "Pirámide de Kukulcán en Chichén Itzá", caption: "Chichén Itzá" },
        { src: gal3, alt: "Aguas turquesa de la costa yucateca", caption: "Costa y mar de Yucatán" },
        { src: gal4, alt: "Cenote de aguas turquesa en Yucatán", caption: "Cenotes de la península" },
        { src: gal6, alt: "Casona histórica del Paseo de Montejo en Mérida", caption: "Paseo de Montejo, Mérida" },
        { src: gal7, alt: "Baile tradicional yucateco con trajes típicos", caption: "Tradición viva" },
        { src: galGastronomia, alt: "Panuchos yucatecos con cochinita y cebolla morada", caption: "Gastronomía yucateca" },
        { src: galFlora, alt: "Flamencos rosados en la costa de Yucatán", caption: "Flora y fauna" },
      ],
    },
    cta: {
      titulo: "¿Quiere ver los datos?",
      texto: "Explore los indicadores y tendencias del mercado inmobiliario yucateco.",
      textoBoton: "Ver Inteligencia de Mercado",
    },
  },
  mercado: {
    meta: MERCADO_META,
    hero: {
      imagen: heroMercado,
      imagenMobile: heroMercadoM,
      imagenAlt: "Visualización de datos y tendencias del mercado inmobiliario",
    },
    kpisHorizontal: KPIS_HORIZONTAL,
    kpisVertical: KPIS_VERTICAL,
    etiquetas: {
      horizontal: "Vivienda horizontal",
      vertical: "Vivienda vertical",
      demograficos: "Datos demográficos",
      precios: "Evolución del precio",
      preciosIntro: "Precio por m² en vivienda horizontal y vertical, 2022–2026, por segmento.",
      absorcion: "Absorción según tipo de producto",
      absorcionIntro: "Unidades colocadas por mes según el tipo de producto.",
      municipios: "Proyectos por municipio",
    },
    demograficos: DEMOGRAFICOS,
    lecturaNSE:
      "El 54% de la utilización se concentra en los rubros C, G y D, mientras que el segmento Premium A y B representa apenas el 12%.",
    precioHorizontal: PRECIO_HORIZONTAL,
    precioVertical: PRECIO_VERTICAL,
    precioSegmento: PRECIO_SEGMENTO,
    variaciones: [
      { valor: "+19%", label: "Variación precio m² · Segmento residencial horizontal" },
      { valor: "+13%", label: "Variación precio m² · Segmento residencial vertical" },
    ],
    destacadoVertical: {
      valor: "+23%",
      texto: "Vivienda vertical sobre horizontal, segmento residencial.",
    },
    absorcion: ABSORCION,
    proyectosMunicipio: PROYECTOS_MUNICIPIO,
    notaMunicipios: NOTA_MUNICIPIOS,
    callouts: CALLOUTS_MUNICIPIO,
    cta: {
      titulo: "Conozca la historia detrás de los números",
      textoBoton: "Ver Por qué Yucatán",
    },
  },
  recursos: {
    portada: {
      titulo: "Recursos",
      texto: "Contenido de valor: análisis, tendencias y guías para invertir en Yucatán.",
    },
    destacado: {
      etiqueta: "Termómetro Inmobiliario",
      subetiqueta: "Último episodio",
      botonVer: "Ver video",
      botonYoutube: "Ver en YouTube",
    },
    termometro: {
      titulo: "Termómetro Inmobiliario",
      intro: "Videos con análisis del comportamiento del mercado inmobiliario en Yucatán.",
    },
    estiloVida: {
      titulo: "Estilo de vida",
      intro: "Enlaces oficiales sobre seguridad, salud, movilidad y vida cotidiana en Yucatán.",
    },
    vacio: "Contenido pendiente para esta categoría.",
  },
  empresa: {
    hero: {
      eyebrow: "+30 años en Mérida y Yucatán",
      titulo: "Una casa con historia",
      subtitulo:
        "Tres décadas asesorando y acompañando a familias e inversionistas en inversiones inmobiliarias con criterio, visión y seguridad.",
      imagen: heroEmpresa,
      imagenAlt: "Roger Roche frente a una residencia de lujo en Yucatán",
    },
    boutique: {
      eyebrow: "Quiénes somos",
      titulo: "Una inmobiliaria boutique",
      imagen: imgBoutique,
      imagenAlt: "Casona colonial restaurada en Mérida, Yucatán",
      resumen: EMPRESA_INTRO_RESUMEN,
    },
    intro: EMPRESA_INTRO_PARRAFOS,
    porQueRoche: {
      eyebrow: "Diferenciación",
      titulo: "¿Por qué Roche Realtors?",
      resumen: POR_QUE_ROCHE_RESUMEN,
      parrafos: POR_QUE_ROCHE_PARRAFOS,
      imagen: imgPorQueRoche,
      imagenAlt: "Equipo de Roche Realtors en sesión de análisis de inversión",
    },
    pilares: PILARES_ROCHE,
    equipoTitulo: "Nuestro equipo",
    equipo: [
      {
        nombre: "Roger Roche M.",
        cargo: "Director",
        foto: fotoRoger,
        bio: "Director General y Fundador de Roche Realtors Yucatán y Termómetro Inmobiliario. Su experiencia en los bienes raíces, inversiones y desarrollos inmobiliarios por más de 30 años, en el sureste de México y en el estado de Florida, USA, le ha permitido consolidarse como un referente, asesor y consultor experto, serio y confiable en el sector inmobiliario.",
      },
      {
        nombre: "Yamile Morillo",
        cargo: "Gerente de Operaciones",
        foto: fotoYamile,
        bio: "La Ing. Yamile es responsable de la atención y seguimiento personalizado, en tiempo y forma, de los clientes de la empresa, la coordinación y optimización de los procesos operativos, para asegurar que cada etapa se desarrolle de manera segura y eficiente.",
      },
      {
        nombre: "Alejandrina Cruz",
        cargo: "Coordinadora de Operaciones",
        foto: fotoAlejandrina,
        bio: "La Lic. Alejandrina apoya a la gerencia de operaciones en diversas actividades, particularmente en la recopilación de los documentos necesarios para la integración de los expedientes de las propiedades, y así cumplir con las normas y leyes vigentes para garantizar un servicio ágil y seguro.",
      },
    ],
    testimoniosTitulo: "Testimonios",
    testimonios: [
      {
        texto:
          "Desde el primer contacto recibimos una atención clara y profesional. Todo el proceso de compra fue muy bien explicado y nos sentimos acompañados en cada etapa. Sin duda volveríamos a elegir Roche Realtors.",
        autor: "Cliente Roche Realtors",
        lugar: "Mérida, Yucatán",
      },
      {
        texto:
          "Buscábamos un terreno para invertir y el equipo nos presentó opciones que realmente se ajustaban a nuestro presupuesto y objetivos. La asesoría fue excelente de principio a fin.",
        autor: "Cliente Roche Realtors",
        lugar: "Mérida, Yucatán",
      },
      {
        texto:
          "Encontramos el departamento ideal gracias al acompañamiento del equipo. Siempre estuvieron disponibles para resolver nuestras dudas y hacer que el proceso fuera sencillo y transparente.",
        autor: "Cliente Roche Realtors",
        lugar: "Mérida, Yucatán",
      },
    ],
    serviciosTitulo: "Servicios",
    servicios: SERVICIOS,
    faqTitulo: "Preguntas frecuentes",
    faqIntro: "Agrupadas por tema para que encuentre rápido lo que busca.",
    faq: FAQ_GRUPOS,
  },
  contacto: {
    portada: {
      titulo: "Contacto",
      texto: "Elija la vía de contacto que prefiera. Le respondemos a la brevedad.",
    },
    vias: [
      {
        title: "WhatsApp",
        desc: "Escríbanos por WhatsApp para una atención rápida.",
        btn: "Abrir WhatsApp",
        icon: iconWhatsapp,
      },
      {
        title: "Videollamada (Google Meet)",
        desc: "Reserve una videollamada con un asesor.",
        btn: "Agendar videollamada",
        icon: iconVideollamada,
      },
      {
        title: "Mail",
        desc: "Envíenos un mensaje al correo del equipo.",
        btn: "Escribir mail",
        icon: iconMail,
      },
    ],
    formulario: {
      titulo: "Envíenos un mensaje",
      campos: ["Nombre completo", "Email", "Teléfono"],
      etiquetaAsunto: "Asunto / interés",
      opciones: [
        "Selecciona una opción",
        "Compra de propiedad",
        "Inversión en desarrollo",
        "Asesoría general",
      ],
      etiquetaMensaje: "Mensaje",
      placeholderMensaje: "Cuéntenos",
      textoBoton: "Enviar mensaje",
      nota: "* Los mensajes se envían al equipo de ventas. Configurado para evitar spam.",
    },
    datosTitulo: "Atención y contacto",
    datos: CONTACTO,
    redesTitulo: "Síguenos",
    redes: {
      whatsapp: "https://wa.me/529999697229",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      youtube: "https://www.youtube.com/",
      linkedin: "",
      youtubeTermometro: "",
    },
    faq: {
      titulo: "Preguntas frecuentes",
      intro: "Las consultas más comunes. El listado completo está en Empresa.",
      textoBoton: "Ver todas las preguntas frecuentes",
      items: FAQ_CONTACTO,
    },
  },
  legales: { paginas: LEGALES },
  global: {
    footer: {
      descripcion:
        "Inmobiliaria Boutique en Mérida y Yucatán. Bienes Raíces e Inversiones Inmobiliarias. Experiencia, Visión y Seguridad.",
      tituloNavegacion: "Navegación",
      tituloAtencion: "Atención al cliente",
      tituloLegal: "Área legal",
      tituloNewsletter: "Newsletter",
      textoNewsletter: "Suscríbase para recibir novedades e inteligencia de mercado.",
      copyright:
        "© Roche Realtors — Todos los derechos reservados | Diseñado y Desarrollado por Búho Solutions..",
    },
    agendaCita: {
      titulo: "Agende una cita",
      intro:
        "Seleccione el tipo de cita y horario de su preferencia.\nDéjenos sus datos y recibirá la confirmación por correo electrónico.",
    },
  },
} as const;

export type ContentKey = keyof typeof CONTENT_DEFAULTS;

type AnyRecord = Record<string, unknown>;

/**
 * Contenido guardado en Supabase antes de migrar los assets fuera del CDN de Lovable
 * puede traer rutas tipo "/__l5e/assets-v1/<uuid>/<archivo>", que ya no existen fuera
 * del entorno de Lovable. Esas URLs deben ignorarse y usar el asset local por defecto.
 */
function isLegacyLovableAssetUrl(value: unknown): value is string {
  return typeof value === "string" && value.includes("/__l5e/assets-v1/");
}

/** Mezcla superficial y profunda: lo guardado en el panel gana sobre el valor base. */
export function mergeContent<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (isLegacyLovableAssetUrl(saved)) return base;
  if (Array.isArray(saved)) {
    const baseArr = Array.isArray(base) ? base : [];
    return saved.map((item, i) => mergeContent(baseArr[i], item)) as T;
  }
  if (Array.isArray(base)) return saved as T;
  if (typeof base === "object" && base !== null && typeof saved === "object") {
    const out: AnyRecord = { ...(base as AnyRecord) };
    for (const [k, v] of Object.entries(saved as AnyRecord)) {
      out[k] = mergeContent((base as AnyRecord)[k], v);
    }
    return out as T;
  }
  return saved as T;
}

export async function fetchContent(key: ContentKey) {
  const { data } = await supabase.from("site_content").select("data").eq("key", key).maybeSingle();
  return (data?.data ?? null) as unknown;
}

export async function saveContent(key: string, data: unknown) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, data: data as never }, { onConflict: "key" });
  if (error) throw error;
}

/** Devuelve el contenido del módulo, ya combinado con los valores base. */
export function useSiteContent<K extends ContentKey>(key: K): (typeof CONTENT_DEFAULTS)[K] {
  const { data } = useQuery({
    queryKey: ["site_content", key],
    queryFn: () => fetchContent(key),
    staleTime:
      typeof window !== "undefined" && (window as unknown as Record<string, unknown>).__E2E_TEST
        ? 0
        : 30_000,
  });
  return mergeContent(CONTENT_DEFAULTS[key], data);
}
