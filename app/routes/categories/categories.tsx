import { useParams } from "react-router";

export default function Categories() {
  const params = useParams();
  console.log(params.lang);

  return <div>categories</div>;
}
