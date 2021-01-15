import React, { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { InputField } from "./InputField";
//import {UserProfile} from "./UserProfile"

import styled from "styled-components";
import { rgba } from "polished";

const LOGIN = "http://localhost:8080/sessions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logInFailed, setLogInFailed] = useState(false);
  const [logInSuccess, setLogInSuccess] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(LOGIN, {
      method: "POST",
      body: JSON.stringify({
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
          setLogInSuccess(true);
        }
      })
      .catch(() => {
        setLogInFailed(true);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };
  return (
    <Image>
      <Form onSubmit={handleFormSubmit}>
        <Text>Log in</Text>
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

        {logInSuccess && (
          <span>
            <Text>Welcome, user!</Text>
          </span>
        )}
        {logInFailed && (
          <span>
            <Text>
              Failed to log in. Email and/or password incorrect. Please try again.
            </Text>
          </span>
        )}
        <SubmitButton title="Log in" />
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


// import React, { useState } from "react";
// import { InputField } from "./InputField.js";
// import { SubmitButton } from "./SubmitButton.js";
// import { Link } from 'react-router-dom'

// import styled from 'styled-components'
// import { rgba } from 'polished'
//import UserProfile from "./UserProfile.js";

//const LOGIN = "https://project-auth-liza-kat.herokuapp.com/sessions"

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginFailed, setLoginFailed] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     fetch(LOGIN, {
//       method: "POST",
//       body: JSON.stringify({
//         email: inputValue.email,
//         password: inputValue.password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.accessToken) {
//       if (json.accessToken) {
//           localStorage.setItem("accessToken", json.accessToken);
//           localStorage.setItem("userID", json.id);
//           localStorage.setItem("signedUp", JSON.stringify(true));
//           setLogInSuccess(true);
//         }
//       })
//       .catch(() => {
//         setLogInFailed(true);
//       })
//       .finally(() => {
//         setEmail("");
//         setPassword("");
//       });
//   };


//   return (

// 	<Image>
//     <Form>
//       <Text>Login</Text>

//       <InputField
//         name="email"
//         label="Email"
// 		    type="email"
//         placeholder="email"
//         value = {email}
//         onChange={(event) => setInputValue.email(event.target.value)}
//         setInputValue={setInputValue}
//         minLength="3"
//       />
//       <InputField
//         name="password"
//         label="Password"
// 		    type="password"
//         placeholder="password"
//         value = {password}
//         onChange={(event) => setInputValue.password(event.target.value)}
//         setInputValue={setInputValue}
//         minLength="6"
//       />
//       <SubmitButton
//   title="Log in"
//   onclick={handleLogin}
//     />

//     {logInSuccess && (
//           <span>
//             <Text>Welcome, user!</Text>
//           </span>
//         )}
//       {loginFailed && (
//       <>
//       <span><Text>Login failed. Email and/or password incorrect. Don't have an account? Sign-up instead!</Text></span>
//       <Redirect to="/users">
//       <SubmitButton title='Sign Up'></SubmitButton>
//       </Redirect>
//       </>
//         )} 
//     </Form>
// 	</Image>
//   );
// };

// const Image = styled.main`
//   background-image: url("${process.env.PUBLIC_URL + "/flower.jpg"}");
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background-size: cover;
// `;
// const Form = styled.form`
// 	display: flex;
// 	flex-direction: column;
// 	width: 30%;
// 	margin-bottom: 30px;
//   margin: 200px auto;
// 	margin: 20px auto;
// 	align-items: center;
// 	justify-content: center;
// 	padding: 5px;
// 	border-radius: 5px;
// 	background-color: ${rgba('#a1bdc8', 0.5)};
// 	`;
  
// const Text = styled.text`
// 	display: flex;
// 	padding: 10px;
// 	font-size: 30px;
// 	flex-direction: column;
// 	color: #a73e42;
// 	font-weight: bold;
// 	font-family: "Xanh Mono", monospace;
// 	align-items: center;
// 	justify-content: center;
// 	text-align: center;
// 	text-transform: uppercase;
// 	margin-top: 30px;
// 	letter-spacing: 2px;
// `;

// const Redirect = styled(Link)`
//   text-decoration: none;
//   width:30%
//   `;
