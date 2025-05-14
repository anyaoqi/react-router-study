import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <h1>这是Project Layout布局</h1>
      <Outlet />
    </div>
  );
}
