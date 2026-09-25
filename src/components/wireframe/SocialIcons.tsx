import { Facebook, Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";

type IconComp = React.ComponentType<{ size?: number }>;
export type Red = { name: string; Icon: IconComp; href: string };

const RED_CONFIG: Record<string, { name: string; Icon: IconComp }> = {
  whatsapp:          { name: "WhatsApp",              Icon: MessageCircle },
  instagram:         { name: "Instagram",             Icon: Instagram     },
  facebook:          { name: "Facebook",              Icon: Facebook      },
  youtube:           { name: "YouTube",               Icon: Youtube       },
  linkedin:          { name: "LinkedIn",              Icon: Linkedin      },
  youtubeTermometro: { name: "YouTube · Termómetro",  Icon: Youtube       },
};

const RED_ORDER = ["whatsapp", "instagram", "facebook", "youtube", "linkedin", "youtubeTermometro"];

/** Lee las URLs del módulo contacto y devuelve sólo las redes con URL. */
export function useRedes(): Red[] {
  const redes = useSiteContent("contacto").redes as Record<string, string> | undefined;
  if (!redes) return [];
  return RED_ORDER
    .filter((k) => redes[k])
    .map((k) => ({ ...RED_CONFIG[k], href: redes[k] }));
}

export function SocialIcons({
  size = 28,
  iconSize = 15,
  items,
}: {
  size?: number;
  iconSize?: number;
  items?: Red[];
}) {
  const redesCms = useRedes();
  const list = items ?? redesCms;

  return (
    <div className="flex gap-2">
      {list.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          title={name}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          style={{ width: size, height: size }}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}

export function SocialList({ items }: { items?: Red[] }) {
  const redesCms = useRedes();
  const list = items ?? redesCms;

  return (
    <div className="flex gap-2 flex-wrap">
      {list.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border px-3 py-2 text-[10px] uppercase tracking-wider flex items-center gap-2 text-foreground hover:bg-secondary transition-colors"
        >
          <Icon size={14} />
          {name}
        </a>
      ))}
    </div>
  );
}
