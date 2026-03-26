import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login: (credentials) => dispatch(login(credentials)),
    register: (data) => dispatch(register(data)),
    logout: () => dispatch(logout()),
  };
}