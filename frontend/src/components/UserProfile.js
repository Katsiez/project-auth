import React, { useState, useEffect } from "react";
import { user } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";



const SECRET_URL = 'http://localhost:8080/users';


export const UserProfile = (setPage) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  //const secretText = useSelector((store) => store.user.secretMessage);
   
  useEffect(() => {
    dispatch(secretPage(userId, accessToken));
  });

 
 
  const handleLogout = () => {
    dispatch(user.actions.logout());
    setPage('signup');
 }
 
  const secretPage = (accessToken, userId) => {
    // Include userId in the path
    fetch(`${SECRET_URL}/${userId}/secret`, {
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
        dispatch(user.actions.setSecret({secretText: json.secretMessage}));
      })
      .catch((err) => alert(err)); 
      //dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
  };


  return (
    <>
    <section class="profile">
      <h2>User's Profile</h2>
      <h4>Hello! Here we will have some text</h4>
      {/* <p> {`${userId}`}</p>
      <h4>accessToken:</h4>
      <p> {`${secretText}`}</p> */}
      {/* <input type="submit" onClick={testSecret} value="Test Secret" /> */}
      {/* <input type="submit" onClick={logout} value="Test Logout" /> */}
      <button onClick={handleLogout}>Log out</button>
    </section>
    </>
  );
};
export default UserProfile;