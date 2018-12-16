import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';

import AddressAutocomplete from './AddressAutocomplete';
import Address from './Address';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    marginBottom: 20,
  },
  hidden: {
    display: 'none',
  },
});

class AddressWithAutocomplete extends Component {
  render() {
    const { member, isAutocompleteVisible, classes } = this.props;

    return (
      <Fragment>
        {isAutocompleteVisible && (
          <AddressAutocomplete
            onSelect={this.props.onSelect}
            showAddress={this.props.showAddress}
          />
        )}

        <div className={isAutocompleteVisible ? classes.hidden : ''}>
          <Address member={member} />
        </div>

        {!isAutocompleteVisible && (
          <div>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.props.hideAddress}
              className={classes.button}
            >
              Search again
            </Button>
          </div>
        )}
      </Fragment>
    );
  }
}

AddressWithAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(AddressWithAutocomplete);
