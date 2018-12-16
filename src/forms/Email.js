import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import TextField from './TextField';
import { validation } from '../utils/form';

const styles = theme => ({
  root: {},
});

class Email extends Component {
  render() {
    const { validate: validateProps, ...rest } = this.props;
    const validate = validateProps
      ? [validation.email, ...validateProps]
      : validation.email;
    const props = { validate, ...rest };

    return (
      <TextField
        name="email"
        type="text"
        label="Email"
        placeholder="e.g joe@citizen.com.au"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        {...props}
      />
    );
  }
}

Email.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(Email);
