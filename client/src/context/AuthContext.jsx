import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi, } from '../services/authService';
import { getProfile } from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
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
  await fetchUser();
  return data;
};

  const register = async (credentials) => {
    const data = await registerApi(credentials);
    await fetchUser();
    return data;
  };

  const logout = async () => {
    await logoutApi();
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
