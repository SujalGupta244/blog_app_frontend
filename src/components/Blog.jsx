import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const deleteBlogURL = 'http://localhost:5000/api/blog/';

const Blog = (props) => {
    const navigate = useNavigate();

    const {_id,title,description,image,tag,user, isUser} = props;

    const deleteRequest = async() =>{ 
        const res = await axios.delete(`${deleteBlogURL}${_id}`)
        .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }

    const handleDelete = () =>{
      deleteRequest()
      .then(() => navigate('/blogs'))
      .then(() => navigate('/'))
    }

  return (
    <Card sx={{ maxWidth: 900 , margin:"auto",mt:4,mb:8, padding: 2,boxShadow:'5px 5px 10px #ccc',
    ":hover":{boxShadow:"10px 10px 20px #ccc"}}} 
    >
      {isUser && 
      <Box display="flex">
        {/* Only able to see these options when he is LoggedIn */}
          <IconButton sx={{marginLeft: "auto"}} LinkComponent={Link} to={`/myBlogs/${_id}`}><EditIcon color="warning"/></IconButton>
          <IconButton onClick={handleDelete}><DeleteForeverIcon color="error"/></IconButton>
      </Box>
      }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {user.name.charAt(0)}
          </Avatar>
        }
        
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="400"
        image={image}
        alt="Paella dish"
      />
      <br />
      <hr />
      {/* <br /> */}
      <CardContent>
        <Typography sx={{marginBottom:"1rem"}}  variant="body2" color="text.secondary" >
          <b style={{backgroundColor:"#eee",width:'20%',padding:'0.4rem',textTransform:'capitalize'}}>{tag}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>{user.name}</b> : {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Blog