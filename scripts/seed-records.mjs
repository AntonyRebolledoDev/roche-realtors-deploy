/**
 * Seed: inserta registros de prueba en el panel administrador vía Supabase Auth + REST API.
 *
 * Uso:
 *   $env:ADMIN_PASS="tu_contrasena"; node scripts/seed-records.mjs
 *
 * (PowerShell) o en bash:
 *   ADMIN_PASS="tu_contrasena" node scripts/seed-records.mjs
 */

const SUPABASE_URL = "https://omscyvbvahdoyaohbdbi.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tc2N5dmJ2YWhkb3lhb2hiZGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODM0MDQsImV4cCI6MjEwNTY1OTQwNH0.9ur6SsRtNQKqifulVWk-85ypmuPpL15iBt4Fnaftfy4";
const EMAIL = "antony@vilostudio.ai";
const PASSWORD = process.env.ADMIN_PASS;

if (!PASSWORD) {
  console.error("❌  Falta la variable ADMIN_PASS.\n   Ejecuta: $env:ADMIN_PASS='tu_contrasena'; node scripts/seed-records.mjs");
  process.exit(1);
}

async function supabase(path, { method = "GET", body, token } = {}) {
  const headers = {
    apikey: ANON_KEY,
    Authorization: `Bearer ${token ?? ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`${res.status} ${path}: ${text}`);
  return json;
}

async function main() {
  // 1. Autenticar
  console.log("🔐  Autenticando...");
  const auth = await supabase("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: { email: EMAIL, password: PASSWORD },
  });
  const token = auth.access_token;
  console.log("✅  Autenticado como:", auth.user?.email);

  const opts = (body) => ({ method: "POST", body, token });

  // 2. Propiedades
  console.log("\n🏠  Creando propiedades...");

  await supabase("/rest/v1/propiedades", opts({
    slug: "casa-moderna-merida-norte",
    nombre: "Casa Moderna en el Norte de Mérida",
    categoria: "casa",
    estado: "publicada",
    destacada: true,
    archivada: false,
    orden: 1,
    data: {
      tipoPropiedad: "Casa",
      tipoOferta: "Venta",
      precio: "$4,500,000 MXN",
      precioM2: "$25,000 MXN",
      zonaAbierta: "Zona Norte, Mérida",
      desarrollo: null,
      descripcion: [
        "Hermosa casa de 3 recámaras en fraccionamiento privado con excelente ubicación en la Zona Norte de Mérida.",
        "Amplios espacios, acabados de primera y jardín trasero. Ideal para familia en busca de tranquilidad y plusvalía."
      ],
      medidas: [["Terreno", "200 m²"], ["Construcción", "180 m²"]],
      distribucion: [["Recámaras", "3"], ["Baños completos", "2"], ["Medio baño", "1"], ["Cochera", "2 autos"]],
      servicios: ["Agua", "Luz", "Gas", "Internet"],
      galeria: [{ src: "", alt: "Fachada principal" }],
    },
  }));
  console.log("  ✅  Casa Moderna en el Norte de Mérida");

  await supabase("/rest/v1/propiedades", opts({
    slug: "departamento-centro-historico",
    nombre: "Departamento en el Centro Histórico",
    categoria: "departamento",
    estado: "publicada",
    destacada: true,
    archivada: false,
    orden: 2,
    data: {
      tipoPropiedad: "Departamento",
      tipoOferta: "Renta",
      precio: "$18,000 MXN / mes",
      zonaAbierta: "Centro Histórico, Mérida",
      desarrollo: null,
      descripcion: [
        "Departamento boutique de 2 recámaras en edificio restaurado del Centro Histórico de Mérida.",
        "Diseño contemporáneo con elementos coloniales originales. A pasos del Parque Santa Lucía."
      ],
      medidas: [["Construcción", "95 m²"]],
      distribucion: [["Recámaras", "2"], ["Baños", "1.5"], ["Sala-comedor", "1"]],
      servicios: ["Agua", "Luz", "Internet incluido"],
      galeria: [{ src: "", alt: "Interior departamento" }],
    },
  }));
  console.log("  ✅  Departamento en el Centro Histórico");

  await supabase("/rest/v1/propiedades", opts({
    slug: "terreno-privada-la-vista",
    nombre: "Terreno en Privada La Vista",
    categoria: "terreno-residencial",
    estado: "publicada",
    destacada: false,
    archivada: false,
    orden: 3,
    data: {
      tipoPropiedad: "Terreno Residencial",
      tipoOferta: "Venta",
      precio: "$1,200,000 MXN",
      precioM2: "$6,000 MXN",
      zonaAbierta: null,
      desarrollo: "Privada La Vista",
      descripcion: [
        "Terreno residencial de 200 m² en privada con acceso controlado al norte de la ciudad.",
        "Servicios de urbanización completos. Escriturado y listo para construir."
      ],
      medidas: [["Superficie", "200 m²"], ["Frente", "10 m"], ["Fondo", "20 m"]],
      servicios: ["Agua", "Luz", "Drenaje"],
      galeria: [{ src: "", alt: "Vista del terreno" }],
    },
  }));
  console.log("  ✅  Terreno en Privada La Vista");

  // 3. Artículos
  console.log("\n📰  Creando artículos...");

  await supabase("/rest/v1/articulos", opts({
    slug: "mercado-inmobiliario-merida-2026",
    titulo: "El Mercado Inmobiliario de Mérida en 2026: Análisis y Perspectivas",
    categoria: "noticias",
    estado: "publicado",
    archivado: false,
    orden: 1,
    fecha: "2026-09-15",
    data: {
      entradilla: "Mérida consolida su posición como el mercado inmobiliario más dinámico del sureste. Analizamos las tendencias clave para el segundo semestre de 2026.",
      imagen: "",
      bloques: [
        { h: "Crecimiento sostenido en la Zona Norte" },
        { p: "La demanda de vivienda residencial en la Zona Norte de Mérida creció un 18% respecto al mismo período del año anterior, impulsada por la llegada de nuevos desarrollos de uso mixto." },
        { h: "Precios por metro cuadrado" },
        { p: "El precio promedio por metro cuadrado en fraccionamientos privados se ubicó en $28,000 MXN, con un incremento anual del 12%. Las zonas con mayor apreciación fueron Temozón Norte y Santa Gertrudis Copó." },
        { h: "Perspectivas para el cierre del año" },
        { p: "Los indicadores apuntan a un segundo semestre sólido, con una absorción positiva en los segmentos residencial medio y residencial plus. La inversión extranjera directa en bienes raíces yucatecos aumentó un 22% en el primer semestre." },
      ],
    },
  }));
  console.log("  ✅  Artículo: Mercado Inmobiliario 2026");

  await supabase("/rest/v1/articulos", opts({
    slug: "ventajas-de-invertir-en-yucatan",
    titulo: "5 Razones para Invertir en Bienes Raíces en Yucatán",
    categoria: "noticias",
    estado: "publicado",
    archivado: false,
    orden: 2,
    fecha: "2026-08-20",
    data: {
      entradilla: "Seguridad, plusvalía, calidad de vida y conectividad: descubra por qué Yucatán sigue atrayendo a inversionistas nacionales e internacionales.",
      imagen: "",
      bloques: [
        { h: "1. Seguridad y calidad de vida" },
        { p: "Mérida encabeza los rankings nacionales de seguridad por más de una década. Esto se traduce en una demanda constante y creciente de vivienda residencial de calidad." },
        { h: "2. Plusvalía sostenida" },
        { p: "El incremento promedio en el valor de los inmuebles ha sido del 10-15% anual en los últimos 5 años, superando con creces a los instrumentos financieros tradicionales." },
        { h: "3. Conectividad y logística" },
        { p: "El Aeropuerto Internacional de Mérida, el Tren Maya y los proyectos de infraestructura en curso posicionan a Yucatán como un hub estratégico para el sureste mexicano." },
        { h: "4. Turismo y economía local robusta" },
        { p: "El flujo turístico hacia Mérida y las zonas arqueológicas cercanas genera una demanda permanente de propiedades de alquiler vacacional, con retornos anuales del 8-12%." },
        { h: "5. Marco legal favorable" },
        { p: "Yucatán ofrece un entorno jurídico estable, con procesos de escrituración transparentes y un registro público confiable que brinda certeza a los inversionistas." },
      ],
    },
  }));
  console.log("  ✅  Artículo: 5 Razones para Invertir");

  // 4. Site Content — Hero inicio
  console.log("\n🎨  Actualizando contenido CMS (inicio)...");

  await supabase("/rest/v1/site_content", {
    method: "POST",
    token,
    body: {
      key: "inicio",
      data: {
        hero: {
          titulo: "Tu próxima inversión empieza aquí",
          lema: "Experiencia · Visión · Seguridad",
          botonPropiedades: "Ver propiedades",
          botonCita: "Agendar cita",
          newsletterTitulo: "Recibe análisis exclusivos",
          newsletterEtiqueta: "Tu correo",
          newsletterBoton: "Suscribirme",
          imagenes: [{ desktop: "", mobile: "" }],
        },
        destacadas: {
          titulo: "Propiedades Destacadas",
          intro: "Selección de las mejores propiedades en venta y renta en Mérida y Yucatán.",
          textoBoton: "Ver todas las propiedades",
        },
        recursos: {
          titulo: "Inteligencia de Mercado",
          textoBoton: "Ver todos los recursos",
        },
        serviciosTitulo: "Nuestros Servicios",
        servicios: [
          { title: "Asesoría de Compra", desc: "Te acompañamos en cada etapa del proceso de adquisición de tu propiedad.", icon: "" },
          { title: "Asesoría de Venta", desc: "Estrategia de precio, marketing y negociación para maximizar tu inversión.", icon: "" },
          { title: "Inversión Inmobiliaria", desc: "Identificamos oportunidades con alto potencial de plusvalía y rentabilidad.", icon: "" },
        ],
      },
    },
  });
  console.log("  ✅  Site content 'inicio' actualizado");

  console.log("\n🎉  Registros creados exitosamente.");
  console.log("   Visita http://localhost:3737 para ver los datos en el sitio público.");
  console.log("   Visita http://localhost:3737/admin para gestionar los registros.");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
