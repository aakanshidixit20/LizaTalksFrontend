// config.js

// Configuration object for API and user data
const config = {
  // API Base URL
   API_BASE_URL: "https://ask-bud-e-be-client-v2.onrender.com/api/v1",
  API_BASE_V2_URL: "https://ask-bud-e-be-client-v2.onrender.com/api/v2",
  // API_BASE_URL: "http://127.0.0.1:8000/api/v1",
  // API_BASE_V2_URL:"http://127.0.0.1:8000/api/v2",
  
  
  // User data (will be populated after login)
  user: null,
  apiKey: null, // This will store the actual api_key from login response
  clientUserId: null,
  clientId: null,
  
  // Initialize config from localStorage
  init: function() {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          this.setUserData(parsedData);
        }
        
        // Also make it available globally for backward compatibility
        if (!window.appConfig) {
          window.appConfig = this;
        }
      } catch (error) {
        console.error('Error initializing config:', error);
      }
    }
  },
  
  // Update config with new user data
  setUserData: function(userData) {
    this.user = userData;
    this.apiKey = userData.api_key; // ✅ Store the actual api_key from backend
    this.clientUserId = userData.client_user_id;
    this.clientId = userData.client_id;
    
    console.log('Config updated with:', {
      apiKey: this.apiKey,
      clientId: this.clientId,
      clientUserId: this.clientUserId
    });
    
    // Also update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
      window.appConfig = this;
    }
  },
  
  // Clear user data on logout
  clearUserData: function() {
    this.user = null;
    this.apiKey = null;
    this.clientUserId = null;
    this.clientId = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      window.appConfig = this;
    }
  },
  
  // Get headers for API calls including x-api-key
  getHeaders: function(additionalHeaders = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // ✅ Add x-api-key header using the actual api_key from backend
    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    } else {
      console.warn('API Key not found in config');
    }
    
    return headers;
  },
  
  // Check if user is authenticated and has required data
  isAuthenticated: function() {
    const hasApiKey = !!this.apiKey;
    const hasClientId = !!this.clientId;
    const hasToken = !!localStorage.getItem('token');
    
    console.log('Auth check:', {
      hasApiKey,
      hasClientId,
      hasToken,
      apiKey: this.apiKey,
      clientId: this.clientId
    });
    
    return hasApiKey && hasClientId && hasToken;
  }
};

// Initialize config when module is loaded
if (typeof window !== 'undefined') {
  config.init();
}

export default config;