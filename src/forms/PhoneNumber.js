import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
import { validation } from '../utils/form';

import Phone from '../components/Phone';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
  phone: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
});

class PhoneNumber extends Component {
  renderField(props) {
    const {
      classes,
      input,
      fullWidth,
      required,
      meta: { touched, error, warning },
      ...rest
    } = props;

    const label = 'Telephone No.';

    const onChange = raw => {
      const phone = raw ? raw : '';
      input.onChange(phone);
    };

    return (
      <FormControl
        component="fieldset"
        required={required}
        fullWidth={fullWidth}
        className={classes.root}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <Phone
          value={input.value}
          onBlur={input.onBlur}
          onChange={onChange}
          onFocus={input.onFocus}
          className={classes.phone}
          inputComponent={
            <TextField
              {...input}
              {...rest}
              className={classes.textField}
              //inputProps={{ autoCapitalize: rest.autoCapitalize || 'off' }}
            />
          }
        />

        {touched &&
          ((error && <Typography color="error">{error}</Typography>) ||
            (warning && <Typography color="secondary">{warning}</Typography>))}
      </FormControl>
    );
  }

  render() {
    const { required } = this.props;

    return (
      <Field
        component={this.renderField}
        validate={required ? validation.required : null}
        {...this.props}
      />
    );
  }
}

PhoneNumber.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(PhoneNumber);
