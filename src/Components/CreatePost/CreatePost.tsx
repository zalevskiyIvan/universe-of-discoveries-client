import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEventT,
  addTaskT,
  addUsefulLinkT,
  arrType,
} from "../../Reducers/addNewPostReducer";
import { Button, Divider, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import style from "./CreatePost.module.css";
import { useLocation, useParams } from "react-router-dom";
//
export default function CreatePost() {
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state: any) => state.addPostReducer.statusCode
  );
  const re_authorization = (code: number) => {
    if (statusCode === code) {
      localStorage.clear();
      // history.push("/");
    }
  };
  ////
  const location = useLocation();
  const postType = location.pathname.split("/")[2];

  const add = (v: any) => {
    // arrType
    if (localStorage.auth) {
      switch (postType) {
        case "events":
          dispatch(addEventT(v.klass.toLowerCase(), v.header, v.body, v.img));
          re_authorization(205);
          break;
        case "tasks":
          dispatch(addTaskT(v.klass.toLowerCase(), v.header, v.body, v.img));
          re_authorization(205);
          break;
        case "links":
          if (!v.link || !v.description) break;
          dispatch(addUsefulLinkT(v.link, v.description));
          re_authorization(205);
          break;
      }
    } else alert("У вас нет прав");
  };
  // const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files);
  // };
  if (localStorage.auth) {
    return (
      <div className={style.adder}>
        <Form onFinish={add}>
          <Form.Item
            rules={[
              { required: true, message: "Введите номер и букву класса" },
            ]}
            name="klass"
          >
            <Input allowClear placeholder="Введите номер и букву класса" />
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
                <Input placeholder="Введите ссылку на картинку" />
              </Form.Item>
              {/* <Form.Item>
                <Input onChange={(e) => uploadFile(e)} type="file" />
              </Form.Item> */}
            </>
          )}
          <Form.Item>
            <Button htmlType="submit">Добавить пост</Button>
          </Form.Item>
          <Divider />
        </Form>
      </div>
    );
  }
}
