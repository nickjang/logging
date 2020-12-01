import React, { Component } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import 'react-datetime/css/react-datetime.css';
import './CalendarPicker.css';

// react datepicker but filter dates might only work for dates and not months or years
class CalendarPicker extends Component {
  valid(current) {
    return current.day() === 0;
  }

  render() {
    return <Datetime dateFormat="MM-DD-YYYY" timeFormat={false} isValidDate={this.valid} />;
  }
}

CalendarPicker.defaultProps = {
  selectorId: '',
  type: '',
  value: '',
  open: false,
  updateSelector: () => {}
}

CalendarPicker.propTypes = {
  selectorId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'years', 'months', 'days']).isRequired,
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  updateSelector: PropTypes.func.isRequired
}

export default CalendarPicker;

//color from start date month year, and grey out ones with no logs
/** color days/months/years
 class MyDTPicker extends React.Component {
  render() {
    return (
      <Datetime
        renderDay={this.renderDay}
        renderMonth={this.renderMonth}
        renderYear={this.renderYear}
      />
    );
  }
  renderDay(props, currentDate, selectedDate) {
    // Adds 0 to the days in the days view
    return <td style={{color:'red'}} {...props}>{"0" + currentDate.date()}</td>;
  }
  renderMonth(props, month, year, selectedDate) {
    // Display the month index in the months view
    return <td {...props}>{month}</td>;
  }
  renderYear(props, year, selectedDate) {
    // Just display the last 2 digits of the year in the years view
    return <td {...props}>{year % 100}</td>;
  }
 */