import React from 'react';
import { 
    Box,
    Grid,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "0 auto",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
        alignItems: "flex-start",
        justifyContent: "flex-start",
        [theme.breakpoints.up('sm')]: {
            minWidth: 300,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 200,
        }
    },
    root: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    btnBox: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    btnBtn: {
        padding: '1px 1px',
    },
    link: {
        marginTop: '25px',
        marginBottom: '20px',
        color: '#42a5f5',
    },
    date: {
        direction: 'rtl'
    }
}));

export const TaskDetailsPage = ({ handleClose, taskById }) => {
    const styles = useStyles();

    return (
        <div className={styles.paper}>
            <Grid container spacing={1}>
                <Grid item lg={12} md={12} xs={12}>
                    <Box className={styles.root}>
                        <Box className={styles.btnBox}>
                            <Button
                                color="default"
                                size="small"
                                variant="outlined"
                                onClick={handleClose}
                                className={styles.btnBtn}
                            >
                                <CloseIcon/>
                            </Button>
                        </Box>
                        <Box>
                            <Typography variant="h4" className={styles.link}>
                                {taskById.title}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                Description: {taskById.description}
                            </Typography>
                            <Typography color="textSecondary">
                                Priority №: {taskById.priority}
                            </Typography>
                            <Typography color="textSecondary">
                                Due Date: {taskById.dueDate.slice(0, 10)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};