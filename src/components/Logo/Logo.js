import React from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";
import ai from './ai.png';


const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner">
          <img src={ai} className="pa3" alt="Logo"/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
