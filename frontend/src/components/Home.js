import React from 'react'
import { Link } from 'react-router-dom'
import {SubmitButton} from "./SubmitButton"

import styled from 'styled-components/macro'
import TextAnimation from "react-animate-text";
import AnimatedBg from "react-animated-bg";

export const Home = () => {
  return (	 
  <Image>
    <Content>
      <AnimatedBg
        colors={["#674a60", "#a6c3cb", "#a45254", "#ac8b96", "#6c6c6b"]}
        duration={1.5}
        delay={0}
        timingFunction="ease-out"
        className="animated-section"
      >
      <Text>
		  <TextAnimation><span>Welcome to XYZ. Let's get you logged in! Don't have an account yet? Sign up and get started.</span></TextAnimation>
      </Text>
      </AnimatedBg>
      <TextFinal>Created by Kat and Liza</TextFinal>
      </Content>
        <ButtonContainer>
          <Redirect to="/login">
            <SubmitButton title='Login' />
          </Redirect>
          <Redirect to="/signup">
            <SubmitButton title='Sign Up' />
          </Redirect>
        </ButtonContainer>
			</Image>
  )
}

const Image = styled.main`
  background-image: url('${process.env.PUBLIC_URL + '/flower.jpg'}');
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 30px;
  margin: 400px auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
`
const Text = styled.text`
  display: flex;
  padding: 3px;
  flex-direction: column;
  color: #44333a;
  font-weight: bold;
  font-size: 30px;
  font-family: 'Xanh Mono', monospace;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const TextFinal = styled.text`
  display: flex;
  padding: 3px;
  flex-direction: column;
  color: #a6c3cb;
  font-weight: bold;
  font-size: 35px;
  font-family: 'Xanh Mono', monospace;
  text-transform: uppercase;
  padding-top: 20px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const ButtonContainer = styled.div`
@media (max-width: 950px) {
    margin: 2em 8em;
  }
  @media (max-width: 660px) {
    align-self: center;
    margin: 1em;
  }
`

const Redirect = styled(Link)`
  text-decoration: none;
`
