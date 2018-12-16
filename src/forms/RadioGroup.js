import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
import { validation } from '../utils/form';

import RadioGroupMui from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexDirection: 'row',
    marginLeft: theme.spacing.unit * 2,
  },
});

class RadioGroup extends Component {
  renderField(props) {
    const {
      classes,
      input,
      required,
      fullWidth,
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
        <RadioGroupMui
          {...input}
          {...rest}
          value={input.value}
          onChange={(event, value) => input.onChange(value)}
          className={classes.root}
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

RadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(RadioGroup);
