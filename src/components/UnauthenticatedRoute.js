import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class UnauthenticatedRoute extends Component {
  renderComponent(C, L, props, cProps) {
    return L ? (
      <L>
        <C {...props} {...cProps} />
      </L>
    ) : (
      <C {...props} {...cProps} />
    );
  }

  render() {
    const {
      auth,
      component: C,
      layout: L,
      props: cProps,
      ...rest
    } = this.props;
    const redirect = querystring('redirect');

    return (
      <Route
        {...rest}
        render={props =>
          !auth.isAuthenticated ? (
            this.renderComponent(C, L, props, cProps)
          ) : (
            <Redirect
              to={redirect === '' || redirect === null ? '/' : redirect}
            />
          )
        }
      />
    );
  }
}

UnauthenticatedRoute.propTypes = {
  auth: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(UnauthenticatedRoute);
