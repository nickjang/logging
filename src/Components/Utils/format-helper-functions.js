import moment from 'moment';

const durationOfType = (logValue, type) => {
  if (type === 'minutes') 
    return moment.duration(logValue).minutes();
  else if (type === 'seconds') 
    return moment.duration(logValue).seconds();
}

/**
 * Change start and end times of a log to the nearest
 * multiple of the formats given.
 * 
 * {
 *  minutes: 45, => possible results - hh:00, hh:45, hh+1:00, hh+1:45, ...
 *  seconds: 05  => possible results - mm:00, mm:05, mm:10, mm:15, ...
 * }
 */
export function formatLog(start, end, format) {
  // iterate
  let log = [start, end];
  for (let i = 0; i < log.length; i++) {
    let logValue = log[i];

    // if end is not yet logged, return empty string
    if (!logValue) {
      log[i] = '';
      continue;
    } else {
      logValue = moment(logValue);
    }

    // start formatting with seconds, so if seconds rounds to the next minute, minutes is handled after
    for (const type of ['seconds', 'minutes']) {
      // continue if no format given
      if (format[type] == null) continue;

      const formatValue = format[type];
      // duration is recalculated on each step in case the seconds are rounded to the next minute
      const durationValue = durationOfType(logValue, type);
      // get the closest negative and positive changes
      let negClosest;
      let posClosest;

      // if the format is 00, the result should be 00
      if (formatValue === 0) {
        negClosest = -1 * durationValue;
        posClosest = 60 + negClosest;
      } else {
        negClosest = -1 * durationValue % formatValue;
        posClosest = formatValue + negClosest;
      }

      // format values over thirty will have a positive closest value greater than the negative closest 
      // value if the log time is greater than the format value => (*(60 - log time)* + format value)
      if (formatValue > 30 && formatValue < durationValue) {
        logValue.add(negClosest)
      } else {
        // otherwise, add the smallest difference
        if (Math.abs(negClosest) < Math.abs(posClosest))
          logValue.add(negClosest, type);
        else {
          logValue.add(posClosest, type);
        }
      }
    }
    log[i] = logValue;
  }

  log[0] = log[0].format('MM-DD-YYYY h:mm:ss a');
  if (log[1]) log[1] = log[1].format('MM-DD-YYYY h:mm:ss a');
  // else, end is an empty string
  return `${log[0]} - ${log[1]}`;
};

export function updateListWithUpdatedLogs(logList, updatedLogs) {
  let idx1 = 0;
  let idx2 = 0;

  const helperSort = (a, b) => a > b ? -1 : a === b ? 0 : 1;
  logList.sort((a, b) => helperSort(a.id, b.id));
  updatedLogs.sort((a, b) => helperSort(a.id, b.id));

  while (idx1 < updatedLogs.length) {
    if (logList[idx2].id === updatedLogs[idx1].id) {
      logList[idx2] = updatedLogs[idx1];
      idx1++;
      idx2++;
    } else {
      idx2++;
    }
  }
  return logList;
}