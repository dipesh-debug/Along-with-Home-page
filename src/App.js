import { ChakraProvider } from "@chakra-ui/react";
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
import Video from "./components/Video";
import { QueryClient, QueryClientProvider } from "react-query";
import { actionTypes, useStateValue } from "./store";
import { useCookies } from "react-cookie";

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
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* <Route path="/" exact={true}>
              {token ? <Home /> : <Navigate to="/login" />}
            </Route> */}
            <Route path="/" element={token ? <Home /> : <Navigate replace to="/login" />} />
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
            {/* <Navigate replace to="/" /> */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};


export default App;
