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
} from "../../Reducers/addNewPostReducer";
import style from "./PostsRender.module.css";
import {
  RightOutlined,
  LeftOutlined,
  SearchOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";

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
  const dispatch = useDispatch();
  const history = useHistory();

  const openProject = (id: string) => {
    if (history.location.pathname === `/${localStorage.subject}/project`) {
      history.push(`/${localStorage.subject}/project/${id}`);
    }
  };

  const re_authorization = (code: number) => {
    if (statusCode === code) {
      localStorage.clear();
      // history.push("/");
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
        re_authorization(205);

        break;
      case "tasks":
        dispatch(deleteTaskT(id));
        re_authorization(205);
        break;
      case "projects":
        dispatch(deleteProjectT(id));
        re_authorization(205);
        break;
    }
  };
  const allowProject = (id: string) => {
    dispatch(allowProjectT(id));
    dispatch(actions.deleteProjectAC(id));
  };
  return (
    <div>
      {!props.pending && (
        <Button className={style.createProject} onClick={openAddPost}>
          {props.type === "projects" && <span>Создать проект</span>}
          {props.type === "tasks" && localStorage.auth && (
            <span>Новое задание</span>
          )}
          {props.type === "events" && localStorage.auth && (
            <span>Новое мероприятие</span>
          )}
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
        {state.length === 4 && !filterMod && (
          <RightOutlined
            onClick={forward}
            className={style.rightButton}
            style={{ color: "white", fontSize: 30 }}
          />
        )}
      </div>
      {state.map((item: any) => {
        return (
          <div className={style.eventContainer} key={item._id}>
            <h2 style={{ color: "black", marginLeft: 40 }}>{item.date}</h2>
            <div className={style.controllButton}>
              {localStorage.auth && (
                <DeleteOutlined
                  className={style.delete}
                  onClick={() => deleteElement(item._id)}
                />
              )}
              {props.pending && (
                <CheckOutlined onClick={() => allowProject(item._id)} />
              )}
            </div>
            <div
              onClick={() => openProject(item._id)}
              className={style.headerContainer}
            >
              <p className={style.header}>{item.header}</p>
            </div>
            {item.img && <img src={item.img} />}
            <div>
              {props.type === "projects" ? (
                <p className={style.body}>{item.shortDescription}</p>
              ) : (
                <p className={style.body}>{item.body}</p>
              )}
            </div>
          </div>
        );
      })}
      {state.length === 4 && (
        <div className={style.pagination}>
          <LeftOutlined
            onClick={back}
            className={style.leftButton}
            style={{ color: "white", fontSize: 30 }}
          />
          <RightOutlined
            onClick={forward}
            className={style.rightButton}
            style={{ color: "white", fontSize: 30 }}
          />
        </div>
      )}
    </div>
  );
};
export default PostsRender;
