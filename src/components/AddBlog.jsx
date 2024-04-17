import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:5000/api/blog/add";

const labelStypes = {mb:1,mt:2, fontSize:'24px', fontWeight:"bold"}

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    title:'',
    description: '',
    tag: '',
    imageURL:''
  })
 
  const sendRequest = async() =>{
    const res = await axios.post(url,{
      title: inputs.title,
      description: inputs.description,
      tag: inputs.tag,
      image: inputs.imageURL,
      user: localStorage.getItem("userId")   // This need to be changed from localstorage to database
    })
    .catch(err =>console.log(err)) 

    const data = await res.data;
    return data;
  }

  const handleChange = (e) =>{
    const {value,name} = e.target;
    setInputs(prevState =>({
      ...prevState,
      [name]:value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    sendRequest()
    .then(() => navigate("/myBlogs"))
  }

  return (
    <div className='AddBlog'>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="rgba(9,9,121,1)" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"}
        marginTop={3} display="flex" flexDirection={'column'} width="80%">
          <Typography fontWeight={'bold'} padding={3} color="grey" variant="h2" textAlign="center">Post Your Blog</Typography>
          <InputLabel sx={labelStypes}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant='outlined'/>
          <InputLabel sx={labelStypes}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant='outlined'/>
          <InputLabel sx={labelStypes}>what type of blog it is?(Enter Tag)</InputLabel>
          <TextField name="tag" value={inputs.tag} onChange={handleChange} margin="normal" variant='outlined'/>
          <InputLabel sx={labelStypes}>ImageURL</InputLabel>
          <TextField name="imageURL" value={inputs.imageURL} onChange={handleChange} margin="normal" variant='outlined'/>
          <Button sx={{mt:3, borderRadius:4}} color="warning" type="submit" variant="contained" >Post</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog;