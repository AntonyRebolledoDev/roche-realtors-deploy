// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { existsSync } from "fs";
import { basename } from "path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * El contenido guardado en Supabase (tabla site_content) fue guardado cuando las
 * imágenes aún vivían en el CDN de Lovable, así que trae rutas del tipo
 * "/__l5e/assets-v1/<uuid>/<archivo>". Localmente eso no existe y rompe las
 * imágenes unos segundos después de cargar (cuando el useQuery pisa los defaults).
 * Reescribimos esas rutas al archivo local equivalente en src/assets/<archivo>.
 */
function lovableLegacyAssetFallback(): Plugin {
  return {
    name: "lovable-legacy-asset-fallback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        const match = /^\/__l5e\/assets-v1\/[^/]+\/([^/?]+)/.exec(url);
        if (!match) return next();
        const filename = decodeURIComponent(basename(match[1]));
        const localPath = `${process.cwd()}/src/assets/${filename}`;
        if (!existsSync(localPath)) return next();
        req.url = `/src/assets/${filename}`;
        next();
      });
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server", preset: "node", },
  },
  plugins: [lovableLegacyAssetFallback()],
});
