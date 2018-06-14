import React from 'react';
import { Row, Col } from 'antd';

import { DataProvider, DataComsumer } from './DataContext';
import EmailForm from './EmailForm';
import Results from './Results';
import Title from './Title';

class App extends React.Component {
  state = { email: null };
  onSubmit = email => {
    this.setState({ email });
  };
  render() {
    const { email } = this.state;
    const { onSubmit } = this;
    return (
      <Row>
        <Col span={6} />
        <Col span={12}>
          <Title />
          <EmailForm onSubmit={onSubmit} />
          <DataProvider email={email}>
            <DataComsumer>
              {({ data, error }) => (
                <Results records={data} email={email} error={error} />
              )}
            </DataComsumer>
          </DataProvider>
        </Col>
        <Col span={6} />
      </Row>
    );
  }
}

export default App;
