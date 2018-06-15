import React from 'react';
import { css } from 'react-emotion';

const titleClassName = css({
  marginTop: 40,
  display: 'flex',
});

const Title = () => (
  <div className={titleClassName}>
    <h1>Front-end Challenges</h1>
  </div>
);

export default Title;
