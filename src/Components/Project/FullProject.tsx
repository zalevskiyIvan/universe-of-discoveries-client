import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  actions,
  getProjectT,
  projectType,
} from "../../Reducers/addNewPostReducer";
import style from "./Projects.module.css";
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

  return (
    <div>
      {state.map((item: projectType) => {
        return (
          <div className={style.fullProject}>
            <div className={style.header}>
              <h1 style={{ fontSize: 50 }}>{item.header}</h1>
            </div>
            <div className={style.members}>
              <h2 className={style.headers}>Участники проекта:</h2>
              <ul>
                {item.members.map((item: any) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
            <div className={style.purpose}>
              <h2 className={style.headers}>Цель проекта:</h2>
              <p>{item.purpose}</p>
            </div>
            <div className={style.tasks}>
              <h2 className={style.headers}>Задачи проекта:</h2>
              <ul>
                {item.tasks.map((item: any) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
            <div className={style.relevance}>
              <h2 className={style.headers}>Актуальность проекта:</h2>
              <p>{item.relevance}</p>
            </div>
            <div className={style.results}>
              <h2 className={style.headers}>Результаты:</h2>
              <p>{item.results}</p>
            </div>
            <div className={style.conclusions}>
              <h2 className={style.headers}>Выводы:</h2>
              <p>{item.conclusions}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FullProject;
