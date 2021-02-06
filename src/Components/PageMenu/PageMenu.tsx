import React from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./PageMenu.module.css";

const PageMenu = (props: any) => {
  const history = useHistory();
  const params: any = useParams();
  const eventsHistory = () => {
    history.push(`/${params.subject}/events`);
  };
  const linksHistory = () => {
    history.push(`/${params.subject}/links`);
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
  const connectionHistory = () => {
    history.push(`/${params.subject}/connection`);
  };

  return (
    <div className={style.main}>
      <div className={style.blocks}>
        <div className={style.activity} onClick={eventsHistory}>
          <h1 className={style.word}>Мероприятия</h1>
        </div>
        <div className={style.links} onClick={linksHistory}>
          <h1 className={style.word}>Ссылки</h1>
        </div>
        <div className={style.about}>
          <h1 className={style.word}>скоро</h1>
        </div>
        <div className={style.tasks} onClick={tasksHistory}>
          <h1 className={style.word}>Задания</h1>
        </div>
        <div className={style.projects} onClick={projectHistory}>
          <h1 className={style.word}>Проекты</h1>
        </div>
        {/* <div className={style.null1}><h1 className={style.word}></h1></div> */}
        <div className={style.connection} onClick={connectionHistory}>
          <h1 className={style.word}>скоро</h1>
        </div>
        {/* <div className={style.null2}><h1 className={style.word}></h1></div> */}
        <div className={style.admins} onClick={adminsHistory}>
          {localStorage.auth && <h1 className={style.word}>Админка</h1>}
        </div>
      </div>
    </div>
  );
};
export default PageMenu;
