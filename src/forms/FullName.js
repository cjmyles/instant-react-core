import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import TextField from './TextField';
// import { validation } from '../utils/form';

const styles = theme => ({
  root: {},
});

class FullName extends Component {
  render() {
    // const { validate: validateProps, ...rest } = this.props;
    // const validate = validateProps
    //   ? [validation.email, ...validateProps]
    //   : validation.email;
    // const props = { validate, ...rest };
    const props = this.props;

    return (
      <TextField
        name="name"
        label="Full Name"
        placeholder="e.g John Smith"
        autoComplete="off"
        autoCapitalize="words"
        {...props}
      />
    );
  }
}

FullName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(FullName);
