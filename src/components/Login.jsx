import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';


const Url = `${process.env.REACT_APP_BACKEND_LINK}/api/user/`

// fipoli2602@kixotic.com
// 12345678

// sotami6403@nubotel.com
// 12345678

const Login = () => {

  const [toSignUp,setToSignUp] = useState(false);
  const [inputs,setInputs] = useState({
    name:'',
    email: '',
    password:''
  })

  const dispatch = useDispatch();
  const {login} = authActions;
  const navigate = useNavigate();

  const sendRequest = async(type="login") =>{
    const res = await axios.post(`${Url}${type}`,{
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    })
    const data = await res.data;
    // console.log(data);
    return data;
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setInputs(prevState =>({
        ...prevState,
        [name]:value
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(toSignUp){
      sendRequest('signup')
      .then(data => localStorage.setItem("userId",data.user._id))
      .then(()=> dispatch(login()))
      .then(()=> navigate('/'))
    }else{
      sendRequest()
      .then(data => localStorage.setItem("userId",data.existingUser._id))
      // .then((data) => console.log(data))
      .then(()=> dispatch(login()))
      .then(()=> navigate('/'))
    }
  }


  return (
    <div>
      <form style={{height:"85vh"}} onSubmit={handleSubmit}>
        <Box 
        maxWidth={400}
        
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        boxShadow="0px 10px 20px #ccc" margin="auto" marginTop={5} 
        padding={3} borderRadius={5}>
          <Typography variant="h4" padding={3} textAlign="center">{toSignUp ?'SignUp':'Login'}</Typography>
          {toSignUp && <TextField name="name" value={inputs.name} onChange={handleChange} margin='normal' label="Name"/>}
          <TextField name="email" value={inputs.email} onChange={handleChange} type='email' margin='normal' label="Email"/>
          <TextField name="password" value={inputs.password} onChange={handleChange} type="password" margin='normal' label="Password"/>
          <Button type="submit" sx={{borderRadius: 3,marginTop: 3}} variant="contained">Submit</Button>
          <Button onClick={()=>setToSignUp(!toSignUp)} sx={{borderRadius: 3, marginTop: 2}} >Change to {toSignUp ? 'Login':'SignUp'}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Login