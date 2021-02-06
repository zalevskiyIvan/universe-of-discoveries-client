import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getEventT,
  getShortProjectT,
  getTaskT,
} from "../../Reducers/addNewPostReducer";
import style from "./Menu.module.css";
const Menu = () => {
  const history = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();

  const events = () => {
    dispatch(getEventT(1));
    history.push(`/${params.subject}/events`);
  };
  const links = () => {
    history.push(`/${params.subject}/links`);
  };
  const projects = () => {
    dispatch(getShortProjectT(1));
    history.push(`/${params.subject}/project`);
  };
  const tasks = () => {
    dispatch(getTaskT(1));
    history.push(`/${params.subject}/tasks`);
  };
  // const about = () => {
  //   history.push(`/${params.subject}/about`);
  // };
  const subject = () => {
    history.push(`/menu`);
  };

  return (
    <div style={{ marginTop: 100 }}>
      <ul className={style.ul}>
        <li className={style.li}>
          <span onClick={projects} className={style.a}>
            Проекты
          </span>
        </li>
        <li className={style.li}>
          <span onClick={events} className={style.a}>
            Мероприятия
          </span>
        </li>
        <li className={style.li}>
          <span onClick={tasks} className={style.a}>
            Задания
          </span>
        </li>
        {/* <li className={style.li}>
          <span onClick={about} className={style.a}>
            О нас
          </span>
        </li> */}
        <li className={style.li}>
          <span onClick={links} className={style.a}>
            Полезные ссылки
          </span>
        </li>
        <li className={style.li}>
          <span onClick={subject} className={style.a}>
            выбор предмета
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
