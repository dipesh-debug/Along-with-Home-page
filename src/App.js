import React, { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Video from "./components/Video/Video";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { actionTypes, useStateValue } from "./store";
import { useCookies } from "react-cookie";
import PasswordReset from "./components/PasswordReset/Password";
import "./App.css"
import About from "./components/About/About";
import Hero from "./components/Hero/Hero";

export function App(){
const queryClient = new QueryClient();

  const [cookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const setToken = () => {
      const { jwt } = cookie;
      if (jwt) {
        dispatch({ type: actionTypes.SET_TOKEN, value: jwt });
      }
    };
    if (token === null) {
      setToken();
    }
  }, [dispatch, token, cookie]);

  return (
    <div className ="App">
      <QueryClientProvider client={queryClient}>
        <Router>
        <Routes>
          <Route  path = "/" element ={<LandingPage/>}/>
          <Route  path = "/login" element ={<Login/>}/>
          <Route  path = "/signup" element ={<Signup/>}/>
          <Route path="/home" element={token ? <Home /> : <Navigate replace to="/login" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate replace to="/login" />} />
          <Route  path="/forgotpassword"  element={ <Forgotpassword/> } />
          <Route  path="/stream"  element={token ? <Hero /> : <Navigate replace to="/login" />} />
          <Route  path="/video"  element={token ? <Video /> : <Navigate replace to="/login" />} />
          <Route path="/about" element={token ? <About /> : <Navigate replace to="/login" />} />
        </Routes></Router>

         

            
          
        
      </QueryClientProvider>
      
      </div>
    
  );
};


export default App;
