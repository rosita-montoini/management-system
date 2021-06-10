import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {HomePage} from './modules/pages/homePage';
import {TaskDetailsPage} from './modules/pages/taskDetailsPage';
import {Authenticated} from './modules/pages/authPage';

export const useRoutes = isAuthenticated => {
    
    if (isAuthenticated) {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/task" component={TaskDetailsPage} exact />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }

    return (
        <Router>
            <Switch>
                <Route path="/" component={Authenticated} exact />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};