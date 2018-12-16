import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckboxMui from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {},
});

class Checkbox extends Component {
  renderField(props) {
    const {
      classes,
      input,
      label,
      fullWidth,
      required,
      value,
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
        {label ? (
          <FormControlLabel
            control={
              <CheckboxMui
                {...input}
                {...rest}
                value=""
                className={classes.field}
              />
            }
            label={label}
            required={required}
            value={value}
          />
        ) : (
          <CheckboxMui
            {...input}
            {...rest}
            value=""
            className={classes.field}
          />
        )}
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

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
};

export default decorate(styles)(Checkbox);
