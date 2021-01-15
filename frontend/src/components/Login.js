import React, { useState } from "react";
import { InputField } from "./InputField.js";
import { SubmitButton } from "./SubmitButton.js";
import { Welcome } from "./Welcome.js";
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { rgba } from 'polished'

const LOGIN = "https://project-auth-liza-kat.herokuapp.com/sessions"

export const Login = ({ setLoggedIn }) => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem("accessToken", json.accessToken);
          localStorage.setItem("userID", json.id);
          localStorage.setItem("signedIn", JSON.stringify(true));
          setLoggedIn(JSON.parse(localStorage.getItem("signedIn")));
          setLoginSuccess(true);
        } else if (!json.signUpSuccessful) {
          setLoginFailed(true);
        }
      });

    setInputValue({
      email: "",
      password: "",
    });
  };

  //   const signupUser = (event) => {
  //   event.preventDefault();
  //   fetch(SIGNUP_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, password }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Could not create user");
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((json) => {
  //       welcomeUser(json.accessToken);
  //     })
  //     .catch((err) => alert(err))
  //     .finally(() => {
  //       setName("");
  //       setPassword("");
  //     });
  // };

  return (

	<Image>
    <Form onSubmit={handleFormSubmit}>
      <Text>Login</Text>

      <InputField
        name="email"
        label="Email"
		type="email"
		placeholder="email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputField
        name="password"
        label="Password"
		type="password"
		placeholder="password"
        setInputValue={setInputValue}
        minLength="6"
      />
      <SubmitButton
	title="Log in"
    />

      {loginFailed && (
      <>
      <span><Text>Login failed. Email and/or password incorrect. Don't have an account? Sign-up instead!</Text></span>
      <Redirect to="/users">
      <SubmitButton title='Sign Up'></SubmitButton>
      </Redirect>
      </>
        )} 

      {loginSuccess && ( 
      <Welcome />
        )} 

    </Form>
	</Image>
  );
};

const Image = styled.main`
  background-image: url("${process.env.PUBLIC_URL + "/flower.jpg"}");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 30%;
	margin-bottom: 30px;
  margin: 200px auto;
	margin: 20px auto;
	align-items: center;
	justify-content: center;
	padding: 5px;
	border-radius: 5px;
	background-color: ${rgba('#a1bdc8', 0.5)};
	`;
  
const Text = styled.text`
	display: flex;
	padding: 10px;
	font-size: 30px;
	flex-direction: column;
	color: #a73e42;
	font-weight: bold;
	font-family: "Xanh Mono", monospace;
	align-items: center;
	justify-content: center;
	text-align: center;
	text-transform: uppercase;
	margin-top: 30px;
	letter-spacing: 2px;
`;

const Redirect = styled(Link)`
  text-decoration: none;
  width:30%
  `;
