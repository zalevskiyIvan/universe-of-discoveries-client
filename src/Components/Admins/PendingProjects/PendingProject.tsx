import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import PostsRender from "../../PostsRender/PostsRender";
import style from "./PendingProjects.module.css";

export default function PendingProject() {
  return (
    <div style={{ marginTop: 20 }}>
      <p className={style.helper}>
        Нажмите <CheckOutlined /> чтобы разрешить добавление проекта, и
        <DeleteOutlined /> - чтобы удалить.
      </p>
      <div>
        <PostsRender pending={true} type="projects" />
      </div>
    </div>
  );
}
