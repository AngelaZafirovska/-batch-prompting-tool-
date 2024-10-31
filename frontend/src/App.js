import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./component/Header";
import Footer from "./component/Footer";
import SignUP from "./pages/SignUp";
import Signin from "./pages/SignIn";
import HomeAdmin from "./component/admin/index";
import HomeUser from "./component/user/index";
import Protected from "./component/private/Protected";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Protected />
          <Switch>
            <Route path="/signup" component={SignUP} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/admin" component={HomeAdmin} exact />
            <Route path="/user" component={HomeUser} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
