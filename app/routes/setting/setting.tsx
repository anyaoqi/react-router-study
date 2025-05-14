import { Outlet } from "react-router";

export default function SettingLayout() {
  return (
    <div>
      <h1>下面是设置相关模块</h1>
      <Outlet />
    </div>
  );
}
