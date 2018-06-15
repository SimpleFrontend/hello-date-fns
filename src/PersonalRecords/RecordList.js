import React from 'react';
import styled, { css } from 'react-emotion';
import * as moment from 'moment-timezone';

import { Timeline, Card, Divider, Tag, Row as AntRow } from 'antd';
import Avatar from '../components/Avatar';

import { getLocalTime, isInTime, getPeriods } from '../timeUtils';

const cardClassName = css({ marginTop: 20, marginBottom: 20 });
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

const Row = styled(AntRow)({ marginBottom: 4 });

const getSubmissionTimeString = timeStamp => {
  const { date, time } = getLocalTime({ timeStamp });
  return `${date} ${time}`;
};

const getRecordItem = ({ record, period }) => {
  const { stage, tag, url, timeStamp, open } = record;
  const submissionTime = getSubmissionTimeString(timeStamp);
  const status = isInTime({ timeStamp, stage }) ? 'success' : 'failure';
  const tags = tag.split(',').map(item => item.trim());
  return (
    <Timeline.Item key={timeStamp} color={STATUS_COLORS[status]}>
      <h4>{`Stage ${stage}: ${getPeriodsText(period)}`}</h4>
      <Row>
        <Tag color={STATUS_COLORS[status]}> {status} </Tag>
        <span>{`submitted at ${submissionTime}`}</span>
      </Row>
      <Row>
        {tags.map(tagElement => <Tag key={tagElement}>{tagElement}</Tag>)}
      </Row>
      {open && (
        <Row>
          <a href={url} target="_blank">
            {url}
          </a>
        </Row>
      )}
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

const Content = ({ records }) => (
  <Timeline>
    {records &&
      periods.map(period => {
        const foundRecords = records.filter(
          record => +record.stage === +period.key,
        );
        return foundRecords.length > 0
          ? foundRecords.map(record => getRecordItem({ period, record }))
          : getNoneRecordItem({ period });
      })}
  </Timeline>
);

const RecordList = ({ signUpInfo, signUpTotal, records, email }) => {
  const { nickName, timeStamp } = signUpInfo;
  return (
    <Card className={cardClassName}>
      <Card.Meta
        avatar={<Avatar size={avatarSize} />}
        title={`${nickName} (${email})`}
        description={`signed up at ${getSubmissionTimeString(
          timeStamp,
        )}. In total, there are ${signUpTotal} participants.`}
      />
      <Divider />
      <Content records={records} email={email} />
    </Card>
  );
};

export default RecordList;
