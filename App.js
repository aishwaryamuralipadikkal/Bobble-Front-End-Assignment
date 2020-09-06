import React, { Component } from 'react';
import './App.css';
import Register from './Register';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      registerPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var registerPage =[];
    registerPage.push(<Register appContext={this} key={"register-screen"}/>);
    this.setState({
                  registerPage:registerPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.registerPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}

export default App;
