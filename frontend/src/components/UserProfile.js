import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { rgba } from "polished";

import { user } from "../reducers/user";
import { SubmitButton } from "./SubmitButton";
import { Home } from "./Home";

const URL = "https://project-auth-liza-kat.herokuapp.com/users";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    dispatch(user.actions.logout());
    setLoggedOut(true);
  };
  const testProfile = () => {
    // Include userId in the path
    fetch(`${URL}/${userId}/secret`, {
      method: "GET",
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          try {
            throw new Error("error");
          } catch (e) {
            throw e;
          }
        }
        return res.json();
      })
      .then((json) => {
        dispatch(user.actions.setSecret({ secretMessage: json.secretMessage }));
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      {loggedOut === false ? (
        <Image>
          <Container>
            <Text>User's Profile</Text>
            <Text>
              {" "}
              Hello, user. Reveal your secret by pressing the Test button
            </Text>
          </Container>
          <SubmitButton title="Logout" onClick={handleLogout}></SubmitButton>
          <SubmitButton title="Test" onClick={testProfile}></SubmitButton>
          <Text1>{`${secretMessage}`}</Text1>
        </Image>
      ) : (
        <Home />
      )}
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

const Container = styled.div`
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
const Text1 = styled.text`
  display: flex;
  padding: 10px;
  font-size: 25px;
  flex-direction: column;
  color: white;
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
