import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";

import {
  actions,
  editFullProjectT,
  getProjectT,
  projectType,
} from "../../Reducers/addNewPostReducer";
import style from "./Projects.module.css";
import { editFullProjectType } from "../../Common/Common";
const FullProject = () => {
  const params: any = useParams();
  const state = useSelector((state: any) => state.addPostReducer.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectT(params.id));
    return () => {
      dispatch(actions.clear());
    };
  }, []);

  const [editMode, setEditMode] = useState(false);

  const editProject = (v: editFullProjectType, id: string) => {
    v.id = id;
    if (v.members) v.members = v.members.split(",");
    if (v.tasks) v.tasks = v.tasks.split(",");

    dispatch(editFullProjectT(v));
    setEditMode(false);
  };
  const startEditProject = () => {
    setEditMode(true);
  };
  return (
    <div>
      {state.map((item: projectType) => {
        return (
          <div>
            {!editMode && localStorage.auth && (
              <div
                style={{
                  color: "white",
                  fontSize: 40,
                  cursor: "pointer",
                  marginLeft: 156,
                }}
              >
                <EditOutlined onClick={startEditProject} />
              </div>
            )}
            <Form
              onFinish={(v) => editProject(v, item._id)}
              className={style.fullProject}
            >
              <div className={style.header}>
                {editMode && (
                  <Form.Item name="header">
                    <Input defaultValue={item.header} />
                  </Form.Item>
                )}

                {!editMode && <h1 style={{ fontSize: 50 }}>{item.header}</h1>}
              </div>
              <div className={style.members}>
                <h2 className={style.headers}>Участники проекта:</h2>
                {!editMode && (
                  <ul>
                    {item.members.map((item: any) => {
                      return <li>{item}</li>;
                    })}
                  </ul>
                )}
                {editMode && (
                  <Form.Item name="members">
                    <Input defaultValue={item.members} />
                  </Form.Item>
                )}
              </div>
              <div className={style.purpose}>
                <h2 className={style.headers}>Цель проекта:</h2>
                {editMode && (
                  <Form.Item name="purpose">
                    <Input defaultValue={item.purpose} />
                  </Form.Item>
                )}
                {!editMode && <p>{item.purpose}</p>}
              </div>
              <div className={style.tasks}>
                <h2 className={style.headers}>Задачи проекта:</h2>
                {!editMode && (
                  <ul>
                    {item.tasks.map((item: any) => {
                      return <li>{item}</li>;
                    })}
                  </ul>
                )}
                {editMode && (
                  <Form.Item name="tasks">
                    <Input defaultValue={item.tasks} />
                  </Form.Item>
                )}
              </div>
              <div className={style.relevance}>
                <h2 className={style.headers}>Актуальность проекта:</h2>
                {editMode && (
                  <Form.Item name="relevance">
                    <Input defaultValue={item.relevance} />
                  </Form.Item>
                )}
                {!editMode && <p>{item.relevance}</p>}
              </div>
              <div className={style.results}>
                <h2 className={style.headers}>Результаты:</h2>
                {editMode && (
                  <Form.Item name="results">
                    <Input defaultValue={item.results} />
                  </Form.Item>
                )}
                {!editMode && <p>{item.results}</p>}
              </div>
              <div className={style.conclusions}>
                <h2 className={style.headers}>Выводы:</h2>
                {editMode && (
                  <Form.Item name="conclusions">
                    <Input defaultValue={item.conclusions} />
                  </Form.Item>
                )}
                {!editMode && <p>{item.conclusions}</p>}
              </div>
              {editMode && (
                <Button
                  size="large"
                  icon={<CheckOutlined />}
                  htmlType="submit"
                />
              )}
            </Form>
          </div>
        );
      })}
    </div>
  );
};
export default FullProject;
