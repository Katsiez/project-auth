import React, {useState} from "react"
import { useDispatch } from 'react-redux';
import { user } from "../reducers/user";
import {SubmitButton} from "./SubmitButton"
import {InputField} from "./InputField"
//import {UserProfile} from "./UserProfile"

import styled from "styled-components"
import { rgba } from 'polished'
import UserProfile from "./UserProfile";

const SIGNUP = "https://project-auth-liza-kat.herokuapp.com/users"

export const SignUp = ({}) => {
	// const [inputValue, setInputValue] = useState({
	// 	name: "",
	// 	email: "",
	// 	password: "",
  //   });
  const [page, setPage] = useState('signup');
  const dispatch = useDispatch();
  const [name, setName] = useState('');
   const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpFailed, setSignUpFailed] = useState(false);
  //const error = useSelector((store) => store.user.errorMessage);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		fetch(SIGNUP, {
		  method: "POST",
		  body: JSON.stringify({
			name, password, email
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
      dispatch(user.actions.setUserId({ userId: json.userId }));
      dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
      })
      .catch((err)=> alert(err))
  };


		  // .then((res) => res.json())
		  // .then((json) => {
			// if (json.accessToken) {
			//   localStorage.setItem("accessToken", json.accessToken);
			//   localStorage.setItem("userID", json.id);
			//   localStorage.setItem("signedUp", JSON.stringify(true));
			//   setSignedUp(JSON.parse(localStorage.getItem("signedUp")));
			// } else if (!json.signUpSuccessful) {
			// 	setSignUpFailed(true);
			// }
		  // });
	
		// setInputValue({
		//   name: "",
		//   email: "",
		//   password: "",
		// });
	  // };
	  return (
      <>
{page === 'signup' ? (	<Image>
		<Form onSubmit={handleFormSubmit}>
		  <Text>Sign up</Text>
	
		  <InputField
			name="name"
			label="Name"
			type="name"
      placeholder="name"
      onChange={(event) => setName(event.target.value)}
			value={name}
			minLength="5"
		  />
		  <InputField
			name="email"
			label="Email"
			type="email"
      placeholder="email"
      onChange={(event) => setEmail(event.target.value)}
			value={email}
			minLength="3"
		  />
		  <InputField
			name="password"
			label="Password"
			type="password"
      placeholder="password"
      onChange={(event) => setPassword(event.target.value)}
			value={password}
			minLength="6"
		  />
	
		  {signUpFailed && <span><Text>Failed to sign up. Please ensure that all fields have been filled out and try again.</Text></span>}
	<SubmitButton
  title="Sign up"
/>
		</Form>
		</Image>
	  ) : ( <UserProfile setPage={setPage} />  )
  };
  </>
    )};
 
	
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