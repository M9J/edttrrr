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
      ],
    }),
  ],
}).catch(() => process.exit(1));
