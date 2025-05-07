import  {useState} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { valideEmail } from "../../utils/helper";

function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (key, value) => {
    setEmployeeData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    // reset form
    setEmployeeData({
      fullName: "",
      email: "",
    });
  };

  // Create employee
  const createEmployee = async () => {
    setLoading(true);

    try {
      await axoisInstance.post(API_PATHS.AUTH.CREATE_EMPLOYEE, employeeData);
      toast.success("ُEmployee Created Successfully");

      clearData();
    } catch (error) {
      console.error("Error creating employee: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    // Input validation
    if (!employeeData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!valideEmail(employeeData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    createEmployee();
  };

  return (
    <DashboardLayout activeMenu={"Add employees"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                Create Employee
              </h2>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Full name :
              </label>

              <input
                placeholder="Enter a full name here."
                className="form-input"
                value={employeeData.fullName}
                onChange={(e) => handleValueChange("fullName", e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Email :
              </label>

              <input
                placeholder="john@example.com"
                className="form-input"
                value={employeeData.email}
                onChange={(e) => handleValueChange("email", e.target.value)}
                type="email"
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                CREATE EMPLOYEE
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddEmployee;
