import React, { useEffect, useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const getBlogUrl = `${process.env.REACT_APP_BACKEND_LINK}/api/blog/`;
const editBlogUrl = `${process.env.REACT_APP_BACKEND_LINK}/api/blog/update/`;


const labelStypes = {mb:1,mt:2, fontSize:'24px', fontWeight:"bold"}

const BlogDetail = () => {
  const {blogId} = useParams();
  const navigate = useNavigate();

  const [inputs,setInputs] = useState({
    title:'',
    description: '',
    image:''
  })
 

  const getBlogDetails = async()=>{
    const res = await axios.get(`${getBlogUrl}${blogId}`)
    .catch(err => console.log(err))
    const data = await res.data;
    // console.log(data);
    return data;
  }
 
  const editRequest = async() =>{
    const res = await axios.put(`${editBlogUrl}${blogId}`,{
      title: inputs.title,
      description: inputs.description,
      // image: inputs.image,
      // user: localStorage.getItem("userId")  // this will not be saved in localstorage and should be saved somehow in redux state and should be imported from there
    })
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

  useEffect(()=>{
    getBlogDetails()
    .then((data)=> setInputs(data.blog))
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    // console.log(inputs);
    editRequest()
    .then(() => navigate("/myBlogs"))
  }
  return (
    <div className='EditBlog' style={{height:"100vh"}}>
      {inputs &&
        <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="rgba(9,9,121,1)" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"}
        marginTop={3} display="flex" flexDirection={'column'} width="80%">
          <Typography fontWeight={'bold'} padding={3} color="grey" variant="h2" textAlign="center">Post Your Blog</Typography>
          <InputLabel sx={labelStypes}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant='outlined'/>
          <InputLabel sx={labelStypes}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant='outlined'/>
          {/* <InputLabel sx={labelStypes}>ImageURL</InputLabel>
          <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant='outlined'/> */}
          <Button sx={{mt:3, borderRadius:4}} color="warning" type="submit" variant="contained" >Post</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetail