import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  // route("/product", "./routes/product.tsx"),
  route("/product/:pid", "./routes/product.tsx"),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
