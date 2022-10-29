import { Button } from "@chakra-ui/button";
import { Container, Stack } from "@chakra-ui/layout";

import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import "./Login.css";


import { login } from "../networkCalls";
import { actionTypes, useStateValue } from "../store";



const Login = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  console.log(token);
  const navigate = useNavigate();
  const { isError, isLoading, mutateAsync } = useMutation(
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
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack width="300px" p="4" boxShadow="xl" borderRadius="xl">
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
         
            
            
            <Button
              isLoading={isLoading}
              colorScheme="blue"
              mt="4"
              type="submit"
            >
              Login
            </Button>
            
            
            
            <Button className="Signup-button"
              type="submit"
              onClick={signup }
            >

              Signup
            </Button>
            <Button className="forgot"
              type="submit"
              onClick={forgot}
            >
              Forgot Password?
              
            </Button>
            <addminPannel/>
           
          </Form>
          
        </Formik>
      </Stack>
     
    </Container>
   
    </div>
  );
};

export default Login;
