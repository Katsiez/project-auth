import React from 'react'
import styled from 'styled-components'

export const InputField = ({ placeholder, type, value, onChange, minLength }) => {
  return (
	<Input 
		placeholder={placeholder} 
		type={type} 
		value={value} 
		onChange={onChange} 
		minLength={minLength} 
		required/>
  )
}

const Input = styled.label`
	font-family: 'Xanh Mono', monospace;
	width: 60%; 
	background-color: #be1f01;
`