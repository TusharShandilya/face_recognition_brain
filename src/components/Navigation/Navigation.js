import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) =>{

    if(isSignedIn)
      {return (
        <nav style={{display:'flex',justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer underline'> Sign Out</p>
      </nav>);}
      else{
        return (
          <nav style={{display:'flex',justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer underline'> Sign In</p>
          <p onClick={() => onRouteChange('Register')} className='f3 link dim black pa3 pointer underline'> Register</p>
        </nav>
        );
      }

}


export default Navigation;
