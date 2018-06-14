import * as moment from 'moment-timezone';

const TIMEZONE = 'Asia/Taipei';

const PERIODS = {
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

const convertToMoment = (date, timezone = TIMEZONE) =>
  moment.tz(`${date} 12:00`, timezone);

export const getPeriod = ({ stage }) => {
  const start = convertToMoment(PERIODS[stage].start);
  const end = convertToMoment(PERIODS[stage].end);
  return { start, end };
};

export const getPeriods = (periods = PERIODS) =>
  Object.entries(periods)
    .map(([key, { start, end }]) => ({
      key,
      start: convertToMoment(start),
      end: convertToMoment(end),
    }))
    .sort((a, b) => +a.key - +b.key);

export const isInTime = ({ timeStamp, stage }) => {
  const submission = moment(timeStamp);
  const { start, end } = getPeriod({ stage });
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
