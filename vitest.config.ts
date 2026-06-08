import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html", "lcov", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.d.ts",
        "src/routeTree.gen.ts",
        "src/integrations/supabase/**",
        "src/components/ui/**",
        // ---- Legacy code (no tests yet) -------------------------------
        // Files below are temporarily excluded from coverage thresholds.
        // Remove a file from this list as soon as it has tests so the
        // global thresholds start enforcing its coverage too.
        "src/router.tsx",
        "src/server.ts",
        "src/start.ts",
        "src/data/services.ts",
        "src/hooks/use-mobile.tsx",
        "src/components/Header.tsx",
        "src/components/Footer.tsx",
        "src/components/SiteLayout.tsx",
        "src/lib/utils.ts",
        "src/lib/error-capture.ts",
        "src/lib/error-page.ts",
        "src/lib/lovable-error-reporting.ts",
        "src/lib/config.server.ts",
        "src/lib/admin-claim.functions.ts",
        "src/lib/products.functions.ts",
        "src/lib/api/**",
        "src/routes/**",
        // ---------------------------------------------------------------
      ],
      // Per-file thresholds enforce coverage on EVERY non-excluded file,
      // so any new production module that ships without tests fails CI.
      // Adjust legacy excludes above when adding tests for those files.
      thresholds: {
        perFile: true,
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
        // Stricter targets for already well-tested modules.
        "src/lib/admin-attempts.ts": {
          lines: 95,
          functions: 100,
          branches: 85,
          statements: 95,
        },
      },
    },
  },
});
