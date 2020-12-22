import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signup" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
