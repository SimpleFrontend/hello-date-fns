import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

import Title from './components/Title';
import PersonalRecords from './PersonalRecords/PersonalRecords';
import AllSubmissions from './AllSubmissions/AllSubmissions';
import NoPageFound from './NoPageFound';

const App = () => (
  <Row>
    <Col span={6} />
    <Col span={12}>
      <Title />
      <Switch>
        <Route exact path="/" component={PersonalRecords} />
        <Route exact path="/all-submissions" component={AllSubmissions} />
        <Route component={NoPageFound} />
      </Switch>
    </Col>
    <Col span={6} />
  </Row>
);

export default App;
