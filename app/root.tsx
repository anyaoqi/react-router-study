import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

/**
 * 定义页面需要预加载的资源链接
 * @returns {Array} 返回一个包含资源链接配置的数组
 */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/**
 * 定义页面的SEO元信息
 * @returns {Array} 返回一个包含SEO元信息的数组
 */
export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

/**
 * 基础页面布局组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 返回页面布局结构
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * 应用主组件
 * @returns {JSX.Element} 返回路由出口组件
 */
export default function App() {
  return <Outlet />;
}

/**
 * 错误边界处理组件
 * @param {Object} props - 组件属性
 * @param {Error|RouteErrorResponse} props.error - 捕获的错误对象
 * @returns {JSX.Element} 返回错误展示UI
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

/**
 * 决定路由是否需要重新验证
 * @param {ShouldRevalidateFunctionArgs} arg - 路由验证参数
 * @returns {boolean} 返回是否需要重新验证
 */
export function shouldRevalidate(arg: ShouldRevalidateFunctionArgs) {
  return true;
}
