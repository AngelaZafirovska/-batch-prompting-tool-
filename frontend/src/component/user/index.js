import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PromptForm from "./PromptForm";
import AdminPromptForm from "./AdminPromptForm";
import ManagementWindow from "./ManagementWindow";
import AdminFetch from "./AdminFetch";

// import FetchResults from "./FetchResults";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user" exact component={PromptForm} />
        <Route path="/adminPromptForm" component={AdminPromptForm} />
        <Route path="/ManagementWindow" component={ManagementWindow} />
        <Route path="/AdminFetch" component={AdminFetch} />
      </Switch>
    </Router>
  );
};

export default index;
