export const BASE_URL = "http://localhost:5000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/login",
    GET_USER: "/api/employee",
    CREATE_EMPLOYEE: "/api/register-employee",
  },

  RECORDS: {
    HOSPITAL: {
      CREATE_DEATH_RECORD: "/api/death-record",
      CREATE_BIRTH_RECORD: "/api/birth-record",
      GET_ALL_BIRTH_RECORDS: "/api/hospital/birth-record",
      GET_ALL_DEATH_RECORDS: "/api/hospital/death-record",
    },
    ASP: {
      GET_ALL_BIRTH_RECORDS: "/api/asp/birth-record",
      GET_ALL_DEATH_RECORDS: "/api/asp/death-record",
    }
  },

  USERS: {
    GET_ALL_USERS: "/api/getUsers", // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
    CREATE_USER: "/register", // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user
    DELETE_USER: (userId) => `/api/users/${userId}`, // Delete user
  },
};
