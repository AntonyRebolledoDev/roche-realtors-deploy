import {
  Bar,
  Cell,
  Pie,
  PieChart,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const INK = "var(--foreground)";
const GOLD = "var(--gold)";
const MUTED = "var(--muted-foreground)";
const BORDER = "var(--border)";

const axis = { stroke: MUTED, fontSize: 11, tickLine: false, axisLine: { stroke: BORDER } };

const tooltipStyle = {
  contentStyle: {
    borderRadius: 16,
    border: "1px solid var(--border)",
    background: "var(--card)",
    fontSize: 12,
  },
  labelStyle: { color: "var(--foreground)", fontWeight: 600 },
};

const money = (v: number) => `$${v.toLocaleString("es-MX")}`;

/** Marco visual común para cualquier gráfica. */
export function ChartCard({
  title,
  children,
  nota,
  fuente,
}: {
  title: string;
  children: React.ReactNode;
  nota?: string;
  fuente?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-6">
        {title}
      </div>
      <div className="h-[300px] w-full">{children}</div>
      {nota && <p className="mt-4 text-xs text-muted-foreground">{nota}</p>}
      {fuente && <p className="mt-2 text-[11px] italic text-muted-foreground">{fuente}</p>}
    </div>
  );
}

export function LineaPrecios({
  data,
}: {
  data: Record<string, string | number>[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={BORDER} vertical={false} />
        <XAxis dataKey="anio" {...axis} />
        <YAxis {...axis} width={62} tickFormatter={(v: number) => `$${v / 1000}k`} />
        <Tooltip {...tooltipStyle} formatter={(v) => money(Number(v))} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
        <Line type="monotone" dataKey="Medio" stroke={MUTED} strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="Residencial" stroke={GOLD} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line
          type="monotone"
          dataKey="Residencial Plus"
          stroke={INK}
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarrasAgrupadas({
  data,
  xKey,
  formato = "numero",
}: {
  data: Record<string, string | number>[];
  xKey: string;
  formato?: "numero" | "moneda";
}) {
  const fmt = (v: number) => (formato === "moneda" ? money(v) : v.toLocaleString("es-MX"));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={BORDER} vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis
          {...axis}
          width={62}
          tickFormatter={(v: number) => (formato === "moneda" ? `$${v / 1000}k` : String(v))}
        />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--surface)" }} formatter={(v) => fmt(Number(v))} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
        <Bar dataKey="Horizontal" fill={INK} radius={[6, 6, 0, 0]} maxBarSize={44} />
        <Bar dataKey="Vertical" fill={GOLD} radius={[6, 6, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarrasSimples({
  data,
  xKey,
  dataKey,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  dataKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={BORDER} vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis {...axis} width={48} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--surface)" }} />
        <Bar dataKey={dataKey} fill={INK} radius={[6, 6, 0, 0]} maxBarSize={70} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Barra de distribución horizontal simple (porcentajes). */
export function BarraDistribucion({ items }: { items: { label: string; valor: number }[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it.label}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">{it.label}</span>
            <span className="font-medium text-foreground">{it.valor}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-surface">
            <div
              className="h-1.5 rounded-full bg-gold transition-all duration-700"
              style={{ width: `${it.valor}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const PIE_COLORS = [
  "var(--gold)",
  "color-mix(in oklch, var(--gold) 78%, transparent)",
  "color-mix(in oklch, var(--gold) 58%, transparent)",
  "color-mix(in oklch, var(--gold) 42%, transparent)",
  "color-mix(in oklch, var(--foreground) 45%, transparent)",
  "color-mix(in oklch, var(--foreground) 25%, transparent)",
];

/** Composición por nivel socioeconómico. */
export function PastelDistribucion({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="52%"
          outerRadius="82%"
          paddingAngle={2}
          stroke="var(--card)"
          label={({ name, value }) => `${name} ${value}%`}
          labelLine={false}
        >
          {data.map((d, i) => (
            <Cell key={d.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
