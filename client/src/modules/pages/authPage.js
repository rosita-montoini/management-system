import React, { useContext, useEffect, useState } from 'react';
import { 
    makeStyles, 
    Box, 
    Typography, 
    TextField, 
    Container, 
    Grid, 
    Button, 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHttp } from '../../hooks/useHttp';
import { AuthContext } from '../../context/authContext';

const REG = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#42a5f5',
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
    },
    auth: {
        color: '#fff',
        textAlign: 'left',
    },
    inputSign: {
        margin: '20px 0 20px 0',
        '& .MuiInputBase-root.MuiInput-root': {
            color: "#fff"
        },
        '& input:-webkit-autofill': {
            '-webkit-box-shadow': 'inset 0 0 0 50px #42a5f5 !important',
            '-webkit-text-fill-color': '#fff'
        }
    },
    sign: {
        margin: '15px 20px 0 20px',
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    
}));


export const Authenticated = () => {
    const styles = useStyles();
    const authContext = useContext(AuthContext);
    const { loading, request, error, clearError, message, clearMessage } = useHttp();
    const [values, setValues] = useState({ userName: '', email: '', password: '' });
    const [auth, setAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        setTimeout(() => {
            clearError();
            clearMessage();
        }, 4000);
    }, [error, clearError, message, clearMessage]);

    const handleChange = ({target: { name, value }}) => {
        setValues({
            ...values,
            [name]: value
        });

        switch (name) {
            case 'userName': {
                setErrors(prev =>
                    value.length === 0 ?
                        [{name, errorText: 'This field need be completed'}, ...prev]
                    :
                        prev.filter(error => error.name !== name)
                );
                break;
            }
            case 'email': {
                setErrors(prev =>
                    value.match(REG) ?
                        prev.filter(error => error.name !== name)
                    :
                        value.length === 0 ?
                            [{name, errorText: 'This field need be completed'}, ...prev]
                        :
                            [{name, errorText: `Incorrect email, enter like this 'mail@mail.com'`}, ...prev]
                );
                break;
            }
            case 'password': {
                setErrors(prev =>
                    value.length < 6 ?
                        [{name, errorText: 'Password is too short. At least 6 characters'}, ...prev]
                    :
                        prev.filter(error => error.name !== name)
                );
                break;
            }
            default: break;
        }
    };

    const registerHandler = async () => {
        try {
            await request('/auth/register', 'POST', {...values});
            setAuth(true);
            setValues({ userName: '', email: '', password: '' });
        } catch (err) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', {...values});
            authContext.login(data.token, data.userId);
        } catch (err) {}
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            height="100%" 
            justifyContent="center"
            textAlign="center"
            paddingTop="50px"
        >
            <Container maxWidth="sm">
                <form>
                    <Box mb={3}>
                        {error &&
                            <Alert className={styles.tooltip} severity="error">{error}</Alert>
                        }
                        {message &&
                            <Alert className={styles.tooltip} severity="success">{message}</Alert>
                        }
                        <Typography variant="h3" color="textPrimary">
                            <span className="other-color">M</span>anagement <span className="other-color">S</span>ystem
                        </Typography>
                    </Box>
                    <Box className={styles.root}>
                        <Grid container spacing={3} justify="center">
                            <Grid item md={10} xs={10}>
                                <Typography variant="h4" className={styles.auth}>
                                    {!auth ? 'Register now' : 'Sign in'}
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="userName"
                                    type="text"
                                    placeholder="Enter the name"
                                    value={values.userName}
                                    onChange={handleChange}
                                    className={styles.inputSign}
                                    error={errors.some(error => error.name === 'userName')}
                                    helperText={
                                        errors.find(error => error.name === 'userName')?.errorText
                                    }
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter the email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className={styles.inputSign}
                                    error={errors.some(error => error.name === 'email')}
                                    helperText={
                                        errors.find(error => error.name === 'email')?.errorText
                                    }
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter the password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className={styles.inputSign}
                                    error={errors.some(error => error.name === 'password')}
                                    helperText={
                                        errors.find(error => error.name === 'password')?.errorText
                                    }
                                    required
                                />
                                <Box>
                                    <Button
                                        color="primary"
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        className={styles.sign}
                                        onClick={loginHandler}
                                        disabled={loading}
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        className={styles.sign}
                                        onClick={registerHandler}
                                        disabled={loading}
                                    >
                                        Sign up
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};