import React, { Fragment } from 'react';
import { Card, Spin } from 'antd';
import { css } from 'react-emotion';

import { RecordsProvider, RecordsComsumer } from './RecordsContext';
import ErrorMessage from '../components/ErrorMessage';
import EmailForm from './EmailForm';
import RecordList from './RecordList';
import Avatar from '../components/Avatar';

const avatarSize = 60;
const cardClassName = css({ marginTop: 20, marginBottom: 20 });
const spinClassName = css({ width: '100%' });

class PersonalRecords extends React.Component {
  state = { email: null };
  onSubmit = email => {
    this.setState({ email });
  };
  render() {
    const { email } = this.state;
    const { onSubmit } = this;
    return (
      <Fragment>
        <EmailForm onSubmit={onSubmit} />
        <RecordsProvider email={email}>
          <RecordsComsumer>
            {({ signUpInfo, signUpTotal, records, error, isLoading }) => (
              <Fragment>
                {signUpInfo &&
                  (signUpInfo.success ? (
                    <RecordList
                      signUpInfo={signUpInfo}
                      signUpTotal={signUpTotal}
                      records={records}
                      email={email}
                    />
                  ) : (
                    <Card className={cardClassName}>
                      <Card.Meta
                        avatar={<Avatar size={avatarSize} />}
                        title="It seems that you did not sign up..."
                        description="You can still check all the submissions!"
                      />
                    </Card>
                  ))}
                {isLoading && (
                  <Card className={cardClassName}>
                    <Spin className={spinClassName} />
                  </Card>
                )}
                {error && (
                  <Card className={cardClassName}>
                    <ErrorMessage />
                  </Card>
                )}
              </Fragment>
            )}
          </RecordsComsumer>
        </RecordsProvider>
      </Fragment>
    );
  }
}

export default PersonalRecords;
