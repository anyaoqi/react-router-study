import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/project", "./project.tsx"),
  route("/projectDetail/:pid", "./projectDetail.tsx"),
  route("*", "./not-found.tsx"),
] satisfies RouteConfig;
