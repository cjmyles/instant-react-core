/**
 * @file redux/reducers.js
 * Redux reducers.
 *
 * @author Craig Myles
 * @version 1.0.0
 * Last updated Wed 28 Nov
 */

// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

export function loading(state = {}, action) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
}

export function success(state = {}, action) {
  const { type } = action;
  const matches = /(.*)_(SUCCESS|CLEAR)/.exec(type);

  // not a *_SUCCESS action, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request has successfully completed
    // e.g. will be true when receiving GET_TODOS_SUCCESS
    //      and false when receiving GET_TODOS_REQUEST / GET_TODOS_FAILURE
    [requestName]: requestState === 'SUCCESS',
  };
}
