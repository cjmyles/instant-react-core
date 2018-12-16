import React, { Component } from 'react';
import moment from 'moment';

import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    let { value } = props;
    if (!value) {
      value = new moment().format();
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
    this.state = {
      value,
    };
  }

  handleDateChange = m => {
    const value = m.format();
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <InlineDatePicker
            onlyCalendar
            format="Do MMMM YYYY"
            onChange={this.handleDateChange}
            {...this.props}
            value={value}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default DatePicker;
