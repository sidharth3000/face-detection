import React from 'react'
import './Form.css'

const Form = ({onInputChange,onSubmit}) =>{
	return(
		<div>
		<p className='f3'>
		{'This smart brain can detect your faces. Give it a try!!!'}
		</p>
		<div className='center'>
		<div className='pa4 br3 shadow-5 center form'>
		<input className="f4 pa2 w-70 center" type='text' onChange={onInputChange} />
		<button className='w-30 grow f4 link ph3 pv2 dib white bg-green' style={{borderColor:'white'}} onClick={onSubmit}>DETECT</button>
		</div>
		</div>
		</div>
		);
}

export default Form;