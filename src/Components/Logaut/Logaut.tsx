import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { actions } from "../../Reducers/autorizetReducer";

const Logaut = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  if (location.pathname === "/") return null;

  const logaut = () => {
    localStorage.clear();
    dispatch(actions.setIsAdmin(false));
    history.push("");
  };
  return (
    <Button style={{ position: "fixed", zIndex: 1 }} onClick={logaut}>
      Выйти
    </Button>
  );
};
export default Logaut;
