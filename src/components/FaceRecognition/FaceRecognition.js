import React from 'react';
import "./FaceRecognition.css"

const FaceRecognition = ({imageURL, box}) => {
  return(
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageURL} width='500px' id="inputImage" height='auto' alt=""/>
        <div className="bounding_box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>
      </div>
    </div>
  );
}

export default FaceRecognition;
