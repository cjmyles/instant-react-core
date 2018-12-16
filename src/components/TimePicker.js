import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const MAX_VALUES = {
  hour: 23,
  minute: 59,
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    width: 50,
  },
  input: {
    fontSize: '2rem',
    textAlign: 'center',
  },
  colon: {
    display: 'inline',
    fontSize: '2rem',
    // margin: '0 4px 0 2px',
  },
});

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    let { value } = props;
    if (!value) {
      value = `${moment().hours()}:${moment().minutes()}`;
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
    this.state = {
      value,
    };
  }

  static format = value => {
    return value.toString().length === 1 ? `0${value}` : `${value}`;
  };

  static toNumber = value => {
    return parseInt(value, 10);
  };

  static isNumber = value => new RegExp('^[0-9]$').test(value);

  updateValue = (name, value) => {
    const hour = name === 'hour' ? value : this.deconstructedValue.hour;
    const minute = name === 'minute' ? value : this.deconstructedValue.minute;
    const nextValue = `${TimePicker.format(hour)}:${TimePicker.format(minute)}`;
    this.setState({
      value: nextValue,
    });
    this.props.onChange(nextValue);
  };

  handleFocus = event => {
    // event.target.select();
  };

  handleChange = name => event => {
    event.preventDefault();
  };

  handleArrowKeyPress = (name, event) => {
    const value = this.deconstructedValue[name];
    let nextValue = event.key === 'ArrowUp' ? value + 1 : value - 1;
    nextValue = nextValue < 0 ? MAX_VALUES[name] : nextValue;
    nextValue = nextValue > MAX_VALUES[name] ? 0 : nextValue;
    this.updateValue(name, nextValue);
  };

  handleNumberKeyPress = (name, event) => {
    const prefix = TimePicker.format(this.deconstructedValue[name]).slice(1, 2);
    let nextValue = parseInt(`${prefix}${event.key}`, 10);
    nextValue =
      nextValue <= MAX_VALUES[name] ? nextValue : parseInt(event.key, 10);
    this.updateValue(name, nextValue);
  };

  handleKeyDown = name => event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.handleArrowKeyPress(name, event);
    } else if (TimePicker.isNumber(event.key)) {
      this.handleNumberKeyPress(name, event);
    } else if (event.key !== 'Tab') {
      event.preventDefault();
    }
    // event.target.select();
  };

  get deconstructedValue() {
    const { value } = this.state;
    const hour = value.toString().substring(0, 2);
    const minute = value.toString().substring(3, 5);
    return {
      hour: TimePicker.toNumber(hour),
      minute: TimePicker.toNumber(minute),
    };
  }

  get formattedHour() {
    const { value } = this.state;
    const hour = value.toString().substring(0, 2);
    return TimePicker.format(hour);
  }

  get formattedMinute() {
    const { value } = this.state;
    const minute = value.toString().substring(3, 5);
    return TimePicker.format(minute);
  }

  render() {
    const { margin, classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          value={this.formattedHour}
          //onFocus={this.handleFocus}
          //onChange={this.handleChange('hour')}
          onKeyDown={this.handleKeyDown('hour')}
          className={classes.textField}
          inputProps={{ className: classes.input }}
          margin={margin}
          //{...props}
        />

        <Typography component="span" className={classes.colon}>
          :
        </Typography>

        <TextField
          value={this.formattedMinute}
          //onFocus={this.handleFocus}
          onChange={this.handleChange('minute')}
          onKeyDown={this.handleKeyDown('minute')}
          className={classes.textField}
          inputProps={{ className: classes.input }}
          margin={margin}
          //{...props}
        />
      </div>
    );
  }
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  hours: PropTypes.number,
  minutes: PropTypes.number,
};

export default decorate(styles)(TimePicker);
