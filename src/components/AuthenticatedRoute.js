import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthenticatedRoute extends Component {
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

    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated ? (
            this.renderComponent(C, L, props, cProps)
          ) : (
            <Redirect
              to={`/signin?redirect=${props.location.pathname}${
                props.location.search
              }`}
            />
          )
        }
      />
    );
  }
}

AuthenticatedRoute.propTypes = {
  auth: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
