import React, {useState} from "react"
import { useDispatch } from 'react-redux';
import { user } from "../reducers/user";
import { Link } from 'react-router-dom'

import {SubmitButton} from "./SubmitButton"
import {InputField} from "./InputField"

import styled from "styled-components"
import { rgba } from 'polished'
import { UserProfile } from "./UserProfile";


const SIGNUP = "http://localhost:8080/users"

export const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		fetch(SIGNUP, {
		  method: "POST",
		  body: JSON.stringify({
      name, 
      password,
      email
		  }),
		  headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error('Could not create account. Please try again');
      }
      return res.json();
    })
    .then((json) => {
      dispatch(user.actions.setUserId({userId: json.id})); 
      dispatch(user.actions.setAccessToken({ accessToken: json.accessToken}));
      setSignUpSuccess(true)   
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
      
          <UserProfile />  
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
	  margin: 200px auto;
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
