import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventT,
  addTaskT,
  addUsefulLinkT,
} from "../../Reducers/addNewPostReducer";
import { Button, Divider, Form, Input } from "antd";
import style from "./CreatePost.module.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { paramsType } from "../../Common/Common";
import { useTypedSelector } from "../../Common/hooks";
//
export default function CreatePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: paramsType = useParams();
  const subject = params.subject;
  const location = useLocation();
  const postType = location.pathname.split("/")[2];
  const isAdmin = useTypedSelector((state) => state.autorizetReducer.isAdmin);

  const statusCode = useSelector(
    (state: any) => state.addPostReducer.statusCode
  );
  const re_authorization = (code: number) => {
    if (statusCode === code) {
      localStorage.clear();
      history.push("/");
    }
  };
  ////

  const add = (v: any) => {
    if (!v.date) v.date = new Date().toLocaleDateString();
    if (isAdmin) {
      switch (postType) {
        case "events":
          dispatch(
            addEventT(
              v.klass.toLowerCase(),
              v.header,
              v.body,
              v.img,
              v.date,
              subject
            )
          );
          re_authorization(403);
          break;
        case "tasks":
          dispatch(
            addTaskT(
              v.klass.toLowerCase(),
              v.header,
              v.body,
              v.img,
              v.date,
              subject
            )
          );
          re_authorization(403);
          break;
        case "links":
          if (!v.link || !v.description) break;
          dispatch(addUsefulLinkT(v.link, v.description));
          re_authorization(403);
          break;
      }
    } else alert("У вас нет прав");
  };

  if (isAdmin) {
    return (
      <div className={style.adder}>
        <Form onFinish={add}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
            name="klass"
          >
            <Input
              allowClear
              placeholder="Введите класс с буквой или просто цифру параллели"
            />
          </Form.Item>
          {postType === "links" && (
            <>
              <Form.Item name="link">
                <Input placeholder="вставьте ссылку" />
              </Form.Item>
              <Form.Item name="description">
                <Input placeholder="введите описание ссылку" />
              </Form.Item>
            </>
          )}
          {postType !== "links" && (
            <>
              <Form.Item
                rules={[{ required: true, message: "Введите текст названия" }]}
                name="header"
              >
                <Input placeholder="Введите название поста" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Введите текст поста" }]}
                name="body"
              >
                <Input.TextArea placeholder="Введите текст поста" />
              </Form.Item>
              <Form.Item name="img">
                <Input placeholder="Введите ссылку на картинку (не обязательно)" />
              </Form.Item>
              <Form.Item name="date">
                <Input placeholder="Введите дату (не обязательно)" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button htmlType="submit">Добавить пост</Button>
          </Form.Item>
          <Divider />
          <Form.Item>
            {statusCode === 201 && (
              <div>
                <h1 style={{ color: "red" }}>Пост добавлен!</h1>
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
