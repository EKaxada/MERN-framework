import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};

const Menu = withRouter(({ history }) => {
  <AppBar Position="static">
    <Toolbar>
      <Typography>
        Yogera
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(histroy, "/users")}>Users</Button>
        </Link>
      </Typography>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}> Sign Up </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}> Sign In </Button>
          </Link>
        </span>
      )}

      {auth.isAuthenticated() && (
        <span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => {
              auth.clearJWT(() => history.push("/"));
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>;
});

export default Menu;
