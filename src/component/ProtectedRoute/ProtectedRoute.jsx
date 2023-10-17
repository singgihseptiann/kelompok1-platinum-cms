import React from 'react';
import { Navigate, Outlet } from 'react-router/dist';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={'/login'}/>
  }

  return <>{children || <Outlet/>}</>;
}

export default ProtectedRoute;
