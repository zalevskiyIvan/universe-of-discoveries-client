import React from "react";
import { useTypedSelector } from "../../Common/hooks";

const Admins = () => {
  const isAdmin = useTypedSelector((state) => state.autorizetReducer.isAdmin);

  if (isAdmin) {
    return <div></div>;
  }
};

export default Admins;
