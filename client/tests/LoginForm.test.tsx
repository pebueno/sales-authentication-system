import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../src/components/LoginForm';

test('renders login form and submits', () => {
  const mockSubmit = jest.fn();

  render(<LoginForm onSubmit={mockSubmit} />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByText(/login/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password',
  });
});
