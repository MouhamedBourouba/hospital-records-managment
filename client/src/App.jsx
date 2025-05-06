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
import DashboardHospital from "./pages/Hospital/DashboardHospital";
import AddBirth from "./pages/Hospital/AddBirth";
import AddDeath from "./pages/Hospital/AddDeath";
import BirthRecords from "./pages/Hospital/BirthRecords";
import DeathRecords from "./pages/Hospital/DeathRecords";
import AddEmployee from "./pages/shared/AddEmployee";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/add-record" element={<AddRecord />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/add-user" element={<AddUser />} />
            </Route>

            {/*  Hospital Route */}
            <Route element={<PrivateRoute allowedRoles={["Hospital"]} />}>
              <Route
                path="/hospital/dashboard"
                element={<DashboardHospital />}
              />
              <Route path="/hospital/add-birth" element={<AddBirth />} />
              <Route path="/hospital/add-death" element={<AddDeath />} />
              <Route
                path="/hospital/birth-records"
                element={<BirthRecords />}
              />
              <Route
                path="/hospital/death-records"
                element={<DeathRecords />}
              />
              <Route path="/hospital/add-employee" element={<AddEmployee />} />
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

  return user.role === "adimn" ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    <Navigate to={"/user/dashboard"} />
  );
};
