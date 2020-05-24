import React from 'react'

const Rank = ({name}) =>{
	return(
		<div>

		<div className='white f3'>
		{`${name}, your current rank is`}
		</div>
		<div className='white f1'>
		{'#5'}
		</div>
		
		</div>
		);
}

export default Rank;