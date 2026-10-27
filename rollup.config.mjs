import { builtinModules } from "node:module";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

const builtins = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));

export default defineConfig(
  ["index", "browser"].flatMap((entry) =>
    ["es", "cjs"].map((format) => ({
      input: `src/${entry}.ts`,
      output: {
        file: `dist/${entry}.${format === "es" ? "mjs" : "js"}`,
        format,
        sourcemap: true,
        ...(format === "cjs" ? { exports: "named" } : {}),
      },
      external: (source) => entry === "index" && builtins.has(source),
      onwarn(warning, warn) {
        if (warning.code === "UNRESOLVED_IMPORT") throw new Error(warning.message);
        warn(warning);
      },
      plugins: [
        {
          name: "browser-runtime-boundary",
          resolveId(source) {
            if (entry === "browser" && builtins.has(source))
              throw new Error(`Node module cannot enter the browser SDK: ${source}`);
            return null;
          },
        },
        typescript({
          tsconfig: "./tsconfig.json",
          noEmitOnError: true,
          declaration: format === "es",
          ...(format === "es" ? { declarationDir: "./dist" } : {}),
          rootDir: "./src",
        }),
      ],
    })),
  ),
);
