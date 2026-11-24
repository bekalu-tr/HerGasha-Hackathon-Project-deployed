
import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { authAPI } from "../services/apiServices";
import { getApiError } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Current authenticated user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // Authentication token
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // Save or clear authentication session
  const saveSession = useCallback((userData, accessToken) => {
    setUser(userData || null);
    setToken(accessToken || null);

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
    } else {
      localStorage.removeItem("user");
    }

    if (accessToken) {
      localStorage.setItem("token", accessToken);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  // Verify an existing session with the backend
  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        if (active) {
          setLoading(false);
        }
        return;
      }

      try {
        const response = await authAPI.getMe();
        const data = response.data;

        const currentUser =
          data.user ||
          data.data?.user ||
          data.data;

        if (!currentUser) {
          throw new Error(
            "User information was not returned."
          );
        }

        if (active) {
          saveSession(currentUser, savedToken);
        }
      } catch (error) {
        if (active) {
          saveSession(null, null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [saveSession]);

  // Login
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const data = response.data;

      const accessToken =
        data.token || data.data?.token;

      const userData =
        data.user || data.data?.user;

      if (!accessToken || !userData) {
        throw new Error(
          "Invalid login response from server."
        );
      }

      saveSession(userData, accessToken);

      return userData;
    } catch (error) {
      throw new Error(getApiError(error));
    }
  };

  // Normal user registration
  const register = async (formData) => {
    try {
      const response = await authAPI.register(formData);
      const data = response.data;

      const accessToken =
        data.token || data.data?.token;

      const userData =
        data.user || data.data?.user;

      if (!accessToken || !userData) {
        throw new Error(
          "Invalid registration response from server."
        );
      }

      saveSession(userData, accessToken);

      return userData;
    } catch (error) {
      throw new Error(getApiError(error));
    }
  };

  // Organization registration or other custom authentication flow
  const setSession = (userData, accessToken) => {
    saveSession(userData, accessToken);
  };

  // Logout
  const logout = () => {
    saveSession(null, null);
  };

  const value = {
    user,
    token,
    loading,

    isAuthenticated: Boolean(user && token),

    login,
    register,
    logout,

    setSession,

    setUser: (updatedUser) => {
      saveSession(updatedUser, token);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
