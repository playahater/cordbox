import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import style from './sass/style.scss';

import configureStore from './stores/index.js';
import reducer from './reducers/index.js';

import EventListener from './listeners/EventListener.jsx';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Location from './components/Location.jsx';
import Wireless from './components/Wireless.jsx';
import Camera from './components/Camera.jsx';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const store = configureStore()

var app = new EventListener(
  'deviceready',
  () => {
    render(
      <Provider store={store}>
        <Router history={appHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="location" component={Location}/>
            <Route path="wireless" component={Wireless}/>
            <Route path="camera" component={Camera}/>
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
);

app.start();
