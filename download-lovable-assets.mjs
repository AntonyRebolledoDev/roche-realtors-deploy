/**
 * download-lovable-assets.mjs
 */

import { readdir, readFile, writeFile, unlink } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "src", "assets");

// ← Tu URL de Lovable (sin slash al final)
const LOVABLE_BASE = "https://pixel-perfect-clone-90934.lovable.app";

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = { chunks: [] };

    protocol
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return downloadFile(res.headers.location, destPath)
            .then(resolve)
            .catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        res.on("data", (chunk) => file.chunks.push(chunk));
        res.on("end", async () => {
          await writeFile(destPath, Buffer.concat(file.chunks));
          resolve();
        });
      })
      .on("error", reject);
  });
}

async function main() {
  let entries;
  try {
    entries = await readdir(ASSETS_DIR);
  } catch {
    console.error("❌  No se encontró src/assets/.");
    process.exit(1);
  }

  const jsonFiles = entries.filter((f) => f.endsWith(".asset.json"));

  if (jsonFiles.length === 0) {
    console.log("✅  No hay archivos .asset.json.");
    return;
  }

  console.log(`🔍  Encontrados ${jsonFiles.length} archivos .asset.json\n`);

  let ok = 0;
  let fail = 0;

  for (const jsonFile of jsonFiles) {
    const jsonPath = join(ASSETS_DIR, jsonFile);
    const imageName = jsonFile.replace(/\.asset\.json$/, "");
    const imagePath = join(ASSETS_DIR, imageName);

    let url;
    try {
      const raw = await readFile(jsonPath, "utf8");
      const data = JSON.parse(raw);
      let rawUrl = data.url || data.src || data.path;
      if (!rawUrl) throw new Error("No se encontró campo url/src/path");

      // Si la URL es relativa, le ponemos el dominio de Lovable
      if (rawUrl.startsWith("/")) {
        rawUrl = LOVABLE_BASE + rawUrl;
      }
      url = rawUrl;
    } catch (err) {
      console.error(`  ❌  ${jsonFile} — ${err.message}`);
      fail++;
      continue;
    }

    try {
      process.stdout.write(`  ⬇️   ${imageName} … `);
      await downloadFile(url, imagePath);
      await unlink(jsonPath);
      console.log("✅");
      ok++;
    } catch (err) {
      console.log(`❌  ${err.message}`);
      fail++;
    }
  }

  console.log(`\n🎉  Listo: ${ok} descargadas, ${fail} fallidas.`);
}

main();