import React from 'react';

import '../css/SideHeader.css';

const SideHeader = props => {
  const content = <aside className="side-header">{props.children}</aside>;
  return content
};

export default SideHeader;