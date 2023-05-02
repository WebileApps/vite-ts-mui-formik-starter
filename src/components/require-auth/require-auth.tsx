import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function RequireAuth() {
  const token = Boolean(sessionStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    !token && navigate('/login');
  }, [token]);

  return token ? <Outlet /> : <Navigate to={'/login'} replace />;
}

export default RequireAuth;
