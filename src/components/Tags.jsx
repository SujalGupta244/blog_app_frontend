import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'

export const Tags = (props) => {
    const {tags, showTagBlogs} = props;
  return (
    <>
        <Box display="flex" textColor="secondary" sx={{backgroundColor:'#eee'}} padding="1rem" margin="auto" className="tags" justifyContent="center">
            <Tabs textColor="inherit" >
                <Tab label={"All"} onClick={() =>showTagBlogs('all')}/>
                {tags.map((tag,index)=>{
                return (
                    <>
                    <Tab key={index} label={tag} onClick={()=>showTagBlogs(tag)}/>
                    </>
                )
                })}
                
            </Tabs>
        </Box>
    </>
  )
}
