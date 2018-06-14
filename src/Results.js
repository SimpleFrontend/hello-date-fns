import React, { Fragment } from 'react';
import { css } from 'react-emotion';

import { Timeline, Card, Divider, Tag, Spin } from 'antd';
import Avatar from './Avatar';

import { getLocalTime, isInTime } from './utils';
import ErrorMessage from './ErrorMessage';

const cardClassName = css({ maxWidth: 1024, margin: '40px auto' });
const avatarSize = 60;

const Content = ({ records, email }) => (
  <Fragment>
    <Card.Meta
      avatar={<Avatar size={avatarSize} />}
      title={email}
      description="Your records for the front-end challenges"
    />
    <Divider />
    <Timeline>
      {records.map(record => {
        const { stage, tag, url, timeStamp } = record;
        const { date, time } = getLocalTime(timeStamp);
        const submissionTime = `${date} ${time}`;
        const status = isInTime({ timeStamp, stage }) ? 'success' : 'failure';
        const tags = tag.split(',').map(item => item.trim());
        const color = status === 'success' ? 'green' : 'red';
        return (
          <Timeline.Item key={record.timeStamp} color={color}>
            <h4>{`Stage ${stage} - ${status}`}</h4>
            {tags.map(tagElement => <Tag key={tagElement}>{tagElement}</Tag>)}
            <ul>
              <li>{submissionTime}</li>
              <li>
                <a href={url} target="_blank">
                  {url}
                </a>
              </li>
            </ul>
          </Timeline.Item>
        );
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
