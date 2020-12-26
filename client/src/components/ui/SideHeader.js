import React from 'react';
import ReactDOM from 'react-dom';

import '../css/SideHeader.css';

const SideHeader = props => {
  const content = <aside className="side-header">{props.children}</aside>;
  return content
};

export default SideHeader;