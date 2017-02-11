import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import configureStore from './stores/index.js';

import reducer from './reducers/index.js';
import { Router, Route, createMemoryHistory } from 'react-router';

import EventListener from './listeners/EventListener.jsx';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Location from './components/Location.jsx';
import Wireless from './components/Wireless.jsx';
import Camera from './components/Camera.jsx';

const history = createMemoryHistory('/');

const store = configureStore()

var app = new EventListener(
  'deviceready',
  () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/location" component={Location}/>
            <Route path="/wireless" component={Wireless}/>
            <Route path="/camera" component={Camera}/>
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
);

app.start();
