export const BASE_URL = "http://localhost:5000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/login/",
    GET_USER: "/api/employee/",
    CREATE_EMPLOYEE: "/api/register-employee/",
  },

  RECORDS: {
    HOSPITAL: {
      CREATE_DEATH_RECORD: "/api/death-record/",
      CREATE_BIRTH_RECORD: "/api/birth-record/",
      GET_ALL_BIRTH_RECORDS: "/api/hospital/birth-record/",
      GET_ALL_DEATH_RECORDS: "/api/hospital/death-record/",
    },
    ASP: {
      GET_ALL_BIRTH_RECORDS: "/api/asp/birth-record/",
      GET_ALL_DEATH_RECORDS: "/api/asp/death-record/",
      APPROVE_BIRTH_RECORD: "/api/asp/approve-birth-record/",
      REJECT_BIRTH_RECORD: "/api/asp/reject-birth-record/",
      APPROVE_DEATH_RECORD: "/api/asp/approve-death-record/",
      REJECT_DEATH_RECORD: "/api/asp/reject-death-record/"
    }
  },
};
