// @flow

import React from 'react';
import axios from 'axios';

import {
  PERSONAL_RECORDS_BASE_URL as RECORDS_URL,
  SIGNUP_BASE_URL as SIGNUP_URL,
  SIGNUP_TOTAL_BASE_URL as SIGNUP_TOTAL_URL,
} from '../appConfig';
import { Submission } from '../AllSubmissions/SubmissionsContext';

type Record = Submission & {
  mail: string,
  open: boolean,
};

type SignUpInfo = {
  success: boolean,
  message: string,
  nickName: string,
  timeStamp: numbber,
};

type Props = { email: string };
type State = {
  records: Record[],
  signUpInfo: SignUpInfo,
  signUpTotal: number,
  error: Error,
  isLoading: boolean,
};

const RecordsContext = React.createContext([]);

export const RecordsComsumer = RecordsContext.Consumer;

const post = url => async email => {
  const { data } = await axios.post(url, { email });
  return data;
};

const getSignUpTotal = async () => {
  const { data } = await axios.get(SIGNUP_TOTAL_URL);
  return data.total;
};

export class RecordsProvider extends React.Component<Props, State> {
  state = {
    records: null,
    signUpInfo: null,
    signUpTotal: null,
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
    this.setState(state => ({ ...state, isLoading: true }));

    try {
      const getSingUpInfo = post(SIGNUP_URL);
      const getRecords = post(RECORDS_URL);
      const [signUpInfo, records, signUpTotal] = await Promise.all([
        getSingUpInfo(email),
        getRecords(email),
        getSignUpTotal(),
      ]);
      this.setState(state => ({
        ...state,
        records,
        signUpInfo,
        signUpTotal,
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      // eslint-disable-next-line
      console.error('The API does not seem to work.', error);
      this.setState(state => ({
        ...state,
        records: null,
        signUpInfo: null,
        signUpTotal: null,
        error,
        isLoading: false,
      }));
    }
  };

  render() {
    const { children } = this.props;
    return (
      <RecordsContext.Provider value={{ ...this.state }}>
        {children}
      </RecordsContext.Provider>
    );
  }
}
