import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import AddRecord from "./pages/Admin/AddRecord";
import UserProvider, { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import AddUser from "./pages/Admin/AddUser";

import DeathRecords from "./pages/Hospital/DeathRecords"
import BirthRecords from "./pages/Hospital/BirthRecords"
import HospitalDoctors from "./pages/Hospital/Users"

import DeathRecordsAsp from "./pages/Asp/DeathRecords"
import BirthRecordsAsp from "./pages/Asp/BirthRecords"
import AddHospital from "./pages/Asp/AddHospital"
import AspEmployees from "./pages/Asp/Employees";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Hospital Routes */}
            <Route element={<PrivateRoute allowedRoles={["Hospital"]} />}>
              <Route path="/hospital/death-records" element={<DeathRecords />} />
              <Route path="/hospital/birth-records" element={<BirthRecords />} />
              <Route path="/hospital/users" element={<HospitalDoctors />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["ASP"]} />}>
              <Route path="/asp/death-records" element={<DeathRecordsAsp />} />
              <Route path="/asp/birth-records" element={<BirthRecordsAsp />} />
              <Route path="/asp/employees" element={<AspEmployees />} />
              <Route path="/asp/hospilats" element={<AddHospital />} />
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
