import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {makeStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles(() => ({
    success: {
        backgroundColor: '#4caf50',
        color: 'white',
        fontWeight: '500',
    },
    failed: {
        backgroundColor: '#f44336',
        color: 'white',
        fontWeight: '500',
    },
}));

export default (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.closeSnackBar();
    };

    useEffect(() => {
        setOpen(props.open);
        setVariant(props.variant);
    }, [props.open, props.variant]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            ContentProps={{
                classes: {
                    root: classes[variant],
                }
            }}
            autoHideDuration={3000}
            onClose={handleClose}
            message={props.message}
        />
    );
}
