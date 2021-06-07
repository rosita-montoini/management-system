import React, { useState, useCallback, useContext, useEffect } from 'react';
import { 
    Box,
    Card,
    Grid,
    CardContent,
    Typography,
    makeStyles,
    Container,
    Tooltip,
    IconButton
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { TaskFormModal } from './modal/modal';
import { TaskDetailsPage } from '../modules/pages/taskDetailsPage';
import { useHttp } from '../hooks/useHttp';
import { AuthContext } from '../context/authContext';
import { ButtonBlock } from '../components/buttonBlock';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const TitleTaskCard = ({ task }) => {
    const styles = useStyles();
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const [showModal, setShowModal] = useState(false);
    const [colored, setColored] = useState(false);
    const [taskById, setTaskById] = useState(null);
    const id = task._id;

    const colorIsDone = {
        color: task.isDone ? '#4caf50' : '#9e9e9e'
    }

    const getTaskById = useCallback(async () => {
        try {
            const data = await request(`/task/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setTaskById(data);
        } catch (err) {}
    }, [token, request]);

    const markTaskAsDone = useCallback(async () => {
        try {
            await request('/task/edit/isDone', 'POST', {id}, {
                Authorization: `Bearer ${token}`
            }).then(window.location.replace('/'));
        } catch (err) {}
    }, [token, request]);

    useEffect(() => {
       getTaskById();
    }, [getTaskById]);

    const handleOpen = () => {
        setShowModal(true);
    };
    
    const handleClose = () => {
        setShowModal(false);
    };

    const mouseOverOpen = () => {
        setColored(true);
    };

    const mouseOutClose = () => {
        setColored(false);
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                {!task.isDone ? 
                    <Card className={styles.root} onMouseOver={mouseOverOpen}>
                        <CardContent onClick={handleOpen} onMouseOut={mouseOutClose}>
                            <Typography variant="h6" color="primary">
                                {task.title}
                            </Typography>
                        </CardContent>
                        <Box display="flex">
                            {colored &&
                                <ButtonBlock taskById={taskById}/>
                            }
                            <Tooltip title={task.isDone ? 'Unmark task as done' : 'Mark task as done'}>
                                <IconButton onClick={markTaskAsDone} aria-label="upload" style={colorIsDone}>
                                    <DoneIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Card>
                    :
                    <Card className={styles.root} onMouseOver={mouseOverOpen}>
                        <CardContent onClick={handleOpen} onMouseOut={mouseOutClose}>
                            <Typography variant="h6" color="textSecondary">
                                {task.title}
                            </Typography>
                        </CardContent>
                        <Box display="flex">
                            {colored &&
                                <ButtonBlock taskById={taskById}/>
                            }
                            <Tooltip title={task.isDone ? 'Unmark task as done' : 'Mark task as done'}>
                                <IconButton onClick={markTaskAsDone} aria-label="upload" style={colorIsDone}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Card>
                }
                <TaskFormModal
                    className={styles.modal}
                    showModal={showModal}
                    handleClose={handleClose}
                >
                    <TaskDetailsPage taskById={taskById} handleClose={handleClose} />
                </TaskFormModal>
                </Grid>
            </Grid>
        </Container>
    );
};