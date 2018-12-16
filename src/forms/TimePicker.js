import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
// import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import PureTimePicker from '../components/TimePicker';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
});

class TimePicker extends Component {
  handleChange = (event, newValue, previousValue, name) => {
    console.log('handleChange', newValue, previousValue);
  };

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
        <PureTimePicker {...input} fullWidth={fullWidth} {...rest} />
        {touched &&
          ((error && <Typography color="error">{error}</Typography>) ||
            (warning && <Typography color="secondary">{warning}</Typography>))}
      </FormControl>
    );
  }

  render() {
    const props = this.props;

    return (
      <Field
        name="time"
        label="Time"
        //validate={validate}
        //normalize={normalize}
        //onChange={this.handleChange}
        component={this.renderField}
        {...props}
      />
    );
  }
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(TimePicker);
