import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';

import SignInPanel from './SignInPanel';
import ForgotPasswordPanel from './ForgotPasswordPanel';

const styles = theme => ({});

class SignIn extends Component {
  state = {
    panel: 'SignIn',
    email: '',
  };

  handleClickForgotPassword = email => {
    this.setState({ panel: 'ForgotPassword', email });
  };

  render() {
    const { classes } = this.props;
    const { panel, email } = this.state;

    return panel === 'SignIn' ? (
      <SignInPanel onClickForgotPassword={this.handleClickForgotPassword} />
    ) : (
      <ForgotPasswordPanel email={email} />
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles, { withRouter: true })(SignIn);
