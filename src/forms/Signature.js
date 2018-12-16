import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import PureSignature from '../components/Signature';

const styles = theme => ({
  root: {
    display: 'block',
  },
  label: {
    marginBottom: 10,
  },
});

class Signature extends Component {
  renderField(props) {
    const {
      classes,
      value,
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
        {label && (
          <FormLabel component="legend" className={classes.label}>
            {label}
          </FormLabel>
        )}
        <PureSignature
          signature={input.value}
          {...input}
          {...rest}
          className={classes.signature}
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
        name="signature"
        component={this.renderField}
        validate={required ? validation.required : null}
        {...this.props}
      />
    );
  }
}

Signature.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(Signature);
