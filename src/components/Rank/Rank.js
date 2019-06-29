import React from 'react';


const Rank = ({name, enteries}) => {
  return(
    <div className="">
      <div className="white f2">{`${name}, Your current entry count is `}</div>
      <div className="white f1">{enteries}</div>
    </div>
  );
}

export default Rank;
