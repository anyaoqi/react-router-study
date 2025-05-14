import { Link } from "react-router";
import type { Route } from "./+types/product.tsx";

// 客户端加载数据
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
  data.myname = "jj";
  return data;
}

// 服务器端加载数据
export async function loader({ params }: Route.LoaderArgs) {
  const pid = params.pid;
  console.log("服务端请求：" + pid + "号产品");

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + pid);
  const data = await res.json();
  return data;
}

// 在页面中设置 clientLoader.hydrate = true as const 可以在服务端请加载时强制客户端也加载。
clientLoader.hydrate = true as const; // `as const` for type inference

// 数据加载完成前显示的内容
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  return (
    <div>
      <Link to="/product/2">Product 2</Link>
      <Link to="/product/3">Product 3</Link>
      <h1>ID：{product.id}</h1>
      <h2>标题：{product.title}</h2>
      <h2>标题：{product.myname}</h2>
      <p>内容：{product.body}</p>
    </div>
  );
}
