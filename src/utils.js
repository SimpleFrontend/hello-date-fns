import * as moment from 'moment-timezone';

const STAGES = {
  1: { start: '2018-06-04', end: '2018-06-11' },
  2: { start: '2018-06-11', end: '2018-06-18' },
  3: { start: '2018-06-18', end: '2018-06-25' },
  4: { start: '2018-06-25', end: '2018-07-02' },
  5: { start: '2018-07-02', end: '2018-07-09' },
  6: { start: '2018-07-09', end: '2018-07-16' },
  7: { start: '2018-07-16', end: '2018-07-23' },
  8: { start: '2018-07-23', end: '2018-07-30' },
  9: { start: '2018-07-30', end: '2018-08-06' },
};

const convertToMoment = date => moment(`${date} 12:00`, 'YYYY-MM-DD HH:mm');

export const isInTime = ({ timeStamp, stage }) => {
  const submission = moment(timeStamp);
  const start = convertToMoment(STAGES[stage].start);
  const end = convertToMoment(STAGES[stage].end);
  return submission <= end && submission > start;
};

export const getLocalTime = ({ timeStamp, timezone = 'Asia/Taipei' }) => {
  const dateInString = moment(timeStamp)
    .tz(timezone)
    .format();
  const regex = /(.*)T(.*)\+.*/g;
  const matches = regex.exec(dateInString);
  return { date: matches[1], time: matches[2] };
};
