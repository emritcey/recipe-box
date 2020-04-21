import React, { useEffect, useState } from 'react';

import {createStyles, makeStyles } from "@material-ui/core/styles/index";

import DashboardCardComponent from './Components/DashboardCardComponent';
import SuggestedRecipeComponent from './Components/SuggestedRecipeComponent';
import { getSessionCookie } from '../../Sessions';

// Use this Array to build out custom Properties for each card.
const cardPropsArray = [{
    name: "View All Recipes",
    image: "https://avatarfiles.alphacoders.com/213/213116.jpg",
    backgroundColor: "#3f51b5",
    buttonColor: "white",
    key: 'all-recipes',
    redirect: "/recipe",
  }, {
    name: "Create New Recipe",
    image: "https://avatarfiles.alphacoders.com/213/213116.jpg",
    backgroundColor: "#3f51b5",
    buttonColor: "white",
    key: 'create',
    redirect: "/recipe/create"
  }, {
    name: "Mikey's Tic-Tac-Toe Game",
    image: "https://miro.medium.com/max/1056/1*kUI-7R4PhglX9mA44VPNpA.png",
    backgroundColor: "#3f51b5",
    buttonColor: "white",
    key: 'mikeys-tic-tac-toe',
    redirect: "/mikey-tic-tac-toe"
  }];

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            marginTop: '4%',
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        dashboardContainer: {
            display: 'flex',
            'justify-content': 'space-around',
            'flex-wrap': 'wrap',
        },
    }),
);

export default function DashboardPage() {
    const classes = useStyles();
    const [session, setSession] = useState(getSessionCookie());
    useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session.userName]
    );
    return (
    <div>
        <main className={classes.content}>
            <h1>Welcome, {session.userName}</h1>
            <div className={classes.dashboardContainer}>
                {cardPropsArray.map(mapElement => <DashboardCardComponent key={mapElement.key} element={mapElement} />)}
            </div>
        </main>

        <SuggestedRecipeComponent />
    </div>
  );
};