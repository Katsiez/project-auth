import React, { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { InputField } from "./InputField";
//import {UserProfile} from "./UserProfile"

import styled from "styled-components";
import { rgba } from "polished";

const SIGNUP = "http://localhost:8080/users";

export const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signUpFailed, setSignUpFailed] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(SIGNUP, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem("accessToken", json.accessToken);
          localStorage.setItem("userID", json.id);
		  localStorage.setItem("signedUp", JSON.stringify(true));
		  setSignUpSuccess(true)
		}
	  })
	  .catch(() => {
		  setSignUpFailed(true)
	  })
	  .finally(() => {
		  setName("")
		  setEmail("")
		  setPassword("")
	  });
  };
  return (
    <Image>
      <Form onSubmit={handleFormSubmit}>
        <Text>Sign up</Text>
        <InputField
          name="name"
          label="Name"
		  type="name"
		  value={name}
          placeholder="name"
		  onChange={(event) => setName(event.target.value)}
		  minLength="5"
        />
        <InputField
          name="email"
          label="Email"
		  type="email"
		  value={email}
          placeholder="email"
		  onChange={(event) => setEmail(event.target.value)}
          minLength="3"
        />
        <InputField
          name="password"
          label="Password"
		  type="password"
		  value={password}
          placeholder="password"
		  onChange={(event) => setPassword(event.target.value)}
          minLength="6"
        />

		{signUpSuccess && (
          <span>
            <Text>
              You're all signed-up!
            </Text>
          </span>
        )}
        {signUpFailed && (
          <span>
            <Text>
              Failed to sign up. Please ensure that all fields have been filled
              out and try again.
            </Text>
          </span>
        )}
        <SubmitButton title="Sign up" />
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
  margin: 100px auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  background-color: ${rgba("#a1bdc8", 0.5)};
  @media (max-width: 950px) {
    margin: 30px auto;
    width: 60%;
    margin-bottom: 10px;
  }
  @media (max-width: 660px) {
    margin: 30px auto;
    width: 60%;
    margin-bottom: 10px;
  }
`;
const Text = styled.text`
  display: flex;
  padding: 10px;
  font-size: 20px;
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
  @media (max-width: 950px) {
    font-size: 17px;
    margin-top: 10px;
  }
  @media (max-width: 660px) {
    font-size: 17px;
    margin-top: 10px;
  }
`;
