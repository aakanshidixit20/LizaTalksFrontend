import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * SubscriptionProtectedRoute - Restricts access to routes that require an active subscription
 * 
 * This component checks if the user has an active subscription before allowing access.
 * If no active subscription is found, it redirects to the dashboard with a message.
 * 
 * Usage:
 * <SubscriptionProtectedRoute>
 *   <YourComponent />
 * </SubscriptionProtectedRoute>
 */
const SubscriptionProtectedRoute = ({ children }) => {
  const { token, user, hasActiveSubscription } = useContext(AuthContext);

  // First check if user is logged in
  if (!token || !user) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  // Then check if user has an active subscription
  if (!hasActiveSubscription) {
    // Redirect to dashboard where they'll see the activation message
    return <Navigate to="/" replace />;
  }

  // User is logged in and has active subscription - show the page
  return children;
};

export default SubscriptionProtectedRoute;

