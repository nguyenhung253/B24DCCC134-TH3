import { defineConfig } from "@umijs/max";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  dva: {},
  npmClient: 'npm',
});
