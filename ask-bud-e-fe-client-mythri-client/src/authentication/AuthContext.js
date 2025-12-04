// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(config.user); // store user data including role
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(
    localStorage.getItem("hasActiveSubscription") === "true"
  );
  const [subscriptionData, setSubscriptionData] = useState(null);

  const checkTokenExpiry = (jwtToken) => {
    if (!jwtToken) return { expired: true, warning: false };

    try {
      const [, payloadBase64] = jwtToken.split(".");
      const decoded = JSON.parse(atob(payloadBase64));
      const expiry = decoded.exp * 1000; // ms
      const currentTime = Date.now();
      const timeUntilExpiry = expiry - currentTime;

      return {
        expired: timeUntilExpiry <= 0,
        warning: timeUntilExpiry > 0 && timeUntilExpiry <= 60000,
        timeUntilExpiry,
      };
    } catch (err) {
      return { expired: true, warning: false };
    }
  };

  useEffect(() => {
    if (!token) return;

    const checkExpiryInterval = setInterval(() => {
      const { expired, warning } = checkTokenExpiry(token);

      if (expired) {
        logout("Session expired. Please login again.");
        clearInterval(checkExpiryInterval);
      } else if (warning && !showExpiryWarning) {
        setShowExpiryWarning(true);
      }
    }, 30000);

    return () => clearInterval(checkExpiryInterval);
  }, [token, showExpiryWarning]);

  const checkSubscriptionStatus = async (clientId) => {
    console.log("[AUTH] Starting subscription status check...");
    console.log("[AUTH] Client ID:", clientId);
    console.log("[AUTH] API URL:", `${config.API_BASE_URL}/client/billing/subscription/status`);

    try {
      // Set a timeout to prevent hanging forever
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.warn("[AUTH] Subscription check timeout - aborting request");
        controller.abort();
      }, 5000); // 5 second timeout

      const response = await fetch(
        `${config.API_BASE_URL}/client/billing/subscription/status?client_id=${clientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      console.log("[AUTH] Response status:", response.status);

      if (!response.ok) {
        console.error("[AUTH] Failed to fetch subscription status - non-OK response");
        // Don't block login - set default values
        setHasActiveSubscription(false);
        localStorage.setItem("hasActiveSubscription", "false");
        return false;
      }

      const result = await response.json();
      console.log("[AUTH] Subscription result:", result);

      if (result.success && result.data) {
        const hasActive = result.data.has_active_subscription;
        setHasActiveSubscription(hasActive);
        setSubscriptionData(result.data);
        localStorage.setItem("hasActiveSubscription", hasActive.toString());
        console.log("[AUTH] Subscription status set:", hasActive);
        return hasActive;
      }

      console.log("[AUTH] No valid subscription data - setting to false");
      setHasActiveSubscription(false);
      localStorage.setItem("hasActiveSubscription", "false");
      return false;

    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("[AUTH] Subscription check timed out after 5 seconds");
      } else {
        console.error("[AUTH] Error checking subscription status:", error);
      }

      // Don't block login - set default values and continue
      setHasActiveSubscription(false);
      localStorage.setItem("hasActiveSubscription", "false");
      return false;
    }
  };

  const login = async (jwtToken, userData = null) => {
    console.log("[AUTH] Login function called");
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setSessionExpired(false);
    setShowExpiryWarning(false);

    if (userData) {
      config.setUserData(userData);
      setUser(userData); // ✅ store user in context

      // Check subscription status after login (non-blocking)
      // Don't await - let it run in background so login isn't blocked
      if (userData.client_id) {
        console.log("[AUTH] Starting background subscription check...");
        checkSubscriptionStatus(userData.client_id).then(() => {
          console.log("[AUTH] Background subscription check completed");
        }).catch((err) => {
          console.error("[AUTH] Background subscription check failed:", err);
        });
      } else {
        console.warn("[AUTH] No client_id found in userData - skipping subscription check");
      }
    }

    console.log("[AUTH] Navigating to dashboard...");
    navigate("/");
  };

  const logout = (message = "") => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasActiveSubscription");
    setToken(null);
    setUser(null);
    setShowExpiryWarning(false);
    setHasActiveSubscription(false);
    setSubscriptionData(null);

    config.clearUserData();

    if (message) {
      setSessionExpired(true);
    }
    navigate("/sign-in");
  };

  const dismissWarning = () => {
    setShowExpiryWarning(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user, // ✅ expose user info including role
        login,
        logout,
        sessionExpired,
        showExpiryWarning,
        dismissWarning,
        hasActiveSubscription,
        subscriptionData,
        checkSubscriptionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
