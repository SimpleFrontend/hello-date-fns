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
    data: [],
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const { email } = this.props;
    const { data } = await axios.post(URL, { email });
    this.setState(state => ({ ...state, data }));
  };

  render() {
    const { data } = this.state;
    const { children } = this.props;
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
  }
}
