import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
      <Route path="/" component={App} exact />
      <Redirect to="/" />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
