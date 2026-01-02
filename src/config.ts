const config = {
  // Use environment variable if available, otherwise fallback to local dev backend
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4001/api'
};

export default config;
