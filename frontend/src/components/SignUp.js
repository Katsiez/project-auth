import React, {useState} from "react"
import {SubmitButton} from "./SubmitButton"
import {InputField} from "./InputField"
//import {UserProfile} from "./UserProfile"

import styled from "styled-components"

const SIGNUP = "https://project-auth-liza-kat.herokuapp.com/users"

export const SignUp = () => {
	//const accessToken = useSelector((store) => store.user.login.accessToken)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	//Login a user
	const handleSignUp = (event) => {
		event.preventDefault()

		fetch(SIGNUP, {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
			headers: {"Content-Type": "application/json"}
		})
		.then(res => {
			if (!res.ok) {
			 throw new Error ({ message: "Error creating account, please try again."})
			} else {
			  return res.json()
			}
		  })
		  .then(() => {
			setName('')
			setEmail('')
			setPassword('')
		  })
		  .catch(err => console.log("error:", err))
	  }
return (
    <Form>
      <Input>
	  <Label> Name
        <InputField placeholder="Mia Horton" type="text"
            value={name} onChange={event => setName(event.target.value)} />
        </Label>

        <Label> Email
        <InputField placeholder="mia@me.com" type="email"
            value={email} onChange={event => setEmail(event.target.value)} />
        </Label>

        <Label> Password
        <InputField placeholder="<><><>" type="password"
            value={password} onChange={event => setPassword(event.target.value)} />
        </Label>

        <SubmitButton type="submit" title='Sign up' onClick={handleSignUp}/>
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
	width: 50%;
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
