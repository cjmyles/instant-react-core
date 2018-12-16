import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextFieldMui from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
});

class TextField extends Component {
  renderField(props) {
    const {
      classes,
      input,
      label,
      fullWidth,
      required,
      meta: { touched, error, warning },
      ...rest
    } = props;

    return (
      <FormControl
        component="fieldset"
        required={required}
        fullWidth={fullWidth}
        className={classes.root}
      >
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <TextFieldMui
          {...input}
          {...rest}
          className={classes.textField}
          inputProps={{ autoCapitalize: rest.autoCapitalize || 'off' }}
        />
        {touched &&
          ((error && <Typography color="error">{error}</Typography>) ||
            (warning && <Typography color="secondary">{warning}</Typography>))}
      </FormControl>
    );
  }

  render() {
    const { name, validate: validateProps, required, ...rest } = this.props;

    let validate = [];
    if (validateProps && Array.isArray(validateProps)) {
      validate = [...validateProps];
    } else if (validateProps) {
      validate = [validateProps];
    }
    if (required) {
      validate.push(validation.required);
    }
    const props = { required, ...rest };

    return (
      <Field
        name={name}
        validate={validate}
        component={this.renderField}
        {...props}
      />
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(TextField);
