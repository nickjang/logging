import React, { Component } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import SelectorContext from '../../../Context/SelectorContext';
import 'react-datetime/css/react-datetime.css';
import './CalendarPicker.css';

class CalendarPicker extends Component {
  static contextType = SelectorContext;

  binarySearch = (list, toMatch, compareFunc, l, r) => {
    if (r >= l) {
      let mid = l + Math.floor((r - l) / 2);
      let result = compareFunc(toMatch, list[mid]);

      if (result === 0)
        return true;
      else if (result > 0) // search right half
        return this.binarySearch(list, toMatch, compareFunc, mid + 1, r)
      else // search left half
        return this.binarySearch(list, toMatch, compareFunc, l, mid - 1);
    } else { // element is not in array (no more elements to search between)
      return false;
    }
  }

  validMonthOrYear(current, type) {
    // callback function compares current month/year to month/year range
    const compareFunc = (current, range) => {
      if (current.isSame(range[0], type) || current.isSame(range[1], type))
        return 0;
      else if (current.isBefore(range[0], type))
        return -1;
      else
        return 1;
    }

    // dayRanges is sorted, so binary search
    return this.binarySearch(
      this.context.dayRanges[this.props.projectId],
      current,
      compareFunc,
      0,
      this.context.dayRanges[this.props.projectId].length - 1
    );
  }

  validDay = (current) => {
    // callback function compares date to dates range
    const compareFunc = (current, range) => {
      if (current.isBetween(range[0], range[1], undefined, '[]'))
        return 0;
      else if (current.isBefore(range[0], 'day'))
        return -1;
      else
        return 1;
    }

    // dayRanges is sorted, so binary search
    return this.binarySearch(
      this.context.dayRanges[this.props.projectId],
      current,
      compareFunc,
      0,
      this.context.dayRanges[this.props.projectId].length - 1
    );
  }

  handleChange = (datetime) => {
    try {
      if (typeof datetime === 'string' ) {
        datetime = new Date(datetime);
        if (isNaN(datetime.getTime())) return;
      } else {
        datetime = datetime.toDate();
      }
      
      this.context.updateSelector(
        this.props.projectId,
        this.props.selectorId,
        this.props.isStart,
        !datetime ? null : datetime
      );
    } catch (e) {
      return;
    }
  }

  render() {
    let type = this.props.type;
    // remove the 's' because moment uses 'month' and 'year'
    type = type.substring(0, type.length - 1);

    const dateFormat = (type === 'day') ? 'MM/DD/YYYY'
      : (type === 'month') ? 'MM/YYYY' : 'YYYY';

    return (
      <Datetime
        value={this.props.value}
        onChange={(datetime) => this.handleChange(datetime)}
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