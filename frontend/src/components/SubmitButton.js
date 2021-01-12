import React from "react"
import styled from "styled-components"

export const SubmitButton = ({ title, onClick, onSubmit }) => {
	return (
		<MainContainer 
			onSubmit={onSubmit} 
			onClick={onClick}>
			<TextField>
				{title}
			</TextField>
		</MainContainer>
	)
}

const MainContainer = styled.button`
	display: flex;
	justify-content: center;
	align-text: center;
	width: 50%;
`
const TextField = styled.p`
	font-family: 'Xanh Mono', monospace;
	align-items: center;
	font-size: 18px;
	color: #dad3c7;
`