
import { Button } from "@chakra-ui/button";
import { Container, Stack } from "@chakra-ui/layout";

import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";


import {  signup } from "../networkCalls";
import { actionTypes, useStateValue } from "../store";

const Signup = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  console.log(token);
  const navigate = useNavigate();
  const {  isLoading, mutateAsync } = useMutation(
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
        <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack width="300px" p="4" boxShadow="xl" borderRadius="xl">
        <Formik
          initialValues={{ email: "@gmail.com", password: "123456", name: "",password2 :"123456" }}
    onSubmit={async (values) => {
                  try {
                    await mutateAsync({
                      name : values.name,
                      email: values.email,
                      password: values.password,
                      password2:values.password2,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Form>
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
                  <InputControl
                    label="Password2:"
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
                    Register
                  </Button>
                </Form>
              </Formik>
            </Stack>
          </Container>
   
  );
};

export default Signup;
