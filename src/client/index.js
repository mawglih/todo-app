import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import {
  Provider,
} from 'react-redux';
import {
  routerMiddleware,
  connectRouter,
} from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

import App from './components/app';

import './stylesheets/style.scss';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
   document.getElementById('main'));
});
