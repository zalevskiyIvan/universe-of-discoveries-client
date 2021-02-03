import React from "react";
import { Link } from "react-router-dom";
import style from "./Subject.module.css";
const SubjectMenu = () => {
  const technology = () => {
    localStorage.subject = "technology";
  };
  const informatic = () => {
    localStorage.subject = "informatics";
  };
  const rusLanguage = () => {
    localStorage.subject = "russian";
  };
  const engLanguage = () => {
    localStorage.subject = "english";
  };
  const library = () => {
    localStorage.subject = "libruary";
  };
  const art = () => {
    localStorage.subject = "art";
  };
  return (
    <div className={style.flexBody}>
      <div className={style.body}>
        <Link to="/technology">
          <div onClick={technology} className={style.cube}>
            <h1 className={style.text}>Технология</h1>
          </div>
        </Link>
        <Link to="/art">
          <div onClick={art} className={style.cube}>
            <h1 className={style.text}>Искусство</h1>
          </div>
        </Link>
        <Link to="/english" className={style.english}>
          <div onClick={engLanguage} className={style.cube}>
            <h1 className={style.text}>Английский язык</h1>
          </div>
        </Link>
        <Link to="/russian">
          <div onClick={rusLanguage} className={style.cube}>
            <h1 className={style.text}>Русский и литература</h1>
          </div>
        </Link>
        <Link to="/libruary">
          <div onClick={library} className={style.cube}>
            <h1 className={style.text}>Библиотека</h1>
          </div>
        </Link>
        <Link to="/informatics" className={style.inform}>
          <div onClick={informatic} className={style.cube}>
            <h1 className={style.text}>Информатика</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default SubjectMenu;
