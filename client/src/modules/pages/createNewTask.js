import React, { useState, useContext } from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    Box,
    Button,
    TextField,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useHttp } from '../../hooks/useHttp';
import { AuthContext } from '../../context/authContext';

const NUMBERS_REG = /^[1-9]\d*$/;

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "0 auto",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 7, 14, 7),
        alignItems: "center",
        justifyContent: "center"
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
    descriptionField: {
        marginTop: '30px',
        marginBottom: '10px'
    },
    inputField: {
        '& input:-webkit-autofill': {
            '-webkit-box-shadow': 'inset 0 0 0 50px #fff !important',
        }
    },
    inputFieldDate: {
        marginTop: '30px',
        marginBottom: '20px'
    }
}));

export const CreateNewTask = ({ handleClose }) => {
    const styles = useStyles();
    const authContext = useContext(AuthContext);
    const { request } = useHttp();
    const [errors, setErrors] = useState([]);
    const [values, setValues] = useState({});
    const defaultData = new Date().toISOString().slice(0, 10);

    const taskHandler = async () => {
        try {
            await request('/task/add', 'POST', {...values}, {
                Authorization: `Bearer ${authContext.token}`
            }).then(window.history.pushState({}, document.title, "/"));
        } catch (err) {}
    };

    const handleChange = ({target: { name, value }}) => {
        setValues({
            ...values,
            [name]: value
        });

        switch (name) {
            case 'title': {
                setErrors(prev =>
                    value.length === 0 ?
                        [{name, errorText: 'This field need be completed'}, ...prev]
                    :
                        prev.filter(error => error.name !== name)
                );
                break;
            }
            case 'description': {
                setErrors(prev =>
                    value.length === 0 ?
                        [{name, errorText: 'This field need be completed'}, ...prev]
                    :
                        prev.filter(error => error.name !== name)
                );
                break;
            }
            case 'priority': {
                setErrors(prev =>
                    value.match(NUMBERS_REG) ?
                        prev.filter(error => error.name !== name)  
                    :
                        value.toString().length === 0 ?
                            [{name, errorText: 'This field need be completed'}, ...prev]
                        :
                            [{name, errorText: 'The value must be only a number and more than 0'}, ...prev]
                );
                break;
            }
            default: break;
        }
    };

    return (
        <div className={styles.paper}>
            <Grid container>
                <Grid item lg={12} xs={12}>
                    <Box className={styles.btnBox}>
                        <Button
                            color="default"
                            size="small"
                            variant="outlined"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </Button>
                    </Box>
                    <Typography color="textPrimary" variant="h5">
                        Add new task
                    </Typography>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        height="100%" 
                        justifyContent="center"
                        textAlign="center"
                    >
                        <form>
                            <Box className={styles.root}>
                                <Grid container justify="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Title"
                                            name="title"
                                            type="text"
                                            placeholder="Enter the title of the task"
                                            value={values.title || ''}
                                            onChange={handleChange}
                                            className={styles.inputField}
                                            fullWidth
                                            required
                                            error={errors.some(error => error.name === 'title')}
                                            helperText={
                                                errors.find(error => error.name === 'title')?.errorText
                                            }
                                        />
                                        <TextField
                                            label="Description"
                                            name="description"
                                            variant="outlined"
                                            rows={"4"}
                                            value={values.description || ''}
                                            onChange={handleChange}
                                            inputProps={{ maxLength: 1500}}
                                            className={styles.descriptionField}
                                            multiline
                                            fullWidth
                                            required
                                            error={errors.some(error => error.name === 'description')}
                                            helperText={
                                                errors.find(error => error.name === 'description')?.errorText
                                            }
                                        />
                                        <TextField
                                            label="Priority"
                                            name="priority"
                                            type="text"
                                            placeholder="Enter the priority of the task"
                                            value={values.priority || ''}
                                            onChange={handleChange}
                                            className={styles.inputField}
                                            fullWidth
                                            required
                                            error={errors.some(error => error.name === 'priority')}
                                            helperText={
                                                errors.find(error => error.name === 'priority')?.errorText
                                            }
                                        />
                                        <TextField
                                            id="date"
                                            label="Due Date"
                                            name="dueDate"
                                            type="date"
                                            format="dd.MM.yyyy"
                                            defaultValue={defaultData}
                                            value={values.dueDate}
                                            onChange={handleChange}
                                            className={styles.inputFieldDate}
                                            fullWidth
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Box className={styles.btnBox}>
                                            <Button
                                                size="small"
                                                type="submit"
                                                variant="outlined"
                                                color="primary"
                                                onClick={taskHandler}
                                            >
                                                Add task
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};