import { Button } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { actions } from "../../Reducers/addNewPostReducer";

const Logaut = () => {
  const location = useLocation();
  const history = useHistory();
  if (location.pathname === "/") return null;
  const logaut = () => {
    localStorage.clear();
    actions.clear();
    history.push("");
  };
  return <Button onClick={logaut}>Выйти</Button>;
};
export default Logaut;
