import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { chairsCount, subjectType } from "../../Common/Common";
import { useTypedSelector } from "../../Common/hooks";
import { actions } from "../../Reducers/addNewPostReducer";
import { getChairT } from "../../Reducers/cheirsReducer";
import style from "./StartMenu.module.css";

const BigPaper = () => {
  const state = useTypedSelector((state) => state.chairReducer.chair);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const goNextPage = () => {
    if (page < chairsCount) setPage(page + 1);
    dispatch(getChairT(page));
    dispatch(actions.clear());
  };
  const goBack = () => {
    if (page > 1) setPage(page - 1);
    dispatch(getChairT(page));

    dispatch(actions.clear());
  };
  return (
    <div className={style.BigPaper}>
      {state?.subjects && (
        <div>
          <h2>{state?.title}</h2>
          <div className={style.subjects}>
            <ul>
              {state?.subjects.map((item: subjectType) => (
                <Link to={item.url}>
                  <li>{item.subject}</li>
                </Link>
              ))}
            </ul>
          </div>
          <p className={style.teatchers}>
            <h3>Учителя:</h3>
            {state?.teachers.map((teacher: string) => {
              return <span>{teacher}; </span>;
            })}
          </p>
          {page > 1 && (
            <LeftCircleOutlined onClick={goBack} className={style.back} />
          )}
          {page < chairsCount && (
            <RightCircleOutlined
              onClick={goNextPage}
              className={style.forward}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default function StartScreen() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getChairT(page));
  }, [page]);

  return (
    <div>
      <div className={style.smallPaper1} />
      <BigPaper />
      <div className={style.smallPaper2} />
      <div className={style.smallPaper3} />
      <div className={style.smallPaper4} />
      <div className={style.smallPaper5} />
    </div>
  );
}
