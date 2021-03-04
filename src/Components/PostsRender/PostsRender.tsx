import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getEventT,
  getTaskT,
  getTaskWithFilterT,
  getShortProjectWithFilterT,
  getEventsWithFilterT,
  deleteEventT,
  deleteProjectT,
  deleteTaskT,
  allowProjectT,
  getPendingProjectT,
  getShortProjectT,
  actions,
  getPendingProjectWithFilterT,
  editPostT,
} from "../../Reducers/addNewPostReducer";
import style from "./PostsRender.module.css";
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  CheckOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu } from "antd";
import { editPostType, re_auth_code } from "../../Common/Common";

type propsType = {
  type: string;
  pending: boolean;
};

const PostsRender: React.FC<propsType> = (props) => {
  const state = useSelector((state: any) => {
    switch (props.type) {
      case "events":
        return state.addPostReducer.events;
      case "tasks":
        return state.addPostReducer.tasks;
      case "projects":
        return state.addPostReducer.shortProjects;
    }
  });
  const statusCode = useSelector(
    (state: any) => state.addPostReducer.statusCode
  );
  const totalPostCount = useSelector(
    (state: any) => state.addPostReducer.totalCount
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const openProject = (id: string) => {
    if (history.location.pathname === `/${localStorage.subject}/project`) {
      history.push(`/${localStorage.subject}/project/${id}`);
    }
  };
  const re_authorization = () => {
    if (statusCode === re_auth_code) {
      localStorage.clear();
      history.push("/");
    }
  };
  const [page, setPage] = useState(1);

  const forward = () => {
    setPage(page + 1);
  };
  const back = () => {
    if (page !== 1) setPage(page - 1);
  };
  const pageProject = () => {
    if (props.pending) dispatch(getPendingProjectT(page));
    if (!props.pending) dispatch(getShortProjectT(page));
  };
  useEffect(() => {
    switch (props.type) {
      case "events":
        dispatch(getEventT(page));
        break;
      case "tasks":
        dispatch(getTaskT(page));
        break;
      case "projects":
        pageProject();
        break;
    }
    return () => {
      dispatch(actions.clear());
    };
  }, [page]);

  const openAddPost = () => {
    const subject = localStorage.subject;
    if (props.type === "projects") history.push(`/${subject}/create-project`);
    else history.push(`/${subject}/${props.type}/create`);
  };

  const [filterMod, setFilterMod] = useState(false);

  const addFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      switch (props.type) {
        case "tasks":
          dispatch(getTaskWithFilterT(e.target.value));
          break;
        case "events":
          dispatch(getEventsWithFilterT(e.target.value));
          break;
        case "projects":
          if (props.pending) {
            dispatch(getPendingProjectWithFilterT(e.target.value));
          } else dispatch(getShortProjectWithFilterT(e.target.value));
          break;
      }
      setFilterMod(true);
    } else
      switch (props.type) {
        case "events":
          dispatch(getEventT(page));
          break;
        case "tasks":
          dispatch(getTaskT(page));
          break;
        case "projects":
          pageProject();
          break;
      }
    setFilterMod(false);
  };
  const deleteElement = (id: string) => {
    switch (props.type) {
      case "events":
        dispatch(deleteEventT(id));
        re_authorization();

        break;
      case "tasks":
        dispatch(deleteTaskT(id));
        re_authorization();
        break;
      case "projects":
        dispatch(deleteProjectT(id));
        re_authorization();
        break;
    }
  };

  const allowProject = (id: string) => {
    dispatch(allowProjectT(id));
    dispatch(actions.deleteProjectAC(id));
  };

  const [editMode, setEditMode] = useState(false);
  const [editingPostID, setEditingPostID] = useState("");
  const editElement = (id: string) => {
    setEditMode(true);
    setEditingPostID(id);
  };

  const editPost = (v: editPostType, id: string) => {
    v.id = id;
    dispatch(editPostT(v, props.type));
    setEditMode(false);
  };
  const token = localStorage.getItem("auth");
  return (
    <div>
      {(token || props.type === "projects") && (
        <Button className={style.createProject} onClick={openAddPost}>
          <PlusOutlined />
        </Button>
      )}

      <Input
        className={style.filter}
        onChange={(e) => addFilter(e)}
        suffix={<SearchOutlined />}
        placeholder="искать"
      />
      <div className={style.pagination}>
        {page !== 1 && !filterMod && (
          <LeftOutlined
            onClick={back}
            className={style.leftButton}
            style={{ color: "white", fontSize: 30 }}
          />
        )}
        {totalPostCount / 4 !== 1 && state.length == 4 && !filterMod && (
          <RightOutlined
            onClick={forward}
            className={style.rightButton}
            style={{ color: "white", fontSize: 30 }}
          />
        )}
      </div>
      {state.map((item: any) => {
        const menu = (
          <Menu style={{ width: 200 }}>
            <Menu.Item>
              <Button
                style={{ border: "none" }}
                onClick={() => editElement(item._id)}
              >
                Редактировать
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                style={{ border: "none" }}
                onClick={() => deleteElement(item._id)}
              >
                Удалить
              </Button>
            </Menu.Item>
            {props.pending && (
              <Menu.Item>
                <Button
                  style={{ border: "none" }}
                  onClick={() => allowProject(item._id)}
                >
                  Разрешить
                </Button>
              </Menu.Item>
            )}
          </Menu>
        );
        return (
          <div className={style.eventContainer} key={item._id}>
            <Form onFinish={(v) => editPost(v, item._id)}>
              {editMode && editingPostID === item._id ? (
                <Form.Item name="date">
                  <Input defaultValue={item.date} />
                </Form.Item>
              ) : (
                <h2 style={{ color: "black", marginLeft: 40 }}>{item.date}</h2>
              )}
              <div className={style.controllButton}>
                {localStorage.auth && !editMode && (
                  <div className={style.dots}>
                    <Dropdown placement="bottomRight" arrow overlay={menu}>
                      <Button
                        type="text"
                        icon={<EllipsisOutlined style={{ fontSize: 30 }} />}
                      ></Button>
                    </Dropdown>
                  </div>
                )}
              </div>
              <div
                onClick={() => openProject(item._id)}
                className={style.headerContainer}
              >
                {editMode && editingPostID === item._id ? (
                  <Form.Item name="header" className={style.header}>
                    <Input defaultValue={item.header} />
                  </Form.Item>
                ) : (
                  <p className={style.header}>{item.header}</p>
                )}
              </div>
              {item.img && <img src={item.img} />}
              <div>
                {props.type === "projects" ? (
                  editMode && editingPostID === item._id ? (
                    <Form.Item name="shortDescription">
                      <Input defaultValue={item.shortDescription} />
                    </Form.Item>
                  ) : (
                    <p className={style.body}>{item.shortDescription}</p>
                  )
                ) : editMode && editingPostID === item._id ? (
                  <Form.Item name="body">
                    <Input defaultValue={item.body} />
                  </Form.Item>
                ) : (
                  <p className={style.body}>{item.body}</p>
                )}
              </div>
              {localStorage.auth && editMode && editingPostID === item._id && (
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
      <div className={style.pagination}>
        {page !== 1 && !filterMod && state.length !== 1 && (
          <LeftOutlined
            onClick={back}
            className={style.leftButton}
            style={{ color: "white", fontSize: 30 }}
          />
        )}
        {totalPostCount / 4 !== 1 && state.length == 4 && !filterMod && (
          <RightOutlined
            onClick={forward}
            className={style.rightButton}
            style={{ color: "white", fontSize: 30 }}
          />
        )}
      </div>
    </div>
  );
};
export default PostsRender;
