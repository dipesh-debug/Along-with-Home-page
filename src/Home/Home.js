
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { actionTypes, useStateValue } from "../store";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";
import "../components/Video/Video";
import axios from "axios";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
const Home = () => {
  const [cookies] = useCookies(["jwt"]);
  const [profileData, setProfileData] = useState(null);
  const [, , removeCookie] = useCookies(["jwt"]);
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const logout = () => {
    removeCookie("jwt");
    dispatch({ type: actionTypes.SET_TOKEN, value: null });
    navigate("/login");
  };




useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/api/user/profile/", {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
            },
          });
      setProfileData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfileData();
    }, [cookies]);
  
    return (
      <>
        <div className="header">
          <FontAwesomeIcon icon={faUser} />
          <div className="profile-data">
            {profileData && (
              <>
                <p className="wel-text">WELCOME &nbsp; &nbsp;</p>
                <p>{profileData.email}</p>
              </>
            )}
          </div>
        </div>
        <NavBar logout={logout} />
        <Footer />
      </>
    );
};
export default Home;
