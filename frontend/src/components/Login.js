import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {user} from "../reducers/user"
import {SubmitButton} from "./SubmitButton"
import {InputField} from "./InputField"
//import {UserProfile} from "./UserProfile"

import styled from "styled-components"
import swal from "sweetalert"

const LOGIN = "https://project-auth-liza-kat.herokuapp.com/sessions"

export const Login = () => {
	const dispatch = useDispatch()
	//const accessToken = useSelector((store) => store.user.login.accessToken)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	//Login a user
	const handleLogin = (event) => {
		event.preventDefault()

		fetch(LOGIN, {
			method: "POST",
			body: JSON.stringify({email, password}),
			headers: {"Content-Type": "application/json"}
		})
		.then(res => {
			if (!res.ok) {
			  swal({
				text: 'Unexpected error',
				icon: "error",
				button: {
				text: 'Please enter your login information again'
				},
			  })
			} else {
			  return res.json()
			}
		  })
		  .then(({ accessToken }) => {
			setEmail('')
			setPassword('')
			if (accessToken) {
			  dispatch(user.actions.logIn())
			  dispatch(user.actions.access(accessToken))
			}
		  })
		  .catch(err => console.log("error:", err))
	  }
return (
    <Form>
      <Input onSubmit={handleLogin}>
        <Label> EMAIL:
        <InputField placeholder="email" type="email"
            value={email} onChange={event => setEmail(event.target.value)} />
        </Label>

        <Label> PASSWORD:
        <InputField placeholder="password" type="password"
            value={password} onChange={event => setPassword(event.target.value)} />
        </Label>

        <SubmitButton type="submit" title='Login' />
      </Input>
    </Form>
  )
}
//STYLED COMPONENTS
const Form = styled.section`
	display: flex;
	flex-direction: column;
	align-self: center;
	justify-content: center;
	width: 60%;
	height: 500px;
`
const Input = styled.section`
	display: flex;
	flex-direction: column;
	align-self: center;
	justify-content: center;
	width: 100%;
`
const Label = styled.label`
	font-family: 'Xanh Mono', monospace;
	display: flex;
	flex-direction: column;
	align-self: center;
	color: #fbcdc4;
	font-size: 15px;
`
