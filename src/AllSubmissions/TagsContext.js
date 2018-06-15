// @flow

import React from 'react';
import axios from 'axios';

import { ALL_TAGS_BASE_URL as TAG_URL } from '../appConfig';

type State = { allTags: string[], error: Error, isLoading: boolean };

const TagsContext = React.createContext([]);

export const TagsComsumer = TagsContext.Consumer;

export class TagsProvider extends React.Component<{}, State> {
  state = {
    allTags: [],
    error: null,
    isLoading: false,
  };
  componentDidMount() {
    this.getTags();
  }

  getTags = async () => {
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(TAG_URL);
      this.setState(state => ({
        ...state,
        allTags: data,
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      // eslint-disable-next-line
      console.error('The API does not seem to work.', error);
      this.setState(state => ({
        ...state,
        allTags: [],
        error,
        isLoading: false,
      }));
    }
  };

  render() {
    const { allTags, error, isLoading } = this.state;
    const { children } = this.props;
    return (
      <TagsContext.Provider value={{ allTags, error, isLoading }}>
        {children}
      </TagsContext.Provider>
    );
  }
}
