import React, { useState, useContext, useEffect, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button,
    Grid, 
    Hidden,
    makeStyles,
    Select,
    MenuItem,
    FormControl,
    Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TaskFormModal } from '../../components/modal/modal';
import { CreateNewTask } from './createNewTask';
import { useHttp } from '../../hooks/useHttp';
import { AuthContext } from '../../context/authContext';
import { Loader } from '../../components/loader/loader';
import { TitleTaskCard } from '../../components/titleTaskCard';
import lodash from 'lodash';

const options = ['Active', 'Completed', 'Due Date', 'Priority'];

const useStyles = makeStyles(theme => ({
    boxBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap'
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tooltip: {
        marginBottom: '20px'
    },
    btnAdd: {
        marginRight: '10px',
    },
    select: {
        '& .MuiOutlinedInput-input': {
            padding: '8.5px'
        }
    }
}));

export const HomePage = () => {
    const styles = useStyles();
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [tasks, setTasks] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortOption, setSortOption] = useState('Active');
    const sortActiveTasks = lodash.orderBy(tasks, ['isDone'], ['asc']);
    const sortCompletedTasks = lodash.orderBy(tasks, ['isDone'], ['desc']);
    const sortPriorityTasks = lodash.orderBy(tasks, ['priority'], ['asc']);
    const sortDueDateTasks = lodash.orderBy(tasks, ['dueDate'], ['asc']);

    const getTasks = useCallback(async () => {
        try {
            const data = await request('/task', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setTasks(data).then(window.history.pushState({}, document.title, "/task/"));
        } catch (err) {}
    }, [token, request]);

    useEffect(() => {
        return getTasks();
    }, [getTasks]);

    const handleChange = (event) => {
        setSortOption(event.target.value);
    };

    if (loading) {
        return <Loader/>
    }

    const handleOpen = () => {
        setShowModal(true);
    };
    
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item lg={12} xs={12}>
                    <Box mt={"20px"} className={styles.boxBtn}>
                        <Hidden only={["lg", "sm", "md"]}>
                            <Button
                                size="medium"
                                variant="outlined"
                                color="primary"
                                className={styles.btnAdd}
                                onClick={handleOpen}
                            >
                                < AddIcon/>
                            </Button>
                        </Hidden>
                        <Hidden only={["xs"]}>
                            <Button 
                                size="medium"
                                variant="outlined"
                                color="primary"
                                className={styles.btnAdd}
                                onClick={handleOpen}
                            >
                                Create a task
                            </Button>
                        </Hidden>
                        <Tooltip title="Sort tasks">
                            <FormControl>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={sortOption}
                                    variant="outlined"
                                    style={{width: 120}}
                                    onChange={handleChange}
                                    onSelect={handleChange}
                                    className={styles.select}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Tooltip>
                        <TaskFormModal className={styles.modal} showModal={showModal} handleClose={handleClose}>
                            <CreateNewTask handleClose={handleClose} />
                        </TaskFormModal>
                    </Box>
                    <Box mt={"20px"}>
                        <Typography variant="h4" component="h2" align={'center'}>All tasks</Typography>
                    </Box>
                        <Box>
                            {tasks && sortOption === 'Active' && 
                                sortActiveTasks.map((task, idx) => (
                                    <TitleTaskCard key={idx} task={task} />
                                ))
                            }
                            {tasks && sortOption === 'Completed' && 
                                sortCompletedTasks.map((task, idx) => (
                                    <TitleTaskCard key={idx} task={task} />
                                ))
                            }
                            {tasks && sortOption === 'Priority' && 
                                sortPriorityTasks.map((task, idx) => (
                                    <TitleTaskCard key={idx} task={task} />
                                ))
                            }
                            {tasks && sortOption === 'Due Date' && 
                                sortDueDateTasks.map((task, idx) => (
                                    <TitleTaskCard key={idx} task={task} />
                                ))
                            }
                        </Box>
                </Grid>
            </Grid>
        </Container>
    );
};