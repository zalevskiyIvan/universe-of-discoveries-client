import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  chairsCount,
  correct_password,
  subjectType,
} from "../../Common/Common";
import { useTypedSelector } from "../../Common/hooks";
import { actions } from "../../Reducers/addNewPostReducer";
import { getChairT } from "../../Reducers/cheirsReducer";
import style from "./StartMenu.module.css";
import { Button, Form, Input } from "antd";
import { getTokenT } from "../../Reducers/autorizetReducer";

const BigPaper = () => {
  const state = useTypedSelector((state) => state.chairReducer.chair);
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);

  const goNextPage = () => {
    setPage(page + 1);
    dispatch(actions.clear());
  };

  const goBack = () => {
    setPage(page - 1);
    dispatch(actions.clear());
  };

  useEffect(() => {
    dispatch(getChairT(page));
  }, [page]);
  const [teacherName, setTeacherName] = useState("");
  const logInTeacher = (teacher: string) => {
    setTeacherName(teacher);
  };
  const setPassword = ({ password }: any) => {
    if (password === correct_password) {
      dispatch(getTokenT(password));
      if (teacherName == "Мальцев В.А." || "Карташева Н.Е.")
        history.push(`/informatics`);
      if (teacherName == "Пальчикова Е.А.") history.push(`/physics`);
      if (
        teacherName == "Григорьева Е.О." ||
        teacherName == "Лысенина И.Р." ||
        teacherName == "Попова О.И." ||
        teacherName == "Акинфеева Г.С."
      )
        history.push(`/math`);
      if (
        teacherName == "Карпенко М.Е." ||
        teacherName == "Дружинина Т.В." ||
        teacherName == "Евтушевская С.А." ||
        teacherName == "Литвинова Л.И."
      )
        history.push(`/russian`);
      if (
        teacherName == "Серова Т.И." ||
        teacherName == "Седакова Г.Н." ||
        teacherName == "Доронина Н.В." ||
        teacherName == "Линник О.Г." ||
        teacherName == "Коршунова И.Ю."
      )
        history.push(`/english`);
      if (teacherName == "Дан Т.Ю.") history.push(`/history`);
      if (teacherName == "Платунова В.В.") history.push(`/chemistry`);
      if (teacherName == "Михайлова Е.И.") history.push(`/biology`);
      if (teacherName == "Карасева  М.А." || teacherName == "Шварц Н.П.")
        history.push(`/music`);
      if (teacherName == "Колпакова Ю.А." || teacherName == "Корнеева А.Д.")
        history.push(`/art`);
    }
  };
  return (
    <div className={style.BigPaper}>
      {state?.subjects && (
        <div>
          <h2 className={style.h2}>{state?.title}</h2>
          <div className={style.subjects}>
            {teacherName && (
              <div>
                <h3>Введите пароль:</h3>
                <Form onFinish={setPassword}>
                  <div className={style.form}>
                    <Form.Item name="password">
                      <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 1 }}
                        className={style.input}
                      />
                    </Form.Item>
                    <Button htmlType="submit">Войти</Button>
                  </div>
                </Form>
              </div>
            )}
            {!teacherName && (
              <ul className={style.ul}>
                {state?.subjects.map((item: subjectType) => (
                  <Link to={item.url}>
                    <li>{item.subject}</li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className={style.teachers}>
              <h3>Учителя:</h3>
              {state?.teachers.map((teacher: string) => {
                return (
                  <span
                    key={teacher}
                    style={{ cursor: "pointer" }}
                    onClick={() => logInTeacher(teacher)}
                  >
                    {teacher};
                  </span>
                );
              })}
            </p>
          </div>
          {!teacherName && (
            <div>
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
      )}
    </div>
  );
};

export default function StartScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChairT(1));
  }, []);

  return (
    <div className={style.main}>
      <div className={style.smallPaper1}>
        <h2>Чтобы войти как учитель нужно нажать на свое имя</h2>
      </div>
      <BigPaper />
      <div className={style.smallPaper2} />
      <div className={style.smallPaper3} />
      <div className={style.smallPaper4} />
      <div className={style.smallPaper5} />
    </div>
  );
}
