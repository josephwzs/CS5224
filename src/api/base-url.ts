export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;

  if (typeof envUrl === "string" && envUrl.trim() !== "") {
    return envUrl;
  }

  const fallbackUrl = "http://localhost:8080/api";

  if (fallbackUrl) {
    return fallbackUrl;
  }

  throw new Error("API base URL is not defined. Please set VITE_API_URL.");
}
