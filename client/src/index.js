import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' component={App}/>
      <Redirect from="/task" to="/"/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
