import {
  Form,
  isRouteErrorResponse,
  useRouteError,
  useMatches,
} from "react-router";
import type { Route } from "./+types/home.tsx";

/**
 * 首页组件
 * @param {Object} props - 组件属性
 * @param {Object} props.loaderData - 加载的数据
 * @returns {JSX.Element} 返回首页UI
 */
export default function Home({ loaderData }: Route.ComponentProps) {
  return <div>Home</div>;
}
