function getEnv(name: string, fallback?: string): string {
  const value = import.meta.env[name];
  if (value === undefined || value === "") {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const env = {
  apiBaseUrl: getEnv("VITE_API_BASE_URL", "http://localhost:3000/api"),
};
