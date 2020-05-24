// import React from 'react'
// import './Face.css'

// const Face = ({url,box}) =>{
// 	return(
// 		<div className='center ma'>
// 		<div className='absolute mt2'>
// 		<img alt='' src={url} width='500px' height='auto' id='inputImage'/>
// 		 <div className='bounding' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
// 		</div>
// 		);
// }

// export default Face;

import React from 'react';
import './Face.css';

const Face = ({ url, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={url} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      
    </div>
    </div>
  );
}

export default Face;