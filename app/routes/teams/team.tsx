import { useParams } from "react-router";

export default function Team() {
  const params = useParams();
  const teamId = params.teamId;

  console.log("路由参数:", params);
  console.log("项目ID:", teamId);

  return (
    <div>
      <p>团队Id: {teamId}</p>
    </div>
  );
}
