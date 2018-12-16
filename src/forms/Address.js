import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import TextField from './TextField';
import { validation } from '../utils/form';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {},
});

class Address extends Component {
  render() {
    const { member, disabled } = this.props;

    const validate = this.props.hasOwnProperty('validate')
      ? this.props.validate
      : validation.required;

    return (
      <Grid container>
        <Grid item xs={12}>
          <TextField
            name={member ? `${member}.streetAddress` : 'streetAddress'}
            type="text"
            label="Street Address"
            placeholder="e.g 12 High St, Paddington, Sydney"
            margin="normal"
            fullWidth
            required
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name={member ? `${member}.city` : 'city'}
            type="text"
            label="City"
            placeholder="e.g Sydney"
            margin="normal"
            fullWidth
            required
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={member ? `${member}.state` : 'state'}
            type="text"
            label="State"
            placeholder="e.g NSW"
            margin="normal"
            fullWidth
            required
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={member ? `${member}.postcode` : 'postcode'}
            type="text"
            label="Postcode"
            placeholder="e.g 2000"
            margin="normal"
            fullWidth
            required
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name={member ? `${member}.country` : 'country'}
            type="text"
            label="Country"
            placeholder="e.g Australia"
            margin="normal"
            fullWidth
            required
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            name="addressLine1"
            type="text"
            label="Address Line 1"
            placeholder="e.g Unit 5"
            margin="normal"
            fullWidth
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="addressLine2"
            type="text"
            label="Address Line 2"
            placeholder="e.g 12 High St"
            margin="normal"
            fullWidth
            validate={validate}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="suburb"
            type="text"
            label="Suburb"
            placeholder="e.g Paddington"
            margin="normal"
            fullWidth
            validate={validate}
            disabled={disabled}
          />
        </Grid> */}
      </Grid>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(Address);
