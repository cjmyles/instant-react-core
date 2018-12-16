/**
 * @file redux/selectors.js
 * Redux selectors.
 *
 * @author Craig Myles
 * @version 1.0.0
 * Last updated Tue 20 Nov
 */

// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

export const createLoadingSelector = actions => state => {
  actions = typeof actions === 'string' ? [actions] : actions;
  return actions.some(action => state.loading[action]);
};

export const createSuccessSelector = actions => state => {
  actions = typeof actions === 'string' ? [actions] : actions;
  return actions.some(action => state.success[action]);
};

export const createErrorSelector = actions => state => {
  actions = typeof actions === 'string' ? [actions] : actions;
  return actions.some(action => state.error[action]);
};
