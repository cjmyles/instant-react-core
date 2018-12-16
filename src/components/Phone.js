import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import PhoneNumberInput from 'react-phone-number-input';

import './Phone.css';

const styles = theme => ({});

class Phone extends Component {
  render() {
    const { value, className } = this.props;
    const placeholder = this.props.placeholder || 'Enter phone number';

    return (
      <PhoneNumberInput
        country="AU"
        placeholder={placeholder}
        value={value}
        onChange={this.props.onChange}
        className={className}
      />
    );
  }
}

Phone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(Phone);
