import React from 'react';
import { Timeline, Card, Divider, Tag } from 'antd';
import { css } from 'react-emotion';

import Avatar from './Avatar';
import { DataProvider, DataComsumer } from './DataContext';
import { getLocalTime, isInTime } from './utils';

const cardClassName = css({ maxWidth: 1024, margin: '40px auto' });

const App = () => (
  <DataProvider email="huang.m.chang@gmail.com">
    <DataComsumer>
      {records => {
        const mail = records.length > 0 && records[0].mail;
        const avatarSize = 60;
        return (
          <Card className={cardClassName}>
            <Card.Meta
              avatar={<Avatar size={avatarSize} />}
              title={mail}
              description="Your records for the front-end challenges"
            />
            <Divider />
            <Timeline>
              {records.map(record => {
                const { stage, tag, url, timeStamp } = record;
                const { date, time } = getLocalTime(timeStamp);
                const submissionTime = `${date} ${time}`;
                const status = isInTime({ timeStamp, stage })
                  ? 'success'
                  : 'failure';
                const tags = tag.split(',').map(item => item.trim());
                const color = status === 'success' ? 'green' : 'red';
                return (
                  <Timeline.Item key={record.timeStamp} color={color}>
                    <h4>{`Stage ${stage} - ${status}`}</h4>
                    {tags.map(tagElement => <Tag>{tagElement}</Tag>)}
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
          </Card>
        );
      }}
    </DataComsumer>
  </DataProvider>
);

export default App;
