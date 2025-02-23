import '@testing-library/jest-dom';

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { loginAction } from '../store/slices/authActions';
import { storeUtils } from '../store/utils';
import { render } from '../tests/utils';

storeUtils.appDispatch = jest.fn()

jest.mock('../store/slices/authActions', () => ({
  loginAction: jest.fn(),
}));

describe('LoginPage', () => {
  test('Incorrect inputs', async () => {
    render(<LoginPage />);

    const usernameError = screen.getByTestId('input-username-error')
    expect(usernameError).toBeEmptyDOMElement()

    const passwordError = screen.getByTestId('input-password-error')
    expect(passwordError).toBeEmptyDOMElement()
  
    const submitButton = screen.getByTestId('login-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(usernameError).toHaveTextContent('Username is required.')
      expect(passwordError).toHaveTextContent('Password is required.')
    })
    expect(loginAction).not.toHaveBeenCalled()
  })

  test('Correct inputs', async () => {
    render(<LoginPage />);

    const username = 'user1'
    const password = 'pass123'

    const usernameInput = screen.getByTestId('input-username')
    fireEvent.change(usernameInput, { target: { value: username } })

    const passwordInput = screen.getByTestId('input-password')
    fireEvent.change(passwordInput, { target: { value: password } })
  
    const submitButton = screen.getByTestId('login-button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledWith(expect.objectContaining({
        username,
        password
      }))
    })
  })
})
