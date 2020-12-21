import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowForward, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

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

//fetch and list all users from the database to the view
export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = newAbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.errorr) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className={classes.root} elevatioon={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}
