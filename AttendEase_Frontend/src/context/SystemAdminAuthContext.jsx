import { createContext, useState, useEffect } from "react";
import { apiClient } from "../API/apiClient";

export const SystemAdminAuthContext = createContext(null);

export const SystemAdminAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("systemAdminRefreshToken");

    if (storedRefreshToken) {
      refreshAccessToken(storedRefreshToken);
    } else {
      setLoading(false);
    }
  }, []);

  const refreshAccessToken = async (tokenToUse) => {
    try {
      // Note: We use axios directly or a separate client here to avoid circular loops
      // But apiClient is fine if it doesn't block public endpoints
      const res = await apiClient.post("/api/system-admin/refresh-token", {
        refreshToken: tokenToUse,
      });

      const { accessToken: newAccess, refreshToken: newRefresh } = res.data;

      // 1. Update Local Storage (For ApiClient to read)
      localStorage.setItem("systemAdminRefreshToken", newRefresh);
      localStorage.setItem("accessToken", newAccess);

      // 2. Update State (For UI)
      setAccessToken(newAccess);
    } catch (error) {
      console.error("Refresh failed:", error);
      logout();
    } finally {
      setLoading(false); // App is ready
    }
  };

  const login = (tokenData) => {
    // Call this from your Login Component
    localStorage.setItem("accessToken", tokenData.accessToken);
    localStorage.setItem("systemAdminRefreshToken", tokenData.refreshToken);
    setAccessToken(tokenData.accessToken);
  };

  const logout = () => {
    localStorage.removeItem("systemAdminRefreshToken");
    localStorage.removeItem("accessToken");
    setAccessToken(null);

  };

  return (
    <SystemAdminAuthContext.Provider
      value={{ accessToken, login, logout, loading }} // Expose 'loading' and 'login'
    >
      {/* If loading, show nothing or a spinner. If done, show app. */}
      {!loading && children}
    </SystemAdminAuthContext.Provider>
  );
};
