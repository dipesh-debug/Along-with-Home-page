import React, { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

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
            {/* <Route path="/" exact={true}>
              {token ? <Home /> : <Navigate to="/login" />}
            </Route> */}
            <Route path="/" element={token ? <Home /> : <Navigate replace to="/login" />} />
            <Route  path="/about"  element={token ? <About /> :<Navigate replace to ="/about"/>}></Route>
            {/* <Route path="/login">
              {!token ? <Login /> : <Navigate to="/" />}
            </Route> */}
             <Route path="/login" element={!token ? <Login/> : <Navigate replace to="/" />} />
            {/* <Route path="/signup">
              {!token ? <Signup /> : <Navigate to="/" />}
            </Route> */}
             <Route path="/signup" element={!token ? <Signup /> : <Navigate replace to="/" />} />
            {/* <Route exact path="/Video" component={Video}>
            {!token ? <Signup /> : <Navigate to="/" />}
              
            </Route> */}
             <Route  path="/Stream"  element={token ? <Video /> : <Navigate replace to="/" />} />
             <Route  path="/forgotpassword"  element={ <Forgotpassword/> } />
             
            <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

            
          </Routes>
        </Router>
      </QueryClientProvider>
      </div>
    
  );
};


export default App;
