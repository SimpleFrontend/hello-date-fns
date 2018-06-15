// @flow

import React from 'react';
import axios from 'axios';

import { ALL_SUBMISSIONS_BASE_URL as SUBBMISSION_URL } from '../appConfig';

export type Submission = {
  tag: string,
  timeStamp: number,
  url: string,
  stage: number,
};

type Props = { stage: number, tag: string };
type State = { submissions: Submission[], error: Error, isLoading: boolean };

const SubmissionsContext = React.createContext([]);

export const SubmissionsComsumer = SubmissionsContext.Consumer;

export class SubmissionsProvider extends React.Component<Props, State> {
  static defaultProps = {
    stage: '',
    tag: '',
  };
  state = {
    submissions: [],
    error: null,
    isLoading: false,
  };
  componentDidMount() {
    this.getSubmissions();
  }
  componentDidUpdate(preProps) {
    if (
      preProps.stage !== this.props.stage ||
      preProps.tag !== this.props.tag
    ) {
      this.getSubmissions();
    }
  }

  getSubmissions = async () => {
    const { stage, tag } = this.props;
    const encodedTag = tag ? encodeURIComponent(tag.trim()) : '';
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(
        `${SUBBMISSION_URL}?stage=${stage}&tag=${encodedTag}`,
      );
      this.setState(state => ({
        ...state,
        submissions: data,
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      // eslint-disable-next-line
      console.error('The API does not seem to work.', error);
      this.setState(state => ({
        ...state,
        submissions: null,
        error,
        isLoading: false,
      }));
    }
  };

  render() {
    const { submissions, error, isLoading } = this.state;
    const { children } = this.props;
    return (
      <SubmissionsContext.Provider value={{ submissions, error, isLoading }}>
        {children}
      </SubmissionsContext.Provider>
    );
  }
}
