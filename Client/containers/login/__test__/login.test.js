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
    displaySignupDetails: false,
    isLoggedIn: false
  })
  const mockSignup = jest.fn(() => {
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
  const mockCreate = jest.fn(() => {
    setTimeout(() => setInitialState({
      ...initialState,
      isLoggedIn: true
    }), 100);
  });

  if (!initialState.isLoggedIn) {

    return (
      <LoginContainer
        signupDetails={mockSignup}
        loginDetails={mockLogin}
        displaySignupDetails={initialState.displaySignupDetails}
        displayLoginDetails={initialState.displayLoginDetails}
        submitSignup={mockCreate}
      />
    )
  }

  return (
    <p>
      HOME PAGE
    </p>
  )

}

xit('expect signupDetails modal to pop up', () => {
  //   const mockSignup = jest.fn()
  //   render(<LoginContainer signupDetails={mockSignup} displaySignupDetails={initialState.displaySignupDetails} />)
  //   render(<LoginContainer signupDetails={mockSignup} />)
  render(<MockComponent />)

  const signupBtn = screen.getByText('Sign Up')
  fireEvent.click(signupBtn)
  //   screen.debug()
  const modal = screen.queryByText('Create Your Account:')
  expect(modal).toBeInTheDocument()
  expect(modal).not.toBeNull()
})

xit('expect loginDetails modal to pop up', () => {
  render(<MockComponent />)
  const loginBtn = screen.getByText('Log In');
  fireEvent.click(loginBtn);
  const modal = screen.queryByText('Please Log In:');
  expect(modal).toBeInTheDocument();
  expect(modal).not.toBeNull()
  // screen.
});

it('expect successful signup to render meal page', () => {
  render(<MockComponent />);
  const signupBtn = screen.getByText('Sign Up');
  fireEvent.click(signupBtn);
  const username = screen.queryByPlaceholderText('username');
  const password = screen.queryByPlaceholderText('password');
  const age = screen.queryByPlaceholderText('age in years');
  const height = screen.queryByPlaceholderText('height in inches');
  const weight = screen.queryByPlaceholderText('weight in lb');
  const sex = screen.queryByPlaceholderText('M or F');
  fireEvent.change(username, { target: { value: 'test' } });
  fireEvent.change(password, { target: { value: 'test' } });
  fireEvent.change(age, { target: { value: '100' } });
  fireEvent.change(height, { target: { value: '100' } });
  fireEvent.change(weight, { target: { value: '145' } });
  fireEvent.change(sex, { target: { value: 'M' } });
  const createBtn = screen.queryByText('Create Account');
  fireEvent.click(createBtn);
  screen.debug();
  const welcome = screen.queryByText('HOME PAGE');
  expect(welcome).toBeInTheDocument();
})