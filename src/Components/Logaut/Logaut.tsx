import { Button } from "antd";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { actions } from "../../Reducers/addNewPostReducer";

const Logaut = () => {
  const location = useLocation();
  const history = useHistory();
  if (location.pathname === "/") return null;

  const logaut = () => {
    localStorage.clear();
    history.push("");
    window.location.reload(true);
  };
  return <Button onClick={logaut}>Выйти</Button>;
};
export default Logaut;
