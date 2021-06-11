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
                    <Route path="/task" component={HomePage} exact />
                    <Route path="/sometask" component={TaskDetailsPage} exact />
                    <Redirect to="/task" exact/>
                </Switch>
            </Router>
        );
    }

    return (
        <Router>
            <Switch>
                <Route path="/" component={Authenticated} exact />
                <Redirect to="/" exact/>
            </Switch>
        </Router>
    );
};