import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import EditProfile from "./user/EditProfile"
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <PrivateROute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
