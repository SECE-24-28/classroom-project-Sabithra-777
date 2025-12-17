const API_BASE_URL = "http://51.20.66.94:8080/api/v1";

export const authService = {
  getToken: () => localStorage.getItem("token"),

  setToken: (token) => localStorage.setItem("token", token),

  removeToken: () => localStorage.removeItem("token"),

  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  isTokenValid: () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  logout: () => {
    authService.removeToken();
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  },
};

export const apiRequest = async (url, options = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);

  if (response.status === 401) {
    authService.logout();
    window.location.href = "/login";
    throw new Error("Authentication failed");
  }

  return response;
};
