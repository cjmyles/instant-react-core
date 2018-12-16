/**
 * @file component.js
 * React component utilities.
 *
 * @author Craig Myles
 * @version 1.0.0
 * Last updated Thu 15 Nov
 */

import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

/**
 * Decorate a component with styles, props, actions, routers and themes
 * @param {object} Material-UI styles
 * @param  {...any} args Props, actions & options definitions
 */
export function decorate(styles, ...args) {
  let props;
  let actions;
  let options;

  // This function has three optional arguments:
  //
  // `props`: string|array
  // `actions`: object|array
  // `options`: object
  //
  // However, it's assumed `props` is always present if `actions` is, even as an empty string
  //
  // Let's therefore deduce which argument corresponds to which parameter...

  const isOptionsObject = obj =>
    typeof obj === 'object' &&
    (obj.hasOwnProperty('withTheme') || obj.hasOwnProperty('withRouter'));

  if (args[2]) {
    // Fully decorated
    options = args[2];
    actions = args[1];
    props = args[0];
  } else if (args[1]) {
    // Props & actions/options
    if (isOptionsObject(args[1])) {
      options = args[1];
    } else {
      actions = args[1];
    }
    props = args[0];
  } else if (args[0]) {
    // Props/actions/options
    if (isOptionsObject(args[0])) {
      options = args[0];
    } else {
      props = args[0];
    }
  }

  // Ensure that the options exist, at least as an empty object
  options = options || {};

  // Create baseline components
  let components = withStyles(styles, { withTheme: !!options.withTheme });

  if (props || actions) {
    /**
     * Map state to props
     * @param {object} state State
     */
    const mapStateToProps = state => {
      let result = {};
      if (props && typeof props === 'string') {
        result[props] = state[props];
      } else if (props && Array.isArray(props)) {
        props.forEach(key => {
          if (typeof key === 'string') {
            result[key] = state[key];
          } else {
            Object.entries(key).forEach(([childKey, childValue]) => {
              if (typeof childValue === 'string') {
                result[childValue] = state[childKey];
              } else {
                result[childKey] = childValue(state);
              }
            });
          }
        });
      } else if (props) {
        Object.entries(props).forEach(([key, value]) => {
          result[key] = value(state);
        });
      }
      return result;
    };

    /**
     * Map dispatch to props
     * @param {function} dispatch Dispatch
     */
    const mapDispatchToProps = dispatch => {
      let result = {};
      if (actions) {
        Object.entries(actions).forEach(([key, action]) => {
          result[key] = bindActionCreators(action, dispatch);
        });
      }
      return result;
    };

    // Add `mapStateToProps` and `mapDispatchToProps` to the components
    components = compose(
      connect(
        mapStateToProps,
        mapDispatchToProps
      ),
      components
    );
  }

  // Add `withRouter` to the components
  if (options.withRouter) {
    components = compose(
      withRouter,
      components
    );
  }

  return components;
}
