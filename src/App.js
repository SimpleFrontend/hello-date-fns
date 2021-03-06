import React, { Fragment } from 'react';
import { css } from 'react-emotion';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, Icon, Card } from 'antd';

import PersonalRecords from './PersonalRecords/PersonalRecords';
import AllSubmissions from './AllSubmissions/AllSubmissions';
import NoPageFound from './NoPageFound';

const cardClassName = css({
  margin: '20px auto',
  maxWidth: 800,
  minHeight: 'calc(100vh - 80px)',
});

const App = () => (
  <Fragment>
    <Card title="Front-end Challenges" className={cardClassName}>
      <Menu mode="horizontal">
        <Menu.Item key="personal-record">
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Icon type="user" />Personal Records
          </Link>
        </Menu.Item>
        <Menu.Item key="all-subbmissions">
          <Link to={`${process.env.PUBLIC_URL}/all-submissions`}>
            <Icon type="profile" />All Submissions
          </Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={PersonalRecords}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/all-submissions`}
          component={AllSubmissions}
        />
        <Route component={NoPageFound} />
      </Switch>
    </Card>
    <p style={{ margin: '0 auto 10px auto', maxWidth: 800, fontSize: 12 }}>
      <a href="https://github.com/SimpleFrontend/hello-momentjs">
        https://github.com/SimpleFrontend/hello-momentjs
      </a>
    </p>
  </Fragment>
);

export default App;
