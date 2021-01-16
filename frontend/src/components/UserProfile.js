import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { rgba } from "polished";

import { user } from "../reducers/user";
import { SubmitButton } from "./SubmitButton";
import { Home } from "./Home"

const URL = 'http://localhost:8080/users';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage );
  const name = useSelector((store) => store.user.login.name);
  const[loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = () => {
    dispatch(user.actions.logout());
    setLoggedOut(true);
  }
  const testProfile = (accessToken, userId) => {
    // Include userId in the path
    fetch(`${URL}/${userId}/secret`, {
      method: "GET",
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw "Profile test failed";
        }
        return res.json();
      })
      .then((json)=>{
        console.log("Hey");
        dispatch(user.actions.setSecret({secretMessage: json.secretMessage}));
      })
      .catch((err) => alert(err)); 
      //dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
  };


  return (
    <>
    {loggedOut === false ? (
    <Image>
      <Form>
      <Text>User's Profile</Text>
        <Text> Hello, {`${name}`}</Text>
     <Text> {`${userId}`}</Text>
      <Text>{`${accessToken}`}</Text> 
      <Text> Hello, user. Reveal your secret by pressing the Test button</Text> 
      </Form>
      <SubmitButton 
        title ='Logout' 
        onClick={handleLogout}>  
      </SubmitButton>
      <SubmitButton 
        title='Test'
        onClick={testProfile}>
      </SubmitButton>
      </Image> 
    ) : ( <Home />)
}
    </>
  );
};

const Image = styled.main`
	background-image: url("${process.env.PUBLIC_URL + "/flower.jpg"}");
	position: fixed;
	width: 100%;
	height: 100%;
	background-size: cover;
  `;
  const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 30px;
    /* margin: 300px auto; */
  margin: 100px auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
`
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
