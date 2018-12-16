import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
  flexWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  error: {
    margin: theme.spacing.unit * 2,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

class AddressAutocomplete extends Component {
  state = {
    address: '',
  };

  formatAddress = async (address, results) => {
    const components = results[0].address_components;

    function extractFromAddress(type) {
      return (
        components
          .filter(component => component.types.indexOf(type) === 0)
          .map(item => item.long_name)
          .pop() || null
      );
    }

    const city =
      extractFromAddress('locality') ||
      extractFromAddress('administrative_area_level_1');
    return {
      address,
      street: extractFromAddress('route'),
      streetAddress: address.split(', ')[0],
      city:
        extractFromAddress('locality') ||
        extractFromAddress('administrative_area_level_1'),
      country: extractFromAddress('country'),
      postcode: extractFromAddress('postal_code'),
      state:
        extractFromAddress('administrative_area_level_1') !== city
          ? extractFromAddress('administrative_area_level_1')
          : extractFromAddress('administrative_area_level_2'),
    };
  };

  handleChange = address => {
    this.setState({ errorStatus: null, address });
  };

  handleSelect = async (address, placeId) => {
    const results = await geocodeByAddress(address);
    const formatted = await this.formatAddress(address, results);
    this.props.onSelect({ address, formatted, placeId, results });
  };

  handleError = (status, clearSuggestions) => {
    this.setState({ errorStatus: status });
    clearSuggestions();
  };

  render() {
    const { disabled, classes } = this.props;
    const { errorStatus } = this.state;

    return (
      <PlacesAutocomplete
        value={this.state.address}
        debounce={500}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.root}>
            <FormLabel component="legend">Address</FormLabel>
            <TextField
              {...getInputProps({
                placeholder: 'e.g 12 High St, Paddington, Sydney',
              })}
              margin="normal"
              autoComplete="off"
              autoCapitalize="off"
              className={classes.textField}
              fullWidth
              disabled={disabled}
            />

            <Paper className={classes.paper} square>
              {loading ? (
                <div className={classes.flexWrapper}>
                  <CircularProgress className={classes.progress} />
                </div>
              ) : errorStatus === 'ZERO_RESULTS' ? (
                <div className={classes.flexWrapper}>
                  <Typography className={classes.error}>
                    <span>No results - </span>
                    <span
                      className={classes.link}
                      onClick={this.props.showAddress}
                    >
                      enter address manually
                    </span>
                  </Typography>
                </div>
              ) : (
                suggestions.map(suggestion => (
                  <MenuItem
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.id}
                    component="div"
                  >
                    {suggestion.description}
                  </MenuItem>
                ))
              )}
            </Paper>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

AddressAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(AddressAutocomplete);
