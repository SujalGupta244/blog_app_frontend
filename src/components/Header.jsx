import React from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {

  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password: ''
  })
  const {logout} = authActions;
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [value,setValue] = useState(0);


  return (
    <AppBar position="sticky" sx={{background:"rgb(29,139,253)"}}>
        <Toolbar>
            <Typography variant="h4">WebBlogs</Typography>
            <Box display="flex" margin="auto">
              <Tabs textColor="inherit" value={value} onChange={(e,ind)=>setValue(ind)}>
                <Tab LinkComponent={Link} to="/" label="All Blogs"/>
              {isLoggedIn && 
              // {/* they need to stay even after the referesh i think by using redux */}
                <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"/>  
              }
              {isLoggedIn && 
              // {/* they need to stay even after the referesh using redux */}
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/> 
              }
              </Tabs>
            </Box>
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && 
                <>
                  <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin: 1,borderRadius: 2}} >Login</Button>
                  {/* <Button LinkComponent={Link} to="/signup" variant="contained" sx={{margin: 1,borderRadius: 2}} color="secondary">Signup</Button> */}
                </>
                }
                {isLoggedIn && <Button onClick={()=>dispatch(logout())} LinkComponent={Link} to="/auth" variant="contained" sx={{margin: 1,borderRadius: 2}} >Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}
// 
export default Header;