/**
 * @jest-environment jsdom
 */

import React, { useState } from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

// import component (required)
// import LoginContainer from '../LoginContainer'
import LoginContainer from "../../LoginContainer";

const MockComponent = () => {
  const [initialState, setInitialState] = useState({
    displayLoginDetails: false,
    displaySignupDetails: false
  })

  const mockFn = jest.fn(() => {
    setInitialState({
      ...initialState,
      displaySignupDetails: true
    })
  })

  const mockLogin = jest.fn(() => {
    setInitialState({
      ...initialState,
      displayLoginDetails: true
    });
  });

  return (
    <LoginContainer
      signupDetails={mockFn}
      loginDetails={mockLogin}
      displaySignupDetails={initialState.displaySignupDetails}
      displayLoginDetails={initialState.displayLoginDetails}
    />
  )

}

it('expect signupDetails modal to pop up', () => {
  //   const mockFn = jest.fn()
  //   render(<LoginContainer signupDetails={mockFn} displaySignupDetails={initialState.displaySignupDetails} />)
  //   render(<LoginContainer signupDetails={mockFn} />)
  render(<MockComponent />)

  const signupBtn = screen.getByText('Sign Up')
  fireEvent.click(signupBtn)
  //   screen.debug()
  const modal = screen.queryByText('Create Your Account:')
  expect(modal).toBeInTheDocument()
  expect(modal).not.toBeNull()
})

it('expect loginDetails modal to pop up', () => {
  render(<MockComponent />)
  const loginBtn = screen.getByText('Log In');
  fireEvent.click(loginBtn);
  const modal = screen.queryByText('Please Log In:');
  expect(modal).toBeInTheDocument();
  expect(modal).not.toBeNull()
});
