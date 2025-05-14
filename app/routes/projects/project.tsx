import { useParams } from "react-router";

export default function Project() {
  const params = useParams();
  const pid = params.pid;

  console.log("路由参数:", params);
  console.log("项目ID:", pid);

  return (
    <div>
      <h1>Project</h1>
      <p>项目ID: {pid}</p>
    </div>
  );
}
