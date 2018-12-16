import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Field } from 'redux-form';
// import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import PureDatePicker from '../components/DatePicker';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
});

class DatePicker extends Component {
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
        <PureDatePicker {...input} fullWidth={fullWidth} {...rest} />
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
        name="date"
        label="Date"
        //validate={validate}
        //normalize={normalize}
        component={this.renderField}
        {...props}
      />
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(DatePicker);
