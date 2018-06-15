import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const NoPageFound = () => (
  <div>
    <Icon type="" />
    You might have got lost...You can:
    <ul>
      <li>
        <Link to="/">check your records</Link>
      </li>
      <li>
        <Link to="/all-submissions">view all submissions</Link>
      </li>
    </ul>
  </div>
);

export default NoPageFound;
