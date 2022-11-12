import {  Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import {  signup } from "../networkCalls";
import { actionTypes, useStateValue } from "../store";
import "./Signup.css";
const Signup = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  console.log(token);
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(
    "signup",
    signup,
    {
      onSuccess: (data) => {
        dispatch({ type: actionTypes.SET_TOKEN, value: data.token });
        setCookie("jwt", data.token);
        navigate("/");
      },
    }
  );



  

  return (

        <Formik
          initialValues={{ email: "", password: "", name: "" }}
    onSubmit={async (values) => {
                  try {
                    await mutateAsync({
                      name : values.name,
                      email: values.email,
                      password: values.password,
                     
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                
                <Form>
                <div class="signup">
	              <h1>Signup</h1>
    
                <InputControl
                    label="Name:"
                    name="name"
                    inputProps={{
                      type: "text",
                      placeholder: "Enter Name...",
                      focusBorderColor: "blue.400",
                    }}
                  />
                  <InputControl
                    label="Email:"
                    name="email"
                    inputProps={{
                      type: "email",
                      placeholder: "Enter Email...",
                      focusBorderColor: "blue.400",
                    }}
                  />
                  <InputControl
                    label="Password:"
                    name="password"
                    inputProps={{
                      type: "password",
                      placeholder: "Enter Password...",
                      focusBorderColor: "blue.400",
                    }}
                  />
        <button type="submit" 
        
        className="btn btn-success btn-block btn-large">Register</button>
             </div>
                </Form>
              </Formik>
              
          
   
  );
};

export default Signup;
