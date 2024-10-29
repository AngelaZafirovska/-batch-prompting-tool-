import React from "react";
import { Route, Switch } from "react-router-dom";
import PromptForm from "./PromptForm";
// import AdminPromptForm from "./AdminPromptForm";
import ManagementWindow from "./ManagementWindow";
import AdminFetch from "./AdminFetch";
import FetchResults from "./FetchResults";

// import FetchResults from "./FetchResults";

const index = () => {
  return (
    <Switch>
      <Route path="/user" exact component={PromptForm} />
      {/* <Route path="/user/adminPromptForm" component={AdminPromptForm} /> */}
      <Route path="/user/AdminFetch" component={AdminFetch} />
      <Route path="/user/ManagementWindow" component={ManagementWindow} />
      <Route path="/user/FetchResult" component={FetchResults} />
    </Switch>
  );
};

export default index;
