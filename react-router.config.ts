import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    // 预加载动态路由
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const products = await res.json();
    const routes = products.map((product: any) => `/product/${product.id}`);
    return routes;
  },
} satisfies Config;
