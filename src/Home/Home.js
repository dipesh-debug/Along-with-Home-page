
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { actionTypes, useStateValue } from "../store";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/Navbar/Navbar";
import  "../components/Video/Video";

const Home = () => {
  const [, , removeCookie] = useCookies(["jwt"]);
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const logout = () => {
    removeCookie("jwt");
    dispatch({ type: actionTypes.SET_TOKEN, value: null });
    navigate("/login");
  };

  return (
   
      <>
      <div className="scroll">
      <NavBar logout={logout} />
      <Hero />
     
      <Footer />
      </div>
   </>
  );
};

export default Home;
