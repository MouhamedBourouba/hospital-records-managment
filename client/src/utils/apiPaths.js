export const BASE_URL = "http://localhost:5000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/login/",
    GET_USER: "/api/employee/",
    CREATE_EMPLOYEE: "/api/register-employee/",
  },

  CREATE_RESEARCHER: "/api/register-researcher/",

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
    },
    DSP: {
      GET_ALL_BIRTH_RECORDS: "/api/dsp/birth-record/",
      GET_ALL_DEATH_RECORDS: "/api/dsp/death-record/",
    },
    RSH: {
      GET_ALL_BIRTH_RECORDS: "/api/birth-anonym/",
      GET_ALL_DEATH_RECORDS: "/api/death-anonym/",
      GET_ALL_BIRTH_RECORDS_CSV: "/api/death-anonym/cvs",
      GET_ALL_DEATH_RECORDS_CSV: "/api/death-anonym/cvs",
    }
  },

  CREATE_ORG: "/api/organization",

  EXPORT_PDF: {
    BIRTH: (id) => `/api/birth-record/${id}/pdf`,
    DEATH: (id) => `/api/death-record/${id}/pdf`,
  }, 
};
