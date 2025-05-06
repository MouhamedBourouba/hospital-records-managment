import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import moment from "moment";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";

function AddRecord() {
  const location = useLocation();
  const { recordId } = location.state || {};
  const navigate = useNavigate();

  const [recordData, setRecordData] = useState({
    ArabicFullName: "",
    LatinFullName: "",
    BirthDate: null,
    City: "",
    Wilaya: "",
    Gender: "",
    parents: {
      fatherName: "",
      motherName: ""
    },
    SignedBy: "",
    DateOfDeath: null,
    PlaceOfDeath: "",
    CauseOfDeath: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setRecordData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    // reset form
    setRecordData({
      ArabicFullName: "",
      LatinFullName: "",
      BirthDate: null,
      City: "",
      Wilaya: "",
      Gender: "",
      parents: {
        fatherName: "",
        motherName: ""
      },
      SignedBy: "",
      DateOfDeath: null,
      PlaceOfDeath: "",
      CauseOfDeath: "",
    });
  };

  // Create record
  const createRecord = async () => {
    setLoading(true);

    try {
      await axoisInstance.post(API_PATHS.RECORD.CREATE_RECORD, {
        ...recordData,
        BirthDate: new Date(recordData.BirthDate).toISOString(),
        DateOfDeath: recordData.DateOfDeath ? new Date(recordData?.DateOfDeath)?.toISOString() : null,
        PlaceOfDeath: recordData.PlaceOfDeath ? recordData.PlaceOfDeath : null,
        CauseOfDeath: recordData.CauseOfDeath ? recordData.CauseOfDeath : null,
      });

      toast.success("Record Added Successfully");

      clearData();
    } catch (error) {
      console.error("Error creating record: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateRecord = async () => {
    setLoading(false);

    try {
      await axoisInstance.put(API_PATHS.TASKS.UPDATE_TASK(recordId), {
        ...recordData,
        BirthDate: new Date(recordData.BirthDate).toISOString(),
        DateOfDeath: recordData.DateOfDeath ? new Date(recordData?.DateOfDeath)?.toISOString() : null,
        PlaceOfDeath: recordData.PlaceOfDeath ? recordData.PlaceOfDeath : null,
        CauseOfDeath: recordData.CauseOfDeath ? recordData.CauseOfDeath : null,
      });

      toast.success("Record Updated Seccessfully");
    } catch (error) {
      console.error("Error update record :", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Get record info by ID
  const getRecordDetailsByID = async () => {
    try {
      const response = await axoisInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(recordId)
      );

      if (response.data) {
        const recordInfo = response.data;

        setRecordData(() => ({
          ArabicFullName: recordInfo.ArabicFullName,
          LatinFullName: recordInfo.LatinFullName,
          BirthDate: recordInfo.BirthDate ? moment(recordInfo.BirthDate).format('YYY-MM-DD') : null,
          City: recordInfo.City,
          Wilaya: recordInfo.Wilaya,
          Gender: recordInfo.Gender,
          parents: {},
          SignedBy: recordInfo.SignedBy,
          DateOfDeath: recordInfo.DateOfDeath ? moment(recordInfo.DateOfDeath).format('YYY-MM-DD') : null,
          PlaceOfDeath: recordInfo.PlaceOfDeath,
          CauseOfDeath: recordInfo.CauseOfDeath,
        }));
      }
    } catch (error) {
      console.error("Error fetching record data : ", error);
    }
  };

  // Delete Record
  const deleteUser = async () => {
    try {
      await axoisInstance.delete(API_PATHS.TASKS.DELETE_TASK(recordId));

      setOpenDeleteAlert(false);
      toast.success("Record deleted successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(
        "Error Deleting Record : ",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleSubmit = async () => {
    setError(null);

    // // Input validation
    if (!recordData.ArabicFullName.trim()) {
      setError("Arabic Full Name is required.");
      return;
    }
    if (!recordData.LatinFullName.trim()) {
      setError("Latin Full Name is required.");
      return;
    }
    if (!recordData.BirthDate) {
      setError("Birth Date is required.");
      return;
    }
    if (!recordData.Gender) {
      setError("Gender is required.");
      return;
    }

    if (!recordData.City) {
      setError("Gender is required.");
      return;
    }

    if (!recordData.Wilaya) {
      setError("Gender is required.");
      return;
    }

    if (!recordData.parents.fatherName) {
      setError("father name is required.");
      return;
    }

    if (!recordData.parents.motherName) {
      setError("mother name is required.");
      return;
    }

    if (!recordData.SignedBy) {
      setError("Signed By is required.");
      return;
    }

    if (recordId) {
      updateRecord();
      return;
    }

    createRecord();
  };

  useEffect(() => {
    if (recordId) {
      getRecordDetailsByID(recordId);
    }

    return () => { };
  }, [recordId]);

  return (
    <DashboardLayout activeMenu={"Add Record"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {recordId ? "Update Record" : "Add Record"}
              </h2>

              {recordId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Arabic full Name
                </label>

                <input
                  placeholder="Arabic full name"
                  className="form-input"
                  value={recordData.ArabicFullName}
                  onChange={(e) =>
                    handleValueChange("ArabicFullName", e.target.value)
                  }
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Latin full name
                </label>

                <input
                  placeholder="Latin full name"
                  className="form-input"
                  value={recordData.LatinFullName}
                  onChange={(e) =>
                    handleValueChange("LatinFullName", e.target.value)
                  }
                  type="text"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Gender
                </label>

                <select
                  name="Gender"
                  id="Gender"
                  className="form-input"
                  value={recordData.Gender}
                  onChange={(e) => handleValueChange("Gender", e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Birth date
                </label>

                <input
                  className="form-input"
                  value={recordData.BirthDate}
                  onChange={(e) =>
                    handleValueChange("BirthDate", e.target.value)
                  }
                  type="date"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  City
                </label>

                <input
                  placeholder="City"
                  className="form-input"
                  value={recordData.City}
                  onChange={(e) => handleValueChange("City", e.target.value)}
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Wilaya
                </label>

                <input
                  placeholder="Wilaya"
                  className="form-input"
                  value={recordData.dueDate}
                  onChange={(e) => handleValueChange("Wilaya", e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Father full name
                </label>

                <input
                  placeholder="Father full name"
                  className="form-input"
                  value={recordData.parents.fatherName}
                  onChange={(e) => handleValueChange("parents", { motherName: recordData.parents.motherName, fatherName: e.target.value })}
                />
              </div>

              <div className="col-span-6 md:col-span-4 mt-3">
                <label className="text-xs font-medium text-slate-600">
                  Mother full name
                </label>

                <input
                  placeholder="Mother full name"
                  className="form-input"
                  value={recordData.parents.motherName}
                  onChange={(e) => handleValueChange("parents", { fatherName: recordData.parents.fatherName, motherName: e.target.value })}
                  type="text"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600">
                Signed By
              </label>

              <input
                className="form-input"
                value={recordData.SignedBy}
                onChange={(e) => handleValueChange("SignedBy", e.target.value)}
                type="text"
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Date of death
                </label>

                <input
                  className="form-input"
                  value={recordData.DateOfDeath}
                  onChange={(e) =>
                    handleValueChange("DateOfDeath", e.target.value)
                  }
                  type="date"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Place of death
                </label>

                <input
                  placeholder="Place of death"
                  className="form-input"
                  value={recordData.PlaceOfDeath}
                  onChange={(e) =>
                    handleValueChange("PlaceOfDeath", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Cause of death
                </label>

                <textarea
                  placeholder="Cause of death"
                  className="form-input"
                  rows={4}
                  value={recordData.CauseOfDeath}
                  onChange={(e) =>
                    handleValueChange("CauseOfDeath", e.target.value)
                  }
                ></textarea>
              </div>
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
                {recordId ? "UPDATE Record" : "Add Record"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Record"
      >
        <DeleteAlert
          content="Are you sure you want to delete this record?"
          onDelete={() => deleteUser()}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default AddRecord;
