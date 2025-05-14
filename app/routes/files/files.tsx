import { useParams } from "react-router";

export default function Files() {
  const params = useParams();
  console.log(params["*"]);

  return <div>files</div>;
}
