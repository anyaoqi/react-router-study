import { Outlet } from "react-router";

export default function MarketingLayout() {
  return (
    <div>
      <h1>这是Layout布局</h1>
      <Outlet />
    </div>
  );
}
