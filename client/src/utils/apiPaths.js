export const BASE_URL = "http://localhost:5000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/login",
    GET_USER: "/api/employee"
  },

  RECORD: {
    CREATE_RECORD: "/api/addRecord",
    GET_ALL_RECORD: "/api/getRecords",
  },

  USERS: {
    GET_ALL_USERS: "/api/getUsers", // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
    CREATE_USER: "/register", // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user
    DELETE_USER: (userId) => `/api/users/${userId}`, // Delete user
  },
};
