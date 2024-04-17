import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import Footer from './components/Footer';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  const {login} = authActions;
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(login());
    }
  },[dispatch])

  // console.log(isLoggedIn);
  return (
    <div className="blogapp" >
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Blogs/>}/>
          {!isLoggedIn ?
          <Route path="/auth" element={<Login/>}/> :
          <>
          <Route path="/blogs/add" element={<AddBlog/>}/>
          <Route path="/myBlogs" element={<UserBlogs/>}/>
          <Route path="/myBlogs/:blogId" element={<BlogDetail/>}/>
          </>
          }
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
