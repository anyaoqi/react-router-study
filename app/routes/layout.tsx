import { Outlet, Link } from "react-router";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |<Link to="/about">About</Link>|
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </div>
  );
}
