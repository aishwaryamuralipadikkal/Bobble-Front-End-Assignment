import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { pink } from 'material-ui/styles/colors';
import { lightBlue100,pink200,lightBlack} from 'material-ui/styles/colors';
import { blue, red } from 'color-name';
import logo from './bobble.png';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var apiBaseUrl = "http://localhost:4000/api/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0){
      var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email_id":this.state.email,
      "password":this.state.password,
      "role":role
      }
      axios.post(apiBaseUrl+'/register', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code === 200){
        //  console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
          });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
  
    return (
      <div>
        <MuiThemeProvider>
          <div>
            
          <AppBar
             title={<img src={logo} alt="Bobble" style={{border: 3,width: 85, height:65, align:"center"}}/>}
           />
           <h3 style={{color:lightBlue100, align:"center"}}><u>SIGN UP</u></h3>
           <p style={{color:lightBlue100,fontSize:50,fontWeight:1}}> Create your account</p>
           <p style={{color:pink200,fontSize:20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email ID"
             floatingLabelText="Email ID"
             onChange = {(event,newValue) => this.setState({email_id:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <p> By clicking Sign Up, you agree to our <em style={{color:lightBlue100}}>Terms Of Use </em> and <em style={{color:lightBlue100}}>Privacy Policy</em></p>
           <RaisedButton label="SIGN UP" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)} fullWidth/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
