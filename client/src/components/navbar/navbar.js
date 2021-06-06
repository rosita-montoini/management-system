import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, makeStyles, Box } from '@material-ui/core';
import { AuthContext } from '../../context/authContext';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#42a5f5',
        minHeight: '100%',
    },
    signBtn: {
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    navbar: {
        marginBottom: '20px',
        backgroundColor: '#42a5f5'
    },
    navbarNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    navbarItem: {
        padding: '0 50px 0 50px',
        listStyle: 'none',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
        },
    },
    navLink: {
        textDecoration: 'none'
    },
    colorSecond: {
        color: '#3f51b5',
    }
}));

export const Navbar = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const styles = useStyles();

    const logoutHandler = event => {
        event.preventDefault();
        authContext.logout();
        history.push('/auth/login');
    };

    return (
        <Box className={styles.root}>
            <nav>
                <ul className={styles.navbarNav}>
                    <li className={styles.navbarItem}>
                        <a href="/" className={styles.navLink}>
                            <Typography variant="h5" color="textPrimary" align={"center"}>
                                <span className={styles.colorSecond}>M</span>anagement <span className={styles.colorSecond}>S</span>ystem
                            </Typography>
                        </a>
                    </li>
                    <li className={styles.navbarItem}>
                        <Button 
                            href="/auth/login" 
                            onClick={logoutHandler}
                            color="primary"
                            size="medium"
                            variant="contained"
                            className={styles.signBtn}
                        >
                            Sign out
                        </Button>
                    </li>
                </ul> 
            </nav>
        </Box>
    );
};