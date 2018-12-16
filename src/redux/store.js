/**
 * @file redux/store.js
 * Redux store.
 *
 * @author Craig Myles
 * @version 1.1.0
 * Last updated Wed 28 Nov
 */

import {
  createStore as reduxCreateStore,
  compose,
  applyMiddleware,
} from 'redux'; // https://github.com/reduxjs/redux
import thunk from 'redux-thunk'; // https://github.com/reduxjs/redux-thunk
import persistState from 'redux-localstorage'; // https://github.com/elgerlambert/redux-localstorage

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Curried middleware function ensuring REQUEST, SUCCESS and FAILURE action types are dispatched.
 * Inspiration taken from react-redux-universal-hot-example.
 * @param {object} store Redux store
 */
const requestMiddleWare = ({ dispatch, getState }) => next => async action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const [REQUEST, SUCCESS, FAILURE] = types;
  try {
    next({ ...rest, type: REQUEST });
    const data = await promise();
    // console.log(data);
    next({ ...rest, data, type: SUCCESS });
  } catch (error) {
    next({ ...rest, error, type: FAILURE });
  }
};

export function createStore(rootReducer, persist = false, paths, key) {
  let enhancer;
  const middleware = applyMiddleware(requestMiddleWare, thunk);
  if (persist) {
    enhancer = composeEnhancers(
      middleware,
      persistState(paths, {
        key,
      })
    );
  } else {
    enhancer = composeEnhancers(middleware);
  }
  return reduxCreateStore(rootReducer, enhancer);
}
