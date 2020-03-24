import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function LandingPageCard(props) {
  const classes = useStyles();

  const [landingPageCardRedirectFire, setLandingPageCardRedirectFire] = useState(0);

  if (landingPageCardRedirectFire) { return <Redirect push to={props.element.redirect} /> };

  return (
    <div>
      <br />
      <Card className={classes.root} style={{ backgroundColor: props.element.backgroundColor }}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={props.element.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{ color: props.element.buttonColor }}>
              {props.element.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            style={{ color: props.element.buttonColor }}
            onClick={() => {
              setLandingPageCardRedirectFire(true);
            }}
          >
            Go to Page
          </Button>
        </CardActions>
      </Card>
      <br />
    </div>
  );
};