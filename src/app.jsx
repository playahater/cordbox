import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import { Router, Route, createMemoryHistory } from 'react-router';

import EventListener from './listeners/EventListener.jsx';
import App from './components/App.jsx';
import Home from './components/Home.jsx';

const history = createMemoryHistory('/');

var store = createStore(reducer);

var app = new EventListener(
  'deviceready',
  () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path="/" component={Home}/>
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
);

app.start();
