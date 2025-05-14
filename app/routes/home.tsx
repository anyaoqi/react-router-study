import { Link } from "react-router";
export default function Home() {
  return (
    <div>
      Home|
      <Link to="/product/1">Product 1</Link>
      <a href="/product/2">Procut 2</a>
    </div>
  );
}
