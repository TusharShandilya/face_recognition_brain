import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';


const particleOptions ={
    particles: {
      number: {
        value: 50,
        density:{
          enable: true,
          value_area: 700
        }
      },

    }
};

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user : {
    id: '',
    name: '',
    email: '',
    enteries: 0,
    joined: ''
  }
}


class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }



  loadUser = (data) => {
    this.setState({
      user : {
        id: data.id,
        name: data.name,
        email: data.email,
        enteries: data.enteries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});

    fetch('https://morning-plateau-22376.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
        })
      })
      .then(response => response.json())
       .then(response => {
          if(response){
          fetch('https://morning-plateau-22376.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {enteries: count}))
        })
        .catch(console.log)
      }
       this.displayFaceBox(this.calculateFaceLocation(response))
       })
       .catch(err => console.log(err));
     }


  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState)
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
  return (
    <div className="App">

      <Particles className="particles"
                params={particleOptions} />

      <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>

      {route === 'home' ?
      <div>
        <Logo />
        <Rank name={this.state.user.name}
        enteries={this.state.user.enteries} />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={box} imageURL={imageURL}/>
      </div> : (
           route === 'signin' ?     <SignIn
             loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
           :
           <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
      }



    </div>
  );
  }
}

export default App;
