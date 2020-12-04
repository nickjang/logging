import React, { Component } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import SelectorContext from '../../../Context/SelectorContext';
import 'react-datetime/css/react-datetime.css';
import './CalendarPicker.css';

class CalendarPicker extends Component {
  static contextType = SelectorContext;

  validMonthOrYear = (current, type) => {
    let isValid = false;
    this.context.dayRanges[this.props.projectId].forEach(range => {
      if (current.isSame(range[0], type) || current.isSame(range[1], type))
        isValid = true;
    })
    return isValid;
  }

  validDay = (current) => {
    let isValid = false;
    this.context.dayRanges[this.props.projectId].forEach(range => {
      if (current.isBetween(range[0], range[1], undefined, '[)'))
        isValid = true;
    })
    return isValid;
  }

  render() {
    let type = this.props.type;
    // remove the 's' because moment uses 'month' and 'year'
    type = type.substring(0, type.length - 1);

    const dateFormat = (type === 'day') ? 'MM-DD-YYYY'
      : (type === 'month') ? 'MM-YYYY' : 'YYYY';

    return (
      <Datetime
        value={this.props.value}
        onChange={(momentObj) =>
          this.context.updateSelector(
            this.props.projectId,
            this.props.selectorId,
            this.props.isStart,
            !momentObj ? null : momentObj.toDate()
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
  value: null,
}

CalendarPicker.propTypes = {
  projectId: PropTypes.number.isRequired,
  selectorId: PropTypes.string.isRequired,
  isStart: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['years', 'months', 'days']).isRequired,
  value: PropTypes.object,
}

export default CalendarPicker;