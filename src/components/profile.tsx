import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import IClientUser from "../interfaces/IclientUser";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from '@material-ui/icons/StarBorder';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles({
  card: {
    maxWidth: 560,
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem'
  },
  media: {
    borderRadius: '50%',
    maxWidth: '200px',
    margin: '1rem auto'
  },
});

type UserType = {
	id: string,
	avatar: string,
	age: number,
	email: string,
	name: string,
	role: string, //'admin' | 'user';
  surname: string
};

interface UserProps {
  user: UserType
}

const Profile: React.FC<UserProps> = ({ user }: UserProps) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        {user.avatar &&
          <CardMedia
            component="img"
            alt="UserImage"
            height="200"
            className={classes.media}
            image={user.avatar}
            title="User Image"
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          User Profile: {user.name + ' ' + user.surname}
          </Typography>
          <List component="nav" className={classes.card} aria-label="contacts">
            <ListItem >
              <ListItemText primary={'ID:   ' + user.id}/>
            </ListItem>
            <ListItem >
              <ListItemText primary={'Age:   ' + user.age} />
            </ListItem>
            <ListItem >
              <ListItemText primary={'Email:   ' + user.email} />
            </ListItem>
            <ListItem >
            <ListItemText primary={'Role:   ' + user.role} />
              { user.role == "admin" &&
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
              }
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;