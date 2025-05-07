import { useState } from "react";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";

function AddDeath() {
  useUserAuth();
  const [formData, setFormData] = useState({
    ArabicFullName: "",
    LatinFullName: "",
    BirthDate: "",
    DateOfDeath: "",
    PlaceOfDeath: "",
    CauseOfDeath: "",
    City: "",
    Gender: "Male",
    FatherName: "",
    MotherName: "",
  });

  const [message, setMessage] = useState("");
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axoisInstance.post(
        API_PATHS.RECORDS.HOSPITAL.CREATE_DEATH_RECORD,
        formData
      );
      toast.success("Birth record added Successfully");
      navigator("/hospital/death-records");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error submitting record.");
    }
  };

  return (
    <DashboardLayout activeMenu={"Add employees"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Submit Death Record</h2>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Arabic full name :
                </label>

                <input
                  name={"ArabicFullName"}
                  placeholder={"Enter Arabic Fullname"}
                  className="form-input"
                  value={formData.ArabicFullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Latin full name :
                </label>

                <input
                  name={"LatinFullName"}
                  placeholder={"Enter latin full name"}
                  className="form-input"
                  value={formData.LatinFullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Birth Date :
                </label>
                <input
                  type="date"
                  name="BirthDate"
                  className="form-input"
                  value={formData.BirthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Death date
                </label>
                <input
                  type="date"
                  name="DateOfDeath"
                  className="form-input"
                  value={formData.DateOfDeath}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Gender
                </label>

                <select
                  name="Gender"
                  id="Gender"
                  className="form-input"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  City :
                </label>

                <input
                  name={"City"}
                  placeholder={"City"}
                  className="form-input"
                  value={formData.City}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Place of death :
                </label>

                <input
                  name={"PlaceOfDeath"}
                  placeholder={"Place of death"}
                  className="form-input"
                  value={formData.PlaceOfDeath}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Cause of death :
                </label>

                <input
                  name={"CauseOfDeath"}
                  placeholder={"Cause of death"}
                  className="form-input"
                  value={formData.CauseOfDeath}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Father's full name :
                </label>

                <input
                  name={"FatherName"}
                  placeholder={"Father's full name"}
                  className="form-input"
                  value={formData.FatherName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs font-medium text-slate-600">
                  Mother's full name :
                </label>

                <input
                  name={"MotherName"}
                  placeholder={"Mother's full name"}
                  className="form-input"
                  value={formData.MotherName}
                  onChange={handleChange}
                />
              </div>
            </div>
            {message && <p className="mt-4 text-red-600">{message}</p>}
            <div className="flex justify-end mt-7">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 w-full text-white px-4 py-2 col-span-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddDeath;
