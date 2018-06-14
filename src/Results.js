import React, { Fragment } from 'react';
import { css } from 'react-emotion';
import * as moment from 'moment-timezone';

import { Timeline, Card, Divider, Tag, Spin, Row } from 'antd';
import Avatar from './Avatar';

import { getLocalTime, isInTime, getPeriods } from './utils';
import ErrorMessage from './ErrorMessage';

const cardClassName = css({ maxWidth: 1024, margin: '40px auto' });
const avatarSize = 60;
const periods = getPeriods();
const getPeriodDate = momentObject => momentObject.format().split('T')[0];
const getPeriodsText = ({ start, end }) =>
  `${getPeriodDate(start)} - ${getPeriodDate(end)}`;

const STATUS_COLORS = {
  success: '#87d068',
  failure: '#f50',
  ongoing: '#108ee9',
  locked: '#444',
};

const getSubmissionTimeString = timeStamp => {
  const { date, time } = getLocalTime({ timeStamp });
  return `${date} ${time}`;
};

const getRecordItem = ({ foundRecord, period }) => {
  const { stage, tag, url, timeStamp, open } = foundRecord;
  const submissionTime = getSubmissionTimeString(timeStamp);
  const status = isInTime({ timeStamp, stage }) ? 'success' : 'failure';
  const tags = tag.split(',').map(item => item.trim());
  return (
    <Timeline.Item key={period.start.format('x')} color={STATUS_COLORS[status]}>
      <h4>{`Stage ${stage}: ${getPeriodsText(period)}`}</h4>
      <Row>
        <Tag color={STATUS_COLORS[status]}> {status} </Tag>
        <span>{`submitted at ${submissionTime}`}</span>
      </Row>
      <Row>
        {tags.map(tagElement => <Tag key={tagElement}>{tagElement}</Tag>)}
        {open && (
          <a href={url} target="_blank">
            {url}
          </a>
        )}
      </Row>
    </Timeline.Item>
  );
};

const getNoneRecordItem = ({ period }) => {
  const now = moment();
  const { start, end } = period;
  let status;
  if (now.isBefore(end) && now.isAfter(start)) status = 'ongoing';
  if (now.isAfter(end)) status = 'failure';
  if (now.isBefore(start)) status = 'locked';

  return (
    <Timeline.Item key={period.start.format('x')} color={STATUS_COLORS[status]}>
      <h4>{`Stage ${period.key}: ${getPeriodsText(period)}`}</h4>
      <Tag color={STATUS_COLORS[status]}> {status} </Tag>
    </Timeline.Item>
  );
};

const Content = ({ records, email }) => (
  <Fragment>
    <Card.Meta
      avatar={<Avatar size={avatarSize} />}
      title={email}
      description="Your records for the front-end challenges"
    />
    <Divider />
    <Timeline>
      {records &&
        periods.map(period => {
          const foundRecord = records.find(
            record => +record.stage === +period.key,
          );
          return foundRecord
            ? getRecordItem({ period, foundRecord })
            : getNoneRecordItem({ period });
        })}
    </Timeline>
  </Fragment>
);

const spinClassName = css({ width: '100%' });

const Results = ({ records, email, error }) => {
  const hasRecords = !error && records && records.length > 0;
  const isLoading = !error && email && !hasRecords;
  return (
    <Card className={cardClassName}>
      {hasRecords && <Content records={records} email={email} />}
      {isLoading && <Spin className={spinClassName} />}
      {error && <ErrorMessage />}
    </Card>
  );
};

export default Results;
