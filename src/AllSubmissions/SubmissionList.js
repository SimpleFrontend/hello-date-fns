import React from 'react';
import { css } from 'react-emotion';

import { Card, Spin, List, Avatar, Tag } from 'antd';

import { getLocalTime } from '../timeUtils';
import ErrorMessage from '../components/ErrorMessage';

const cardClassName = css({ marginTop: 20, marginBottom: 20 });

const getSubmissionTimeString = timeStamp => {
  const { date, time } = getLocalTime({ timeStamp });
  return `${date} ${time}`;
};

const getTagComponents = (tagString: string) =>
  tagString.split(',').map(tag => {
    const cleanTag = tag.trim();
    return <Tag key={cleanTag}>{cleanTag}</Tag>;
  });

const Content = ({ submissions, loading }) => (
  <List
    itemLayout="vertical"
    dataSource={submissions}
    loading={loading}
    pagination
    renderItem={submission => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href={submission.url}>{submission.url}</a>}
          description={getSubmissionTimeString(submission.timeStamp)}
        />
        {getTagComponents(submission.tag)}
      </List.Item>
    )}
  />
);

const spinClassName = css({ width: '100%' });

const SubmissionList = ({ submissions, error, isLoading }) => (
  <Card className={cardClassName}>
    {!error && <Content submissions={submissions} loading={isLoading} />}
    {isLoading && <Spin className={spinClassName} />}
    {error && <ErrorMessage />}
  </Card>
);

export default SubmissionList;
