import React from 'react';
import { css } from 'react-emotion';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, Icon, Card } from 'antd';

import PersonalRecords from './PersonalRecords/PersonalRecords';
import AllSubmissions from './AllSubmissions/AllSubmissions';
import NoPageFound from './NoPageFound';

const cardClassName = css({ margin: '20px auto', maxWidth: 800 });

const App = () => (
  <Card title="Front-end Challenges" className={cardClassName}>
    <Menu mode="horizontal">
      <Menu.Item key="personal-record">
        <Link to="/">
          <Icon type="user" />Personal Record
        </Link>
      </Menu.Item>
      <Menu.Item key="all-subbmissions">
        <Link to="/all-submissions">
          <Icon type="profile" />All Submissions
        </Link>
      </Menu.Item>
    </Menu>
    <Switch>
      <Route exact path="/" component={PersonalRecords} />
      <Route exact path="/all-submissions" component={AllSubmissions} />
      <Route component={NoPageFound} />
    </Switch>
  </Card>
);

export default App;
