import React, { Fragment } from 'react';
import { SubmissionsProvider, SubmissionsComsumer } from './SubmissionsContext';
import FilterForm from './FilterForm';
import SubmissionList from './SubmissionList';
import { TagsComsumer, TagsProvider } from './TagsContext';

class AllSubmissions extends React.Component {
  state = { stage: '', tag: '' };
  onSubmit = ({ stage, tag }) => {
    console.log(stage, tag);
    this.setState({ stage, tag });
  };
  render() {
    const { stage, tag } = this.state;
    const { onSubmit } = this;
    return (
      <Fragment>
        <TagsProvider>
          <TagsComsumer>
            {({ allTags, error, isLoading }) => (
              <FilterForm
                allTags={allTags}
                onSubmit={onSubmit}
                error={error}
                isLoading={isLoading}
              />
            )}
          </TagsComsumer>
        </TagsProvider>
        <SubmissionsProvider stage={stage} tag={tag}>
          <SubmissionsComsumer>
            {({ submissions, error, isLoading }) => (
              <Fragment>
                <SubmissionList
                  submissions={submissions}
                  error={error}
                  isLoading={isLoading}
                />
              </Fragment>
            )}
          </SubmissionsComsumer>
        </SubmissionsProvider>
      </Fragment>
    );
  }
}

export default AllSubmissions;
