import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';

const userBlogUrl = 'http://localhost:5000/api/blog/user/';

const UserBlogs = () => {
  const [user,setUser] = useState([]);
  const userId = localStorage.getItem("userId");

  const sendRequest = async ()=>{
    const res = await axios.get(`${userBlogUrl}${userId}`)
    .catch(err => console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(()=>{
    sendRequest()
    // .then(data => console.log(data))
    .then(data => setUser(data.userBlogs))
  },[])
  // console.log(user);


  return (
    <div className='UserBlogs'>
      {user && user.blogs && 
      user.blogs.map((blog,index)=>{
        return <Blog {...blog} isUser={true} key={index} user={user}/>
      })
      }
    </div>
  )
}

export default UserBlogs;