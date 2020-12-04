import React, { Component } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import SelectorContext from '../../../Context/SelectorContext';
import 'react-datetime/css/react-datetime.css';
import './CalendarPicker.css';

class CalendarPicker extends Component {
  static contextType = SelectorContext;

  validMonthOrYear = (current, type) => {
    this.context.dayRanges[this.props.projectId].forEach(range => {
      if (current.isSame(range[0], type) || current.isSame(range[1], type))
        return true;
    })
    return false;
  }

  validDay = (current) => {
    let isValid = false;
    this.context.dayRanges[this.props.projectId].forEach(range => {
      if (current.isBetween(range[0], range[1], undefined, '[)'))
        isValid = true;
    })
    return isValid;
  }

  // how to set and get value ????????????????????

  render() {
    let type = this.props.type;
    // remove the 's' because moment uses 'month' and 'year'
    type = type.substring(0, type.length - 1);

    const dateFormat = (type === 'day') ? 'MM-DD-YYY'
      : (type === 'month') ? 'MM-YYYY' : 'YYYY';

    return (
      <Datetime
        value={this.props.value}
        onChange={(momentObj) =>
          this.context.updateSelector(
            this.props.projectId,
            this.props.selectorId,
            this.props.isStart,
            momentObj.toDate()
          )
        }
        dateFormat={dateFormat}
        timeFormat={false}
        isValidDate={
          type === 'day'
            ? this.validDay
            : (current) => this.validMonthOrYear(current, type)}
      />
    );
  }
}

CalendarPicker.defaultProps = {
  projectId: null,
  selectorId: '',
  isStart: true,
  type: '',
  value: '',
}

CalendarPicker.propTypes = {
  projectId: PropTypes.number.isRequired,
  selectorId: PropTypes.string.isRequired,
  isStart: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['years', 'months', 'days']).isRequired,
  value: PropTypes.string.isRequired,
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