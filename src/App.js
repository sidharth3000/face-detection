import React, {Component}from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import Face from './components/face/Face.js';
import Form from './components/form/Form.js';
import Signin from './components/signin/Signin.js';
import Rank from './components/rank/Rank.js';
import Register from './components/register/Register.js';
import Particles from 'react-particles-js';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f7a219e2ffee491ca2350a1f10d7a339'
});

const particlesOptions={
particles: {
	number:{
		value:30,
		  density:{
			enable:true,
			  value_area:  300
			}
		}
	}
}


class App extends Component {
	constructor(){
		super();
		this.state={
			input:'',
			url:'',
			box:{},
			route:'signin',
			isSignedIn: false,
			user:{

			id:'',
			name: '',
			email: '',
			entries:0,
			joined: ''
			}
		}

	}

	loadUser =(data)=>{
		this.setState({user:{
			id:data.id,
			name: data.name,
			email: data.email,
			entries:data.entries,
			joined: data.joined
		}})
	}

	// componentDidMount(){
	// 	fetch('http://localhost:5000/')
	// 	.then(response=>response.json())
	// 	.then(console.log)
	// }

	calc=(data)=>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
  		}
	}

	displayFaceBox = (box) => {
    this.setState({box: box});

  }

	onInputChange = (event) =>{
		this.setState({input:event.target.value})
	}

	onSubmit =() =>{
		this.setState({url:this.state.input})
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL, 
			this.state.input)
		    .then(response=>{
		    	if(response)
		    		fetch('http//localhost:5000/image',{
		    			method:'put',
		    			headers:{'Content-Type':'application/json'},
		    			body:JSON.stringify({
		    				id:this.state.user.id
		    			})
		    		})
		    	this.displayFaceBox( this.calc(response))
		    })
			.catch(err => console.log(err));
	}

	onRouteChange = (route) =>{
		if(route === 'signout'){
			this.setState({isSignedIn:false})
		}else if (route === 'home'){
			this.setState({isSignedIn:true})
		}
		this.setState({route:route});
	}

	render(){
  return (
    <div className="App">
    <Particles className='particles'
	  params={particlesOptions}
	/>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home'
      ?<div>
      <Logo/>
      <Rank name={this.state.user.name}/>
      <Form onInputChange={this.onInputChange}  onSubmit={this.onSubmit}/>
      <Face url={this.state.url} box={this.state.box}/>
      </div>
      :(
      this.state.route === 'register'
      ?<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Signin onRouteChange={this.onRouteChange}/>
      )
      
  }
    </div>
  );
}
}

export default App;

