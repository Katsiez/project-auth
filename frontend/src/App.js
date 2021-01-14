// import React, { useState } from "react";
// import LoginForm from "./components/Login";
// import { Provider } from "react-redux";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { user } from "./reducers/user";

// const URL = "http://localhost:8080/users";

// const reducer = combineReducers({ user: user.reducer });

// const store = configureStore({ reducer });

// export const App = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   // To sign up a user.
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     fetch(URL, {
//       method: "POST",
//       body: JSON.stringify({ name, password }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((json) => console.log(json))
//       .catch((err) => console.log("error:", err));
//   };
//   return (
//     <Provider store={store}>
//       <LoginForm />
//     </Provider>
//   );
// };

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Status } from "./components/Status";
import { UserProfile } from "./components/UserProfile";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./reducers/user";

import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Home } from "./components/Home"


//const URL = "https://project-auth-liza-kat.herokuapp.com/users"

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      {/* <Status /> */}
      <UserProfile />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users" exact>
            <SignUp />
          </Route>
          <Route path="/sessions" exact>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};