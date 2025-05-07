import { useState } from "react";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddBirth() {
  useUserAuth();
  const [formData, setFormData] = useState({
    ArabicFullName: "",
    LatinFullName: "",
    BirthDate: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axoisInstance.post(
        API_PATHS.RECORDS.HOSPITAL.CREATE_BIRTH_RECORD,
        formData
      );
      toast.success("Birth record added Successfully");
      navigator("/hospital/birth-records");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error submitting record.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="form-card mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-slate-700">
          Submit Death Record
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-slate-600">
              Arabic full name :
            </label>

            <input
              name={"ArabicFullName"}
              placeholder={"Enter Arabic full name"}
              className="form-input"
              value={formData.ArabicFullName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium text-slate-600">
            Latin full name :
            </label>

            <input
              name={"LatinFullName"}
              placeholder={"Enter Latin full name"}
              className="form-input"
              value={formData.LatinFullName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium text-slate-600">
              Birth Date
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

          <div className="flex flex-col">
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

          <div className="flex flex-col">
            <label className="text-xs font-medium text-slate-600">Gender</label>

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

          <div className="flex flex-col">
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

          <div className="flex flex-col">
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

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 col-span-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}

export default AddBirth;
