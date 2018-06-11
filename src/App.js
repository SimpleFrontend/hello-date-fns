import React from 'react';
import { Timeline, Card } from 'antd';

import DataProvider, { DataContext } from './DataProvider';

const App = () => (
  <DataProvider email="huang.m.chang@gmail.com">
    <DataContext.Consumer>
      {records => (
        <Card>
          <Timeline>
            {records.map(record => (
              <Timeline.Item key={record.timeStamp}>
                <ul>
                  <li>{record.mail}</li>
                  <li>{record.stage}</li>
                  <li>{record.tag}</li>
                  <li>{record.timeStamp}</li>
                  <li>{record.url}</li>
                </ul>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      )}
    </DataContext.Consumer>
  </DataProvider>
);

export default App;
