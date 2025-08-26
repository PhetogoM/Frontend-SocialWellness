import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from './RegisterPage';

describe('<RegisterPage />', () => {
  test('it should mount', () => {
    render(<RegisterPage />);

    const registerPage = screen.getByTestId('RegisterPage');

    expect(registerPage).toBeInTheDocument();
  });
});