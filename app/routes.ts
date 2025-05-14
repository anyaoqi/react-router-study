import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("/about", "./routes/about.tsx"),
    route("/contact", "./routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
