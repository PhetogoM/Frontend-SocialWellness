import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './loginPage';

describe('<LoginPage />', () => {
  test('it should mount', () => {
    render(<LoginPage />);

    const loginPage = screen.getByTestId('loginPage');

    expect(loginPage).toBeInTheDocument();
  });
});