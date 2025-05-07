import DashboardLayout from "../../components/layouts/DashboardLayout";
import  {useState} from "react";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

function AddHospital() {
  const [hospitalName, setHospitalName] = useState({
    name: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (key, value) => {
    setHospitalName((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setHospitalName({
      name: "",
    });
  };

  const createHospital = async () => {
    setLoading(true);

    try {
      await axoisInstance.post(API_PATHS.CREATE_ORG, hospitalName);
      toast.success("ُHospital Created Successfully");
      clearData();
    } catch (error) {
      console.error("Error creating Hospital: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!hospitalName.name.trim()) {
      setError("name is required.");
      return;
    }

    createHospital();
  };

  return (
    <DashboardLayout activeMenu={"Add Hospitals"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                Create Hospital
              </h2>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                name:
              </label>

              <input
                placeholder="Enter a full name here."
                className="form-input"
                value={hospitalName.name}
                onChange={(e) => handleValueChange("name", e.target.value)}
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
                CREATE HOSPITAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddHospital;
