import React from 'react';
import {makeStyles} from "@material-ui/core/styles/index";
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    root: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
        fontSize: '1.5em',
        minWidth: 275,
        position: 'relative',
        height: '100%',
        '&:hover': {
            boxShadow: '0 0 15px rgba(0,0,0,.3)',
            transition: 'opacity .15s ease-out',
        },
    },
    cardTitle: {
        marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    actions: {
        minHeight: 70,
    },
    moreButton: {
        position: 'absolute',
        bottom: '5%',
        right: '3%',
    }
});

export default (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <div>
                    {props.recipe.recipe_name}
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                <Link to={`/recipe/create/${props.recipe.recipe_id}`}>
                    <Fab className={classes.moreButton} color="primary" aria-label="add">
                        <ArrowForwardIosIcon />
                    </Fab>
                </Link>
            </CardActions>
        </Card>
    );
}