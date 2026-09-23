import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

type Red = { name: string; Icon: typeof Facebook; href: string };

// Redes del cliente: WhatsApp, Instagram, Facebook y YouTube (sin LinkedIn).
export const REDES_FOOTER: Red[] = [
  { name: "WhatsApp", Icon: MessageCircle, href: "#" },
  { name: "Instagram", Icon: Instagram, href: "#" },
  { name: "Facebook", Icon: Facebook, href: "#" },
  { name: "YouTube", Icon: Youtube, href: "#" },
];

export const REDES_SOCIALES: Red[] = REDES_FOOTER;


export function SocialIcons({
  size = 28,
  iconSize = 15,
  items = REDES_SOCIALES,
}: {
  size?: number;
  iconSize?: number;
  items?: Red[];
}) {
  return (
    <div className="flex gap-2">
      {items.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          title={name}
          className="border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary"
          style={{ width: size, height: size }}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}

export function SocialList({ items = REDES_SOCIALES }: { items?: Red[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          className="border border-border px-3 py-2 text-[10px] uppercase tracking-wider flex items-center gap-2 text-foreground hover:bg-secondary"
        >
          <Icon size={14} />
          {name}
        </a>
      ))}
    </div>
  );
}
