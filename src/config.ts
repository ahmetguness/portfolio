const config = {
  // Production'da nginx proxy üzerinden çalışması için relative path
  // Eğer build sırasında REACT_APP_API_URL verilirse onu kullanır
  API_BASE_URL: process.env.REACT_APP_API_URL || '/api',
};

export default config;
