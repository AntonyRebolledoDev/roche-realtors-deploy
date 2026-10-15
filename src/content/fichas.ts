// Modelo de datos de las plantillas dinámicas de detalle.
// Cada campo es administrable; los campos opcionales se ocultan en la vista
// pública cuando no tienen valor.

export type Opcion = string;

export const CATALOGOS = {
  tipoDesarrollo: ["Residencial", "Comercial", "Mixto", "Industrial"],
  tipoOperacion: ["Compra", "Venta", "Preventa", "Renta", "Aportación"],
  tipoProductoDesarrollo: ["Casa", "Departamento", "Terreno", "Comercial / Industrial"],
  disponibilidadDesarrollo: ["Disponible", "Apartado(a)", "Vendido", "Rentado"],
  tipoOferta: ["Casas", "Villas", "Departamentos", "Terrenos residenciales", "Macrolotes"],
  tipoPropiedad: ["Casa", "Departamento", "Terreno residencial", "Terreno macrolote"],
  subtipoDepartamento: ["Estudio", "Departamento", "Pent Garden", "Pent House"],
  calidad: ["Premium", "Lujo", "Lujo comercial", "Comercial"],
  conservacion: ["Excelente", "Muy bueno", "Bueno", "Regular"],
  ubicacionTerreno: ["Cluster", "Privada", "Avenida", "Calle"],
  tipoTerreno: ["Regular", "Irregular"],
  usoMacrolote: ["Residencial", "Comercial", "Industrial", "Mixto"],
  servicios: ["Calle de acceso", "Luz", "Agua", "Telefonía"],
  caracteristicasTerreno: ["Vista a parque", "Vista a green", "Vista al agua", "Calle"],
  amenidadesBase: [
    "Alberca",
    "Gimnasio",
    "Roof garden",
    "Seguridad 24/7",
    "Área de coworking",
    "Casa club",
    "Pet park",
    "Cancha de pádel",
    "Áreas verdes",
    "Ciclovía",
  ],
  /** Checklist precargado de amenidades para desarrollos (distinto del de propiedades). */
  amenidadesDesarrollo: [
    "Acceso a la playa",
    "Balcón",
    "Cisterna",
    "Estacionamiento techado",
    "Frente al mar",
    "Jardín",
    "Garage",
    "Riego por aspersión",
    "Roof top",
    "Terraza",
    "Vista al mar",
    "Aire acondicionado",
    "Amueblado",
    "Bodega",
    "Circuito Cerrado",
    "Clóset vestidor",
    "Cocina equipada",
    "Cuarto de servicio",
    "Elevador",
    "Fraccionamiento privado",
    "Hidroneumático",
    "Paneles solares",
    "Planta eléctrica",
    "Recámara en planta baja",
    "Seguridad 24 horas",
    "Alberca",
    "Juegos infantiles",
    "Cancha de pádel",
    "Cancha de tenis",
    "Cine",
    "Fogatero",
    "Gimnasio",
    "Jacuzzi",
    "Salón de usos múltiples",
    "Sauna",
  ],
};

export type Galeria = { src?: string; alt: string }[];

/** Formato del precio "Desde": precio total o precio por m². */
export type FormatoPrecio = "total" | "m2";
export type PrecioDesde = { monto: string; formato: FormatoPrecio };

/** Da formato a un precio "Desde" ("$..... MXN" o "$..... MXN x m²"). Acepta
 * también el formato legado (texto libre) para no romper fichas ya guardadas. */
export function textoPrecioDesde(p?: PrecioDesde | string | null): string {
  if (!p) return "";
  if (typeof p === "string") return p;
  if (!p.monto) return "";
  return `$${p.monto} MXN${p.formato === "m2" ? " x m²" : ""}`;
}

export type Desarrollo = {
  nombre: string;
  tipoDesarrollo: Opcion;
  tipoOperacion: Opcion;
  descripcionCorta: string;
  desde?: PrecioDesde;
  imagen?: string;
  imagenRepresentativa?: string;
  /** Encabezado sobre la descripción general (p. ej. "El desarrollo"). */
  tituloSeccionDesarrollo?: string;
  descripcionGeneral: string[];
  masterPlan?: string;
  galeria: Galeria;
  ofertas: { tipo: Opcion; desde: string }[];
  disponibilidad: string;
  ubicacion: string;
  mapa?: string;
  desarrollador?: { nombre: string; texto: string[] };
  amenidades?: string[];
};

export const DESARROLLO_DEMO: Desarrollo = {
  nombre: "Nombre del desarrollo",
  tipoDesarrollo: "Residencial",
  tipoOperacion: "Preventa",
  descripcionCorta:
    "Comunidad planeada al norte de Mérida, con amenidades, áreas verdes y accesos controlados.",
  desde: { monto: "2,450,000", formato: "total" },
  tituloSeccionDesarrollo: "El desarrollo",
  descripcionGeneral: [
    "Un desarrollo concebido para la vida contemporánea en Yucatán: trazo abierto, vegetación nativa y una arquitectura sobria que privilegia la luz y la ventilación natural.",
    "Cada etapa integra vialidades internas, andadores y espacios comunes pensados para el encuentro y el descanso.",
  ],
  galeria: [
    { alt: "Acceso principal" },
    { alt: "Casa club" },
    { alt: "Alberca" },
    { alt: "Áreas verdes" },
    { alt: "Andadores" },
    { alt: "Vialidades internas" },
  ],
  ofertas: [
    { tipo: "Casa", desde: "$3,900,000 MXN" },
    { tipo: "Terreno", desde: "$2,450,000 MXN" },
    { tipo: "Departamento", desde: "$12,000,000 MXN" },
  ],
  disponibilidad: "Disponible",
  ubicacion: "Zona norte · Mérida, Yucatán",
  amenidades: ["Alberca", "Gimnasio", "Roof top", "Jardín", "Seguridad 24 horas", "Cancha de pádel"],
  desarrollador: {
    nombre: "Nombre del desarrollador",
    texto: [
      "Empresa con trayectoria en la región, especializada en comunidades planeadas de largo plazo.",
    ],
  },
};

export type Propiedad = {
  categoria:
    | "Casa"
    | "Departamento"
    | "Terreno residencial"
    | "Terreno macrolote"
    | "Hacienda"
    | "Comercial / Industrial";
  nombre: string;
  tipoPropiedad: string;
  tipoOferta: Opcion;
  desarrollo?: string;
  zonaAbierta?: string;
  descripcion: string[];
  galeria: Galeria;
  video?: string;
  mapa?: string;
  disponibilidad?: string;
  precio?: string;
  precioM2?: string;
  /** Qué precio mostrar en la tarjeta pública (solo terrenos/macrolotes). */
  precioMostrar?: "precio" | "precioM2";
  mantenimiento?: string;
  medidas?: [string, string][];
  distribucion?: [string, string][];
  caracteristicas?: { label: string; incluido: boolean }[];
  /** Checklist de amenidades comunes seleccionadas desde el catálogo. */
  amenidades?: string[];
  /** Texto libre: otras amenidades no listadas en el catálogo (separadas por coma). */
  amenidadesOtras?: string;
  servicios?: string[];
  estatus?: [string, string][];
  uso?: string;
};

/** Une el checklist de amenidades con las capturadas en texto libre. */
export const amenidadesCompletas = (p: Propiedad): string[] => [
  ...(p.amenidades ?? []),
  ...(p.amenidadesOtras ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
];


const galeriaDemo = (n: number): Galeria =>
  Array.from({ length: n }, (_, i) => ({ src: "", alt: `Imagen ${i + 1}` }));

export const PROPIEDADES_DEMO: Record<string, Propiedad> = {
  casa: {
    categoria: "Casa",
    nombre: "Nombre de la propiedad",
    tipoPropiedad: "Casa",
    tipoOferta: "Venta",
    desarrollo: "Nombre del desarrollo",
    descripcion: [
      "Casa de líneas limpias con doble altura en el área social, patio interior y acabados de autor.",
      "Orientación cuidada para aprovechar la brisa del norte y la luz de la tarde.",
    ],
    galeria: galeriaDemo(8),
    disponibilidad: "Entrega inmediata",
    precio: "$8,950,000 MXN",
    mantenimiento: "$2,400 MXN",
    medidas: [
      ["Terreno", "300 m²"],
      ["Construcción", "245 m²"],
      ["Plantas", "2"],
      ["Calidad de acabados", "Premium"],
      ["Calidad de equipamiento", "Lujo"],
    ],
    distribucion: [
      ["Recámaras", "3"],
      ["Baños", "3"],
      ["Medio baño", "1"],
      ["Cuarto de servicio", "1"],
      ["Garage techado", "2 vehículos"],
      ["Garage abierto", "1 vehículo"],
    ],
    caracteristicas: [
      { label: "Alberca", incluido: true },
      { label: "Jacuzzi", incluido: false },
      { label: "Terraza techada", incluido: true },
      { label: "Jardín exterior", incluido: true },
      { label: "Jardín interior", incluido: true },
      { label: "Estacionamiento para visitas", incluido: true },
      { label: "Paneles solares", incluido: true },
      { label: "Planta eléctrica", incluido: false },
      { label: "Equipada", incluido: true },
      { label: "Amueblada", incluido: false },
    ],
    amenidades: [...CATALOGOS.amenidadesBase],
    estatus: [
      ["Estatus", "Nueva"],
      ["Estado de conservación", "Excelente"],
    ],
  },
  departamento: {
    categoria: "Departamento",
    nombre: "Nombre de la propiedad",
    tipoPropiedad: "Pent House",
    tipoOferta: "Preventa",
    desarrollo: "Nombre del desarrollo",
    descripcion: [
      "Unidad superior con terraza panorámica, cocina integral y acabados de lujo comercial.",
    ],
    galeria: galeriaDemo(8),
    disponibilidad: "Fecha futura · 2027",
    precio: "$12,400,000 MXN",
    mantenimiento: "$4,900 MXN",
    medidas: [
      ["Construcción interior", "180 m²"],
      ["Construcción exterior", "60 m²"],
      ["Plantas", "1"],
      ["Calidad de acabados", "Lujo"],
      ["Calidad de equipamiento", "Lujo comercial"],
    ],
    distribucion: [
      ["Recámaras", "3"],
      ["Baños", "3"],
      ["Medio baño", "1"],
      ["Cuarto de servicio", "1"],
      ["Garage techado", "2 vehículos"],
      ["Garage abierto", "0"],
    ],
    caracteristicas: [
      { label: "Balcón techado", incluido: true },
      { label: "Alberca", incluido: true },
      { label: "Jacuzzi", incluido: true },
      { label: "Jardín exterior", incluido: false },
      { label: "Jardín interior", incluido: true },
      { label: "Estacionamiento para visitas", incluido: true },
      { label: "Elevador", incluido: true },
      { label: "Shut de basura", incluido: true },
      { label: "Paneles solares", incluido: false },
      { label: "Planta eléctrica", incluido: true },
      { label: "Equipada", incluido: true },
      { label: "Amueblada", incluido: false },
    ],
    amenidades: ["Roof garden", "Gimnasio", "Área de coworking", "Seguridad 24/7", "Alberca"],
    amenidadesOtras: "Sala de cine, Terraza con asadores, Lockers para paquetería",

    estatus: [
      ["Estatus", "Nueva"],
      ["Estado de conservación", "Excelente"],
    ],
  },
  "terreno-residencial": {
    categoria: "Terreno residencial",
    nombre: "Nombre de la propiedad",
    tipoPropiedad: "Terreno residencial",
    tipoOferta: "Venta",
    desarrollo: "Nombre del desarrollo",
    descripcion: ["Lote en privada con vista a parque, listo para construir."],
    galeria: galeriaDemo(6),
    disponibilidad: "Entrega inmediata",
    precio: "$3,200,000 MXN",
    precioM2: "$8,000 MXN",
    precioMostrar: "precio",
    mantenimiento: "$1,800 MXN",
    medidas: [
      ["Ubicación", "Privada"],
      ["Terreno", "400 m²"],
      ["Tipo de terreno", "Regular"],
      ["Frente", "16 m"],
      ["Fondo", "25 m"],
    ],
    servicios: ["Calle de acceso", "Luz", "Agua", "Telefonía"],
    caracteristicas: [
      { label: "Vista a parque", incluido: true },
      { label: "Vista a green", incluido: false },
      { label: "Vista al agua", incluido: false },
      { label: "Calle", incluido: true },
      { label: "Casa club", incluido: true },
      { label: "Amenidades", incluido: true },
      { label: "Estacionamiento para visitas", incluido: true },
    ],
    amenidades: [...CATALOGOS.amenidadesBase],
    estatus: [
      ["Estatus", "Disponible"],
      ["Estado de conservación", "N/A"],
    ],
  },
  macrolote: {
    categoria: "Terreno macrolote",
    nombre: "Macrolote",
    tipoPropiedad: "Terreno macrolote",
    tipoOferta: "Venta",
    desarrollo: "Nombre del desarrollo",
    descripcion: ["Superficie de gran formato con frente a vialidad primaria."],
    galeria: galeriaDemo(6),
    disponibilidad: "Entrega inmediata",
    precio: "$12,000,000 MXN",
    precioM2: "$1,200 MXN",
    precioMostrar: "precio",
    mantenimiento: "$3,500 MXN",
    medidas: [
      ["Ubicación", "Avenida"],
      ["Dimensión", "10,000 m²"],
      ["Tipo de terreno", "Regular"],
      ["Frente", "80 m"],
      ["Fondo", "125 m"],
    ],
    servicios: ["Calle de acceso", "Luz", "Agua", "Telefonía"],
    caracteristicas: [
      { label: "Vista a parque", incluido: false },
      { label: "Vista a green", incluido: false },
      { label: "Vista al agua", incluido: false },
      { label: "Calle", incluido: true },
      { label: "Casa club", incluido: false },
      { label: "Amenidades", incluido: false },
      { label: "Estacionamiento para visitas", incluido: false },
    ],
    amenidades: [...CATALOGOS.amenidadesBase],
    estatus: [
      ["Estatus", "Disponible"],
      ["Estado de conservación", "N/A"],
    ],
  },
  hacienda: {
    categoria: "Hacienda",
    nombre: "Nombre de la hacienda",
    tipoPropiedad: "Hacienda",
    tipoOferta: "Venta",
    zonaAbierta: "Zona rural · Yucatán",
    descripcion: [
      "Hacienda henequenera restaurada, con casa principal, capilla y áreas verdes de gran formato.",
      "Combina arquitectura patrimonial con potencial para uso residencial, hotel boutique o eventos.",
    ],
    galeria: galeriaDemo(8),
    disponibilidad: "Entrega inmediata",
    precio: "$28,500,000 MXN",
    mantenimiento: "$6,500 MXN",
    medidas: [
      ["Terreno", "20,000 m²"],
      ["Construcción", "1,200 m²"],
      ["Plantas", "1"],
      ["Calidad de acabados", "Premium"],
    ],
    distribucion: [
      ["Recámaras", "5"],
      ["Baños", "6"],
      ["Medio baño", "2"],
      ["Capilla", "1"],
      ["Casa de máquinas", "1"],
      ["Estacionamiento", "6 vehículos"],
    ],
    caracteristicas: [
      { label: "Alberca", incluido: true },
      { label: "Capilla", incluido: true },
      { label: "Jardín exterior", incluido: true },
      { label: "Palapa / Terraza", incluido: true },
      { label: "Casa de máquinas", incluido: true },
      { label: "Cisterna propia", incluido: true },
      { label: "Planta eléctrica", incluido: false },
      { label: "Amueblada", incluido: false },
    ],
    amenidades: [...CATALOGOS.amenidadesBase],
    estatus: [
      ["Estatus", "Disponible"],
      ["Estado de conservación", "Bueno"],
    ],
  },
  "comercial-industrial": {
    categoria: "Comercial / Industrial",
    nombre: "Nombre del inmueble",
    tipoPropiedad: "Nave industrial",
    tipoOferta: "Venta",
    zonaAbierta: "Parque industrial · Mérida",
    descripcion: [
      "Nave industrial con oficinas, andén de carga y patio de maniobras, en parque con vigilancia 24/7.",
    ],
    galeria: galeriaDemo(6),
    disponibilidad: "Entrega inmediata",
    precio: "$15,000,000 MXN",
    mantenimiento: "$5,200 MXN",
    medidas: [
      ["Terreno", "2,500 m²"],
      ["Construcción", "1,800 m²"],
      ["Altura de nave", "9 m"],
      ["Calidad de acabados", "Comercial"],
    ],
    distribucion: [
      ["Oficinas", "2"],
      ["Baños", "4"],
      ["Andenes de carga", "2"],
      ["Patio de maniobras", "1"],
      ["Estacionamiento", "10 vehículos"],
    ],
    caracteristicas: [
      { label: "Andén de carga", incluido: true },
      { label: "Oficinas acondicionadas", incluido: true },
      { label: "Patio de maniobras", incluido: true },
      { label: "Subestación eléctrica", incluido: true },
      { label: "Vigilancia 24/7", incluido: true },
      { label: "Cisterna propia", incluido: false },
    ],
    amenidades: [...CATALOGOS.amenidadesBase],
    servicios: ["Calle de acceso", "Luz", "Agua", "Telefonía"],
    estatus: [
      ["Estatus", "Disponible"],
      ["Estado de conservación", "Bueno"],
    ],
  },
};
