import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";
// paper creates a wide style div that looks like a paper
// && same as ? : ternary if second value is null dont use ? : rather use &&
// since more than 1 field in form is kinf of similar. then we will create a custom componet i.e. (Generalized ip field) which we can use
//whenever u r changing a state using a previous state u need to use callback function
import { GoogleLogin } from '@react-oauth/google';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import Input from './Input';
import Icon from './Icon';
import { signup, signin } from '../../actions/auth';
// ?. is an optional chaining operator it will not throw an error if we dont have access to res object, if used . then if res
//not there it will throw error

const initialState = { firstName : '', lastName : '', email: '', password : '', confirmPassword : ''};

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault(); // to prevent default behaviour of browser to refresh, it is always use in react on submit
      
      if(isSignup){
        dispatch(signup(formData, navigate)) // navigate so that we can navigate somewhere easily
      }
      else{
        dispatch(signin(formData, navigate))
      }

    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name] : e.target.value }); // only change the specific value from array thats y used []
    ;}

    const handleShowPassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword); // toggling the state
    };

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    };

    const googleSuccess = async (res) => {
      console.log(res);
      const result = jwtDecode(res.credential); // it will not throw error if not present and will simply say undefined
      //const result = res?.profileObj; 
      const token = res?.access_token;

      try {
        dispatch({ type : 'AUTH', data : { result, token }}); // we want to save in local storage so that when we refresh page, it knows that a user is log in

        // we want it to be redirected back to home
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
    const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign In was unsuccessful. Try Again Later");
    };

  return (
    <Container component = "main" maxWidth="xs">
      <Paper sx = {{marginTop : (theme) => theme.spacing(8), display : 'flex', flexDirection : 'column', alignItems : 'center', padding : (theme) => theme.spacing(2)}} elevation = {3}>
        <Avatar sx = {{ margin: (theme) => theme.spacing(1), backgroundColor: (theme) => theme.palette.secondary.main }}>
          <LockIcon />
        </Avatar>
        <Typography variant = "h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form sx = {{ width : '100%', marginTop : (theme) => theme.spacing(3) }} onSubmit = {handleSubmit}>
          <Grid container spacing = {2}>
            {
              isSignup && (
                <>
                  <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half/>
                  <Input name = "lastName" label = "Last Name" handleChange = {handleChange} half/>

                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type = "email"/>
            <Input name="password" label="Password" handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type = "password"/> }
          </Grid>
          <Button type = "submit" fullWidth variant="contained" color = "primary" sx = {{ margin: (theme) => theme.spacing(3, 0, 2) }}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin 
              onSuccess={googleSuccess}
              onError={googleFailure}
              
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign In' : "Dont't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth