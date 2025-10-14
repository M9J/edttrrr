import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";

build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outdir: "build",
  format: "esm",
  splitting: true,
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["src/**/*"],
          to: ["build/"],
        },
        {
          from: ["assets/**/*"],
          to: ["build/assets"],
        },
      ],
    }),
  ],
}).catch(() => process.exit(1));
