import moment from 'moment';

export default function formatLog (start, end, format) {
  start = moment(start);
  end = moment(end);
  //apply format to log
  return `${start} - ${end}`;
};