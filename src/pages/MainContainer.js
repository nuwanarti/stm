import React from 'react';
// import './MainContainer.css';

export const MainContainer = ({ children }) => {
  return <div className="main-container" style={{ marginTop: '100px'}}>{children}</div>;
};

export default MainContainer;
