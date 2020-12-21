import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
      ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAunthenticated();

    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <redirect to="/signin" />;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={"Joined: " + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>
        </Typography>
      </Paper>
      {auth.isAunthenticated().user &&
        auth.isAunthenticated().user._id == user._id && (
          <ListItemSecondaryAction>
            <Link to={"/user/edit/" + user._id}>
              <IconButton aria-label="Edit" color="primary">
                <Edit />
              </IconButton>
            </Link>
            <DeleteUser userId={user._id} />
          </ListItemSecondaryAction>
        )}
    </div>
  );
}
