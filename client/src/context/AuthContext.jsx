import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, removeToken, setToken as saveToken } from '../utils/token';
import { login as loginApi, register as registerApi } from '../services/authService';
import { getProfile } from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    console.log(data); // <-- Check this
    if (data.token) {
      saveToken(data.token);
    }
    await fetchUser();
    return data;
  };

  const register = async (credentials) => {
    const data = await registerApi(credentials);
    if (data.token) {
      saveToken(data.token);
    }
    await fetchUser();
    return data;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser: fetchUser,
    }),
    [user, loading, fetchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
