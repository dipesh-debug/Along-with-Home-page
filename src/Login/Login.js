

import { Form, Formik } from "formik";

import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import "./Login.css";


import { login } from "../networkCalls";
import { actionTypes, useStateValue } from "../store";
import { InputControl } from "formik-chakra-ui";



const Login = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  console.log(token);
  const navigate = useNavigate();
  const { isError,  mutateAsync } = useMutation(
    "login",
    login,
    {
      onSuccess: (data) => {
        dispatch({ type: actionTypes.SET_TOKEN, value: data.token });
        setCookie("jwt", data.token);
        navigate("/");
      },
    }
  );


  if (isError) {
    
    alert("Please Enter Valid Id and Password");
  }
  const signup = () => {
    navigate("/Signup");
  }
    const forgot = () => {
      navigate("/forgotpassword");


}




  return (
    <div className="Box-front">
   
      
        <Formik
          initialValues={{ email: "hello1@gmail.com", password: "1234567" }}
          onSubmit={async (values) => {
            try {
             await mutateAsync({
                email: values.email,
                password: values.password,
              
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form>
          <div class="login">
	<h1>Login</h1>
    
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
                type:"password",
                placeholder: "Enter Password...",
                focusBorderColor: "blue.400",
              }}
             
            />
        <button type="submit" 
        
        className="btn btn-success btn-block btn-large">Login</button>
    
    <button className="btn btn-primary btn-block btn-large"
              type="submit"
              onClick={signup }
            >

              Signup
            </button>
            <button  className="btn btn-danger btn-block btn-small"
              type="submit"
              onClick={forgot}
            >
              Forgot Password?
              
            </button>
</div>
         
            

            
            
           
            
           
          </Form>
          
        </Formik>
  
   
    </div>

  );
};

export default Login;
