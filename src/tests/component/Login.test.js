import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../../pages/Loginpage/Login';

test('renders login form correctly', () => {
  render(<Login />);
  
  // Cek apakah elemen input email dan password ada
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

test('handles form submission', async () => {
  render(<Login />);

  // Simulasikan input email dan password
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

  // Simulasikan klik tombol "Sign In"
  fireEvent.click(screen.getByText('Sign In'));

  // Tunggu hingga pesan sukses muncul
  await waitFor(() => {
    expect(screen.getByText('Berhasil Login!')).toBeInTheDocument();
  });
});

test('handles form submission error', async () => {
  render(<Login />);

  // Simulasikan input yang salah
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid_email' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalid_password' } });

  // Simulasikan klik tombol "Sign In"
  fireEvent.click(screen.getByText('Sign In'));

  // Tunggu hingga pesan error muncul
  await waitFor(() => {
    expect(screen.getByText('Email atau password yang anda masukkan salah!')).toBeInTheDocument();
  });
});
