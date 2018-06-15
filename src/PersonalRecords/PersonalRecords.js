import React, { Fragment } from 'react';
import { RecordsProvider, RecordsComsumer } from './RecordsContext';
import EmailForm from './EmailForm';
import RecordList from './RecordList';

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
            {({ records, error }) => (
              <RecordList records={records} email={email} error={error} />
            )}
          </RecordsComsumer>
        </RecordsProvider>
      </Fragment>
    );
  }
}

export default PersonalRecords;
