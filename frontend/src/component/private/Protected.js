import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { isAuth } from "../../action/authAction";
import { useLocation } from 'react-router-dom';

const Protected = ({ history }) => {
  const location = useLocation();

  useEffect(() => {
    if (!isAuth()) {
      history.push("/signin");
    } else if (isAuth().role !== 1) {
      if (location.pathname) history.push(location.pathname);
      else history.push("/");
    }
  }, []);
  return <div></div>;
};

export default withRouter(Protected);
