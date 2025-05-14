import {
  Form,
  isRouteErrorResponse,
  useRouteError,
  useMatches,
} from "react-router";
import type { Route } from "./+types/home.tsx";

/**
 * 服务端数据加载函数
 * @returns {Promise<Object>} 返回包含服务端数据的Promise对象
 */
export async function loader() {
  return { message: "来自服务器的数据" };
}

/**
 * 客户端数据加载函数
 * @returns {Promise<Object>} 返回包含客户端数据的Promise对象
 */
export async function clientLoader() {
  return { message: "来自客户端的数据" };
}

/**
 * 服务端数据提交函数
 * @param {Object} params - 参数对象
 * @param {Request} params.request - 请求对象
 * @returns {Promise<Object>} 返回操作结果的Promise对象
 */
export async function action({ request }: Route.ActionArgs) {
  return { ok: true };
}

/**
 * 客户端数据提交函数
 * @param {Object} params - 参数对象
 * @param {Request} params.request - 请求对象
 * @returns {Promise<Object>} 返回操作结果的Promise对象
 */
export async function clientAction({ request }: Route.ActionArgs) {
  return { ok: true };
}

/**
 * 路由错误边界处理组件
 * @returns {JSX.Element} 返回错误展示UI
 */
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

/**
 * 路由页面加载完成前的占位组件
 * @returns {JSX.Element} 返回加载中的UI
 */
export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

/**
 * 定义页面头部信息
 * @returns {Object} 返回包含自定义HTTP头的对象
 */
export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

/**
 * 路由handle对象，用于在路由间传递自定义数据
 * 可以被父路由或布局组件通过useMatches()访问
 * 示例：
 * const matches = useMatches();
 * const handle = matches.find(match => match.id === 'home')?.handle;
 */
export const handle = {
  its: "all yours",
};

/**
 * 首页组件
 * @param {Object} props - 组件属性
 * @param {Object} props.loaderData - 加载的数据
 * @returns {JSX.Element} 返回首页UI
 */
export default function Home({ loaderData }: Route.ComponentProps) {
  console.log("loaderData", loaderData);
  const matches = useMatches();
  console.log("matches", matches);

  return <div>Home</div>;
}
