import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react'

const Footer = () => {
  return (
    <>
        {/* <div>Footer</div> */}
        <Box color="primary" sx={{backgroundColor:'rgb(29, 27, 27)'}} padding="1rem" margin="auto" className="footer" justifyContent="center">
        {/* <Tabs textColor="inherit" >
            <Tab  />
        </Tabs> */}
        <Typography variant="h4">Footer</Typography>
        </Box>
      
    </>
  )
}

export default Footer;