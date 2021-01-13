import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import {SubmitButton} from "./SubmitButton"

export const Home = () => {
  return (
      <ContentContainer>
        <ButtonContainer>
          <Redirect to="/login">
            <SubmitButton title='Login' />
          </Redirect>

          <Redirect to="/signup">
            <SubmitButton title='Sign Up' />
          </Redirect>
        </ButtonContainer>

      </ContentContainer>

  )
}
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const ButtonContainer = styled.div`
  display: flex,
  flex-direction: column;
  align-self: center;
  width: 60%;
  margin: 60px;
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