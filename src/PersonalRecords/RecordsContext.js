// @flow

import React from 'react';
import axios from 'axios';

import { PERSONAL_RECORDS_BASE_URL as URL } from '../appConfig';
import { Submission } from '../AllSubmissions/SubmissionsContext';

type Record = Submission & {
  mail: string,
  open: boolean,
};

type Props = { email: string };
type State = { data: Record[], error: Error, isLoading: boolean };

const RecordsContext = React.createContext([]);

export const RecordsComsumer = RecordsContext.Consumer;

export class RecordsProvider extends React.Component<Props, State> {
  state = {
    records: null,
    error: null,
    isLoading: false,
  };
  componentDidUpdate(preProps) {
    if (preProps.email !== this.props.email) {
      this.getRecords();
    }
  }
  getRecords = async () => {
    const { email } = this.props;
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.post(URL, { email });
      this.setState(state => ({
        ...state,
        records: data,
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      // eslint-disable-next-line
      console.error('The API does not seem to work.', error);
      this.setState(state => ({
        ...state,
        records: null,
        error,
        isLoading: false,
      }));
    }
  };

  render() {
    const { records, error, isLoading } = this.state;
    const { children } = this.props;
    return (
      <RecordsContext.Provider value={{ records, error, isLoading }}>
        {children}
      </RecordsContext.Provider>
    );
  }
}
