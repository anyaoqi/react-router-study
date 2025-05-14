import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  // Index Routes: 定义首页
  index("./routes/home.tsx"),

  // Route Modules: 定义普通路由
  route("about", "./routes/about.tsx"),
  route("login", "./routes/login.tsx"),

  // Nested Routes: 嵌套路由
  route("setting", "./routes/setting/setting.tsx", [
    index("./routes/setting/index.tsx"),
    route("product", "./routes/setting/product.tsx"),
    route("user", "./routes/setting/user.tsx"),
  ]),

  // Layout Routes: 布局路由
  layout("./routes/layout.tsx", [
    index("./routes/marketing/home.tsx"),
    route("contact", "./routes/marketing/contact.tsx"),
  ]),

  // Route Prefixes: 路由前缀
  ...prefix("projects", [
    index("./routes/projects/home.tsx"),
    layout("./routes/projects/project-layout.tsx", [
      route(":pid", "./routes/projects/project.tsx"),
      route(":pid/edit", "./routes/projects/edit-project.tsx"),
    ]),
  ]),

  // Dynamic Segments: 动态路由
  route("teams/:teamId", "./routes/teams/team.tsx"),

  // Optional Segments 可选路由
  route(":lang?/categories", "./routes/categories/categories.tsx"),

  // 通配符
  route("files/*", "./routes/files/files.tsx"),

  // 组件路由
  route("wizard/*", "./routes/wizard/wizard.tsx"),
] satisfies RouteConfig;
