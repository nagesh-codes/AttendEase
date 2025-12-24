import { createContext, useState, useEffect } from "react";
import { apiClient } from "../API/apiClient";

export const SystemAdminAuthContext = createContext(null);

export const SystemAdminAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const refreshToken = localStorage.getItem("systemAdminRefreshToken");
    if (refreshToken) {
      refreshAccessToken(refreshToken);
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const res = await apiClient.post("/api/system-admin/refresh-token", {
        refreshToken: refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = res.data;

      localStorage.setItem("systemAdminRefreshToken", newRefreshToken);
      localStorage.setItem("accessToken", accessToken);

      setAccessToken(accessToken);
    } catch (error) {
      console.error("Refresh failed:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("systemAdminRefreshToken");
    setAccessToken(null);
  };

  return (
    <SystemAdminAuthContext.Provider
      value={{ accessToken, setAccessToken, refreshAccessToken, logout }}
    >
      {children}
    </SystemAdminAuthContext.Provider>
  );
};
