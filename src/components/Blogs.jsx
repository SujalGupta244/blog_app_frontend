import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Tags } from './Tags';
import { useSelector } from 'react-redux';

// const url = "http://localhost:5000/api/user/refresh";
const blogsUrl = `${process.env.REACT_APP_BACKEND_LINK}/api/blog`;


const Blogs = () => {
  const [blogs,setBlogs] = useState([]);
  const [tagBlogs,setTagBlogs] = useState([]);
  const [tags,setTags] = useState([]);
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  const sendRequest = async() =>{
    const res = await axios.get(blogsUrl)
    .catch(err => console.log(err))
    const data = await res?.data;
    return data;
  }
  
  useEffect(()=>{
    sendRequest()
    .then((data)=> {
      const newSet = new Set();
      data.blogs.forEach(blog =>{
        newSet.add(blog.tag)
      })
      setTags(Array.from(newSet));
      setBlogs(data.blogs);
      setTagBlogs(data.blogs);
    })
  },[])

  const showTagBlogs = (tag)=>{
    if(tag === 'all'){
      setTagBlogs(blogs);
    }else{
      const blog = blogs.filter(blog => blog.tag === tag)
      setTagBlogs(blog);
    }
  }


  return (
    <>{
      !isLoggedIn ?
      <Box display="flex" alignItems='center' justifyContent="center" height='90vh'>
        <Typography  variant="h3" sx={{textAlign:'center'}}>
          You need to signup/login first
          <br />
          to see the content
        </Typography>
      </Box>
      :
      <div className='blogs'>
        <Tags tags={tags} showTagBlogs={showTagBlogs}/>
        {tagBlogs && 
          tagBlogs.map((blog,index)=>{
            
            return <Blog isUser={localStorage.getItem('userId') === blog.user._id}
            {...blog} key={index}/>
          })
      }
      </div>
      }
    </>
  )
}

export default Blogs;