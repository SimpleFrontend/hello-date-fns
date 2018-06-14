// @flow

import React from 'react';
import axios from 'axios';

const BASE_URL = 'https://www.thef2e.com/api';
const URL = `${BASE_URL}/stageCheck`;

type Record = {
  mail: string,
  stage: number,
  tag: string,
  timeStamp: number,
  url: string,
};

type Props = { email: string };
type State = { data: Record[] };

const DataContext = React.createContext([]);

export const DataComsumer = DataContext.Consumer;

export class DataProvider extends React.Component<Props, State> {
  state = {
    data: null,
    error: null,
  };
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(preProps) {
    if (preProps.email !== this.props.email) {
      this.getData();
    }
  }
  getData = async () => {
    const { email } = this.props;
    try {
      const { data } = await axios.post(URL, { email });
      this.setState(state => ({ ...state, data, error: null }));
    } catch (error) {
      // eslint-disable-next-line
      console.error('The API does not seem to work.', error);
      this.setState(state => ({ ...state, data: null, error }));
    }
  };

  render() {
    const { data, error } = this.state;
    const { children } = this.props;
    return (
      <DataContext.Provider value={{ data, error }}>
        {children}
      </DataContext.Provider>
    );
  }
}
