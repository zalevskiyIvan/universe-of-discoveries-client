import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
  getShortProjectT,
  actions,
  editPostT,
  ReceivedPostType,
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
import { Button, Dropdown, Form, Input, Menu, Select } from "antd";
import {
  editPostType,
  paramsType,
  responseProject,
  re_auth_code,
} from "../../Common/Common";
import { useTypedSelector } from "../../Common/hooks";
import { Option } from "antd/lib/mentions";

type propsType = {
  type: string;
  pending: boolean;
};

const PostsRender: React.FC<propsType> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: paramsType = useParams();
  const subject = params.subject;
  const isAdmin = useTypedSelector((state) => state.autorizetReducer.isAdmin);

  let state = useTypedSelector((state: any) => {
    switch (props.type) {
      case "events":
        return state.addPostReducer.events;
      case "tasks":
        return state.addPostReducer.tasks;
      case "projects":
        return state.addPostReducer.shortProjects;
    }
  });
  const totalPostCount = useTypedSelector(
    (state) => state.addPostReducer.totalCount
  );

  const openProject = (id: string) => {
    if (history.location.pathname === `/${subject}/project`) {
      history.push(`/${subject}/project/${id}`);
    }
  };

  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
    dispatch(actions.clear());
  }, [props.type]);
  const forward = () => {
    setPage(page + 1);
  };
  const back = () => {
    if (page !== 1) setPage(page - 1);
  };
  const pageProject = () => {
    dispatch(getShortProjectT(page, subject));
  };

  const [klass, setKlass] = useState("common");

  useEffect(() => {
    switch (props.type) {
      case "events":
        dispatch(getEventT(page, subject, klass));
        break;
      case "tasks":
        dispatch(getTaskT(page, subject));
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
    if (props.type === "projects") history.push(`/${subject}/create-project`);
    else history.push(`/${subject}/${props.type}/create`);
  };

  const [filterMod, setFilterMod] = useState(false);

  const addFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      switch (props.type) {
        case "tasks":
          dispatch(getTaskWithFilterT(e.target.value, subject));
          break;
        case "events":
          dispatch(getEventsWithFilterT(e.target.value, subject, klass));
          break;
        case "projects":
          dispatch(getShortProjectWithFilterT(e.target.value, subject));
          break;
      }
      setFilterMod(true);
    } else
      switch (props.type) {
        case "events":
          dispatch(getEventT(page, subject, klass));
          break;
        case "tasks":
          dispatch(getTaskT(page, subject));
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
        break;
      case "tasks":
        dispatch(deleteTaskT(id));
        break;
      case "projects":
        dispatch(deleteProjectT(id));
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
  const selectKlass = (e: string) => {
    setKlass(e);
    dispatch(getEventT(page, subject, e));
  };
  if (!isAdmin && props.type === "projects") {
    state = state.filter((item: responseProject) => item.allowed === true);
  }

  return (
    <div className={style.main}>
      {(isAdmin || props.type === "projects") && (
        <Button className={style.createProject} onClick={openAddPost}>
          <PlusOutlined />
        </Button>
      )}
      <div>
        <Input
          className={style.filter}
          onChange={(e) => addFilter(e)}
          suffix={<SearchOutlined />}
          placeholder="искать"
        />
        <Select onChange={selectKlass} defaultValue="common">
          <Option value="5">5 класс</Option>
          <Option value="6">6 класс</Option>
          <Option value="7">7 класс</Option>
          <Option value="8">8 класс</Option>
          <Option value="9">9 класс</Option>
          <Option value="common">общее</Option>
        </Select>
      </div>

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
        debugger;
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
            {!item.allowed && (
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
                <h2 className={style.date}>{item.date}</h2>
              )}
              <div className={style.controllButton}>
                {isAdmin && !editMode && (
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
              {isAdmin && editMode && editingPostID === item._id && (
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
