import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTypedSelector } from "../../Common/hooks";
import { paramsType } from "../../Common/Common";
import style from "./PageMenu.module.css";

export default function PostTypeMenu() {
  const history = useHistory();
  const params: paramsType = useParams();
  const isAdmin = useTypedSelector((state) => state.autorizetReducer.isAdmin);

  const eventsHistory = () => {
    history.push(`/${params.subject}/events`);
  };

  const projectHistory = () => {
    history.push(`/${params.subject}/project`);
  };
  const tasksHistory = () => {
    history.push(`/${params.subject}/tasks`);
  };
  const adminsHistory = () => {
    if (localStorage.auth) history.push(`/${params.subject}/admins`);
  };
  return (
    <div>
      {/* <div className={style.cards}> */}
      <div className={style.card}>
        <h1 onClick={eventsHistory}>Мероприятия</h1>
      </div>

      <div className={style.card}>
        <h1 onClick={tasksHistory}>Задания</h1>
      </div>
      <div className={style.card}>
        <h1 onClick={projectHistory}>Проекты</h1>
      </div>
      {/* {isAdmin && (
        <div className={style.card}>
          <h1 onClick={adminsHistory}>Для учителя</h1>
        </div>
      )} */}
      {/* </div> */}
      <div className={style.screen}>
        <div className={style.main}>
          <div className={style.smallPaper} />
          <div className={style.smallPaper} />
          <div className={style.smallPaper} />
          <div className={style.smallPaper} />
          <div className={style.smallPaper} />
          <div className={style.smallPaper} />
        </div>
      </div>
    </div>
  );
}
