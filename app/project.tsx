import type { Route } from "./+types/project";
import { Form, useSubmit, useFetcher } from "react-router";

/**
 * 1. 客户端提交表单 (Client-side Form Submission)
 *
 * 客户端提交表单是在浏览器端处理表单提交的过程，数据处理逻辑在客户端执行。
 * 适用于不需要服务器端验证或处理的场景，可以提供更快的用户响应体验。
 */
// export async function clientAction({ request }: Route.ClientActionArgs) {
//   // 从请求中获取表单数据
//   let formData = await request.formData();
//   let pid = formData.get("pid");
//   console.log("客户端提交：", pid);
//
//   // 使用获取的数据进行API调用
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${pid}`);
//   const project = await res.json();
//   return project;
// }

/**
 * 2. 服务端提交表单 (Server-side Form Submission)
 *
 * 服务端提交表单是将表单数据发送到服务器进行处理的方式。
 * 在React Router中，通过action函数处理表单提交，这个函数在服务器端执行。
 * 适用于需要服务器端验证、数据处理或安全性要求高的场景。
 */
export async function action({ request }: Route.ClientActionArgs) {
  // 从请求中获取表单数据
  let formData = await request.formData();
  let pid = formData.get("pid");
  console.log("服务端提交：", pid);

  // 使用获取的数据进行API调用
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${pid}`);
  const project = await res.json();
  return project;
}

export default function Product({ actionData }: Route.ComponentProps) {
  /**
   * 3.2 useSubmit钩子 - 编程式表单提交
   *
   * useSubmit钩子提供了以编程方式提交表单的能力，返回一个submit函数。
   * 当调用submit函数时，会触发表单提交并调用相应的action函数。
   * 优点：可以在提交前进行数据处理或验证，更灵活地控制提交过程。
   */
  const submit = useSubmit();

  /**
   * 3.3 useFetcher钩子 - 后台数据交互
   *
   * useFetcher用于在不导航的情况下与路由action和loader交互。
   * 适用于后台提交数据或加载数据的场景，不会触发页面导航。
   * 提供了state属性用于跟踪交互状态（idle, loading, submitting）。
   */
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  /**
   * 自定义提交处理函数
   * 结合useSubmit钩子实现自定义表单提交逻辑
   */
  async function handleSubmit() {
    // 获取表单数据
    let pidInput = document.getElementById("pid") as HTMLInputElement;
    let pid = pidInput.value;

    // 在提交前进行数据处理
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${pid}`
    );
    const project = await res.json();

    // 使用useSubmit提交数据到指定action
    submit({ project }, { action: "/projectDetail/2", method: "post" });
  }

  return (
    <div>
      <h1>Product</h1>

      {/*
       * 3.1.1 基本Form表单提交
       * 最简单的表单提交方式，使用当前路由的action处理提交
       */}
      <Form method="post">
        <input className="border p-1 mr-1" type="number" name="pid" />
        <button type="submit">Submit</button>
      </Form>
      {/* {actionData ? <p>{actionData.title} updated</p> : null} */}
      <hr />

      {/*
       * 3.1.2 指定action的Form表单提交
       *
       * 通过设置action属性，可以将表单数据提交到指定的路由处理。
       * method属性指定了HTTP请求方法（get或post）。
       */}
      <Form method="post" action="/projectDetail/2">
        <input className="border p-1 mr-1" type="number" name="pid" />
        <button type="submit">Submit</button>
      </Form>
      <hr />

      {/*
       * 3.1.3 自定义提交处理的Form
       *
       * 通过onSubmit属性绑定自定义处理函数，可以在提交前进行数据处理。
       * 结合useSubmit钩子实现更复杂的提交逻辑。
       */}
      <Form onSubmit={handleSubmit}>
        <input className="border p-1 mr-1" type="number" id="pid" name="pid" />
        <button type="submit">Submit</button>
      </Form>
      <hr />

      {/*
       * 3.3.1 fetcher.Form - 后台表单提交
       *
       * fetcher.Form允许在不导航的情况下提交表单数据。
       * 适用于需要在当前页面保持的同时进行数据交互的场景。
       * 可以通过fetcher.state跟踪提交状态，实现更好的用户体验。
       */}
      <fetcher.Form method="post" action="/projectDetail/2">
        <input className="border p-1 mr-1" type="text" name="title" />
        <button type="submit">{busy ? "Saving..." : "Save"}</button>
      </fetcher.Form>
    </div>
  );
}
