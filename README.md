# React Router 学习笔记

## 一、路由

### 1. 路由配置基础

React Router 通过 `app/routes.ts` 文件配置路由。每个路由需要两个关键部分：URL 匹配模式和指向路由模块的文件路径。

```tsx
// 从我们的routes.ts文件
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // 基础路由示例
  route("about", "./routes/about.tsx"),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
```

### 2. 不同类型的路由

#### 索引路由 (Index Routes)

索引路由在父路由的 URL 下渲染，作为默认子路由：

```tsx
// 定义首页
index("./routes/home.tsx"),
```

这个路由会在应用根路径 `/` 下渲染，相当于网站首页。

#### 嵌套路由 (Nested Routes)

路由可以嵌套在父路由内部：

```tsx
// 嵌套路由示例
route("setting", "./routes/setting/setting.tsx", [
  index("./routes/setting/index.tsx"),
  route("product", "./routes/setting/product.tsx"),
  route("user", "./routes/setting/user.tsx"),
]),
```

这样会创建 `/setting`、`/setting/product` 和 `/setting/user` 三个 URL 路径。子路由通过父组件中的 `<Outlet/>` 组件进行渲染。

#### 布局路由 (Layout Routes)

布局路由使用 `layout` 函数创建，它为子路由提供共享布局，但不添加 URL 路径段：

```tsx
// 布局路由示例
layout("./routes/layout.tsx", [
  index("./routes/marketing/home.tsx"),
  route("contact", "./routes/marketing/contact.tsx"),
]),
```

`marketing/home.tsx` 和 `contact.tsx` 会渲染在 `layout.tsx` 的 `<Outlet/>` 中，URL 分别为 `/` 和 `/contact`。

#### 路由前缀 (Route Prefixes)

使用 `prefix` 函数可以为一组路由添加路径前缀：

```tsx
// 路由前缀示例
...prefix("projects", [
  index("./routes/projects/home.tsx"),
  layout("./routes/projects/project-layout.tsx", [
    route(":pid", "./routes/projects/project.tsx"),
    route(":pid/edit", "./routes/projects/edit-project.tsx"),
  ]),
]),
```

这样会创建以下路径：

- `/projects` (索引路由)
- `/projects/:pid` (动态项目页面)
- `/projects/:pid/edit` (项目编辑页面)

#### 动态路由段 (Dynamic Segments)

以 `:` 开头的路径段成为"动态段"，会从 URL 中解析并作为 `params` 提供给路由组件：

```tsx
// 动态路由示例
route("teams/:teamId", "./routes/teams/team.tsx"),
```

这样在组件中可以通过 `params.teamId` 访问 URL 中的团队 ID。

#### 可选路由段 (Optional Segments)

通过在段末尾添加 `?` 可以使路由段变为可选：

```tsx
// 可选路由段示例
route(":lang?/categories", "./routes/categories/categories.tsx"),
```

这样，无论是 `/categories` 还是 `/en/categories` 都能匹配这个路由。

#### 通配符路由 (Splats)

路径模式以 `/*` 结尾的路由会匹配后面的任何字符，包括其他 `/` 字符：

```tsx
// 通配符路由示例
route("files/*", "./routes/files/files.tsx"),
```

在组件中可以通过 `params["*"]` 访问剩余的 URL 部分。

#### 组件路由 (Component Routes)

还可以在组件内部使用 `<Routes>` 和 `<Route>` 组件创建内部路由：

```tsx
// 我们的routes.ts中的组件路由定义
route("wizard/*", "./routes/wizard/wizard.tsx"),
```

在 `wizard.tsx` 组件中，我们使用嵌套的 Routes 来定义子路由：

```jsx
function Wizard() {
  return (
    <div>
      <h1>向导组件示例</h1>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
      </Routes>
    </div>
  );
}
```

> **注意：** 当使用组件路由时，父路由路径必须添加 `/*` 通配符，才能正确匹配更深层次的路径，否则会出现警告：
>
> ```
> You rendered descendant <Routes> (or called `useRoutes()`) at "/wizard" (under <Route path="wizard">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.
> ```

## 二、路由模块

### 1. 路由配置-route.ts

React Router 提供了多种方式来定义路由结构。在我们的项目中，使用了 `@react-router/dev/routes` 提供的配置方式：

```tsx
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
  ]),
] satisfies RouteConfig;
```

### 2. 数据加载-loader

React Router 支持服务端和客户端数据加载：

```tsx
// 服务端数据加载
export async function loader() {
  return { message: "来自服务器的数据" };
}

// 客户端数据加载
export async function clientLoader() {
  return { message: "来自客户端的数据" };
}
```

### 3. 数据提交-action

支持服务端和客户端数据提交：

```tsx
// 服务端数据提交
export async function action({ request }: Route.ActionArgs) {
  return { ok: true };
}

// 客户端数据提交
export async function clientAction({ request }: Route.ActionArgs) {
  return { ok: true };
}
```

### 4. 错误处理-ErrorBoundary

React Router 提供了 ErrorBoundary 来处理路由错误：

```tsx
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
```

### 5. 加载状态-HydrateFallback

使用 HydrateFallback 定义加载中的 UI：

```tsx
export function HydrateFallback() {
  return <p>Loading Game...</p>;
}
```

### 6. 路由间数据传递-Handle

使用 handle 对象在路由间传递数据：

- 路由 handle 对象，用于在路由间传递自定义数据
- 可以被父路由或布局组件通过 useMatches() 访问

```tsx
export const handle = {
  its: "all yours",
};

// const matches = useMatches();
```

### 7. 页面元信息-Links、Meta

可以定义页面的 SEO 信息和预加载资源：

```tsx
import { Links, Meta } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
];

export function meta() {
  return [
    { title: "Very cool app" },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body></body>
    </html>
  );
}
```

## 三、渲染策略

React Router 中有三种渲染策略：

- 客户端渲染：Client Side Rendering
- 服务器端渲染：Server Side Rendering
- 静态预渲染：Static Pre-rendering

### 1. 客户端渲染

在 `react-router.config.ts` 文件中将设置 `ssr` 为 `false`，这个属性为是否启用服务端渲染。

```tsx
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false, // 是否启用服务端渲染
} satisfies Config;
```

> 💡 当为客户端渲染时 `loader`, `action`, `headers` 这些都是不可用的。

### 2. 服务端渲染

在 `react-router.config.ts` 文件中将设置 `ssr` 为 `true`，这个属性为是否启用服务端渲染。

```tsx
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
} satisfies Config;
```

### 3. 静态预渲染

有一些没有动态数据不需要接口的页面可以改为预渲染路由，会将这些页面生成为静态页面。例如关于我们页面、联系我们页面。

```tsx
import type { Config } from "@react-router/dev/config";

export default {
  // return a list of URLs to prerender at build time
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

## 四、数据加载

### 1. 服务端数据加载-loader

`loader` 函数用于服务端数据加载：

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const pid = params.pid;
  console.log("服务端请求：" + pid + "号产品");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + pid);
  return await res.json();
}
```

特点：

- 在服务器渲染(SSR)时执行，用于初始页面加载
- 数据会自动序列化并传递给组件
- 不会包含在客户端 bundle 中，可以安全使用服务器 API

### 2. 客户端数据加载-clientLoader

`clientLoader` 函数用于客户端数据加载：

```tsx
export async function clientLoader({
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const serverData = await serverLoader(); // 服务端加载返回的数据
  console.log("serverData", serverData);

  const pid = params.pid;
  console.log("客户端请求：" + pid + "号产品");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + pid);
  const data = await res.json();
  return data;
}
```

> 💡 `params` 是动态路由参数，`serverLoader` 是服务端加载函数，可以执行该函数获取服务端返回的数据。

特点：

- 在客户端导航时执行
- 适合需要从浏览器获取数据的场景
- 可以修改服务端返回的数据

### 3. 静态数据加载

在 `react-router.config.ts` 中配置动态路由预加载：

```tsx
import type { Config } from "@react-router/dev/config";

export default {
  async prerender() {
    let products = await readProductsFromCSVFile();
    return products.map((product) => `/products/${product.id}`);
  },
} satisfies Config;
```

### 4. 混合使用-使用两个加载器

- 首次进入或刷新页面：服务端加载：loader
- 点击 Link 链接跳转：客户端加载：clientLoader
- 点击 a 链接跳转：服务端加载：loader

> 💡 在页面中设置 `clientLoader.hydrate = true as const` 可以在服务端请加载时强制客户端也加载。
>
> - 首次进入或刷新页面：服务端加载 && 客户端加载
> - 点击 Link 链接跳转：客户端加载
> - 点击 a 链接跳转：服务端加载 && 客户端加载
> - 如果服务端和客户端同时执行时都有返回数据，会使用客户端的数据。
