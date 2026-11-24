import api from "./api";

// ===========================
// AUTHENTICATION
// ===========================

export const authAPI = {
  register: (data) => api.post("/auth/register", data),

  login: (data) => api.post("/auth/login", data),

  getMe: () => api.get("/auth/me"),
};

// ===========================
// USER PROFILE
// ===========================

export const userAPI = {
  getProfile: () => api.get("/users/me"),

  updateProfile: (data) => api.patch("/users/me", data),
};

// ===========================
// SAFETY REPORTS
// ===========================

export const reportAPI = {
  create: (data) => api.post("/reports", data),

  getAll: (params = {}) => api.get("/reports", { params }),

  getById: (id) => api.get(`/reports/${id}`),
};

// ===========================
// OPPORTUNITIES
// ===========================

export const opportunityAPI = {
  getAll: (params = {}) => api.get("/opportunities", { params }),

  getById: (id) => api.get(`/opportunities/${id}`),

  create: (data) => api.post("/opportunities", data),
};

// ===========================
// SUPPORT REQUESTS
// ===========================

export const supportAPI = {
  create: (data) => api.post("/support", data),

  getAll: (params = {}) => api.get("/support", { params }),

  getById: (id) => api.get(`/support/${id}`),
};

// ===========================
// BACKEND HEALTH
// ===========================

export const healthAPI = {
  check: () => api.get("/health"),
};
