import React, { Fragment } from 'react';
import { SubmissionsProvider, SubmissionsComsumer } from './SubmissionsContext';
import FilterForm from './FilterForm';
import SubmissionList from './SubmissionList';

class AllSubmissions extends React.Component {
  state = { stage: '', tag: '' };
  onSubmit = ({ stage, tag }) => {
    this.setState({ stage, tag });
  };
  render() {
    const { stage, tag } = this.state;
    const { onSubmit } = this;
    return (
      <SubmissionsProvider stage={stage} tag={tag}>
        <SubmissionsComsumer>
          {({ submissions, error, isLoading, allTags }) => (
            <Fragment>
              <FilterForm
                allTags={allTags}
                onSubmit={onSubmit}
                error={error}
                isLoading={isLoading}
              />
              <SubmissionList
                submissions={submissions}
                error={error}
                isLoading={isLoading}
              />
            </Fragment>
          )}
        </SubmissionsComsumer>
      </SubmissionsProvider>
    );
  }
}

export default AllSubmissions;
