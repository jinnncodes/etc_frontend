const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE_URL = isLocalhost
  ? "http://localhost:8000"
  : "https://raelyn-herniated-shera.ngrok-free.dev";

console.log("🔗 API Base URL:", API_BASE_URL);
