import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

// Hospital
import DeathRecordsHospital from "./pages/Hospital/DeathRecords"
import BirthRecordsHospital from "./pages/Hospital/BirthRecords"
import AddDeath from "./pages/Hospital/AddDeath"
import AddBirth from "./pages/Hospital/AddBirth"

// ASP
import DeathRecordsAsp from "./pages/Asp/DeathRecords"
import BirthRecordsAsp from "./pages/Asp/BirthRecords"

// RSH
import DeathRecordsRsh from "./pages/Rsh/DeathRecords"
import BirthRecordsRsh from "./pages/Rsh/BirthRecords"

// DSP
import DeathRecordsDsp from "./pages/Dsp/DeathRecords"
import BirthRecordsDsp from "./pages/Dsp/BirthRecords"

// shared
import AddEmployee from "./pages/shared/AddEmployee"
import AddOrganization from "./pages/shared/AddOrganization"
import { API_PATHS } from "./utils/apiPaths";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Hospital Routes */}
            <Route element={<PrivateRoute allowedRoles={["Hospital"]} />}>
              <Route path="/hospital/death-records" element={<DeathRecordsHospital />} />
              <Route path="/hospital/birth-records" element={<BirthRecordsHospital />} />
              <Route path="/hospital/add-death" element={<AddDeath />} />
              <Route path="/hospital/add-birth" element={<AddBirth />} />
              <Route path="/hospital/employees" element={<AddEmployee />} />
            </Route>

            {/* ASP Routes */}
            <Route element={<PrivateRoute allowedRoles={["ASP"]} />}>
              <Route path="/asp/death-records" element={<DeathRecordsAsp />} />
              <Route path="/asp/birth-records" element={<BirthRecordsAsp />} />
              <Route path="/asp/employees" element={<AddEmployee />} />
              <Route path="/asp/hospitals" element={<AddOrganization lable="Add Hospitals" name="Hospital"/>} />
            </Route>

            {/* DSP Routes */}
            <Route element={<PrivateRoute allowedRoles={["DSP"]} />}>
              <Route path="/dsp/death-records" element={<DeathRecordsDsp />} />
              <Route path="/dsp/birth-records" element={<BirthRecordsDsp />} />
              <Route path="/dsp/employees" element={<AddEmployee />} />
              <Route path="/dsp/asps" element={<AddOrganization />} />
              <Route path="/dsp/add-rsh" element={<AddEmployee
                jobTitle="Researcher"
                apiPath={API_PATHS.CREATE_RESEARCHER} />} />
            </Route>

            {/* Researcher Routes */}
            <Route element={<PrivateRoute allowedRoles={["RSH"]} />}>
              <Route path="/rsh/death-records" element={<DeathRecordsRsh />} />
              <Route path="/rsh/birth-records" element={<BirthRecordsRsh />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
}

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return user.organizationType === "Hospital" ? (
    <Navigate to={"/hospital/death-records"} />
  ) : user.organizationType === "ASP" ? (
    <Navigate to={"/asp/death-records"} />
  ) : (
    <Navigate to={"/dsp/death-records"} />
  );
};
