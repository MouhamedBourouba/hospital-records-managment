import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

function HospitalDoctors() {
  // const location = useLocation();
  // const { uesrId } = location.state || {};
  // const navigate = useNavigate();
  //
  // const [userData, setUserData] = useState({
  //   FullName: "",
  //   PhoneNumber: "",
  //   Password: "",
  //   Role: "",
  //   Organization: "",
  // });
  //
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  //
  // const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  //
  // const handleValueChange = (key, value) => {
  //   setUserData((prevData) => ({ ...prevData, [key]: value }));
  // };
  //
  // const clearData = () => {
  //   // reset form
  //   setUserData({
  //     PhoneNumber: "",
  //     Password: "",
  //     Role: "",
  //     Organization: "",
  //     FullName: "",
  //   });
  // };
  //
  // // Create record
  // const createUser = async () => {
  //   setLoading(true);
  //
  //   try {
  //     await axoisInstance.post(API_PATHS.USERS.CREATE_USER,
  //       userData);
  //
  //     toast.success("User Added Successfully");
  //
  //     clearData();
  //   } catch (error) {
  //     console.error("Error creating User: ", error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // // Update Task
  // const updateUser = async () => {
  //   setLoading(false);
  //
  //   try {
  //     await axoisInstance.put(API_PATHS.TASKS.UPDATE_TASK(uesrId), {
  //       userData,
  //     });
  //
  //     toast.success("user Updated Seccessfully");
  //   } catch (error) {
  //     console.error("Error update user :", error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // // Get record info by ID
  // const getUserDetailsByID = async () => {
  //   try {
  //     const response = await axoisInstance.get(
  //       API_PATHS.TASKS.GET_TASK_BY_ID(uesrId)
  //     );
  //
  //     if (response.data) {
  //       const userInfo = response.data;
  //
  //       setUserData(() => ({
  //         PhoneNumber: userInfo.PhoneNumber,
  //         Password: userInfo.Password,
  //         Role: userInfo.Role,
  //       }));
  //     }
  //   } catch (error) {   
  //     console.error("Error fetching user data : ", error);
  //   }
  // };
  //
  // // Delete Record
  // const deleteUser = async () => {
  //   try {
  //     await axoisInstance.delete(API_PATHS.TASKS.DELETE_TASK(uesrId));
  //
  //     setOpenDeleteAlert(false);
  //     toast.success("Record deleted successfully");
  //     navigate("/admin/dashboard");
  //   } catch (error) {
  //     console.error(
  //       "Error Deleting Record : ",
  //       error.response?.data?.message || error.message
  //     );
  //   }
  // };
  //
  // const handleSubmit = async () => {
  //   setError(null);
  //
  //   // // Input validation
  //   if (!userData.FullName.trim()) {
  //     setError("Full Name is required.");
  //     return;
  //   }
  //
  //   if (!userData.PhoneNumber) {
  //     setError("Phone Number is required.");
  //     return;
  //   }
  //
  //   if (!userData.Password) {
  //     setError("Password is required.");
  //     return;
  //   }
  //
  //   if (!userData.Role) {
  //     setError("Role is required.");
  //     return;
  //   }
  //
  //   if (!userData.Organization) {
  //     setError("Organization is required.");
  //     return;
  //   }
  //
  //   if (uesrId) {
  //     updateUser();
  //     return;
  //   }
  //
  //   createUser();
  // };
  //
  // useEffect(() => {
  //   if (uesrId) {
  //     getUserDetailsByID(uesrId);
  //   }
  //
  //   return () => {};
  // }, [uesrId]);
  //
  // return (
  //   <DashboardLayout activeMenu={"Add Record"}>
  //     <div className="mt-5">
  //       <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
  //         <div className="form-card col-span-3">
  //           <div className="flex items-center justify-between">
  //             <h2 className="text-xl font-medium">
  //               {uesrId ? "Update Record" : "Add Record"}
  //             </h2>
  //
  //             {uesrId && (
  //               <button
  //                 className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
  //                 onClick={() => setOpenDeleteAlert(true)}
  //               >
  //                 <LuTrash2 className="text-base" /> Delete
  //               </button>
  //             )}
  //           </div>
  //
  //           <div className="mt-3">
  //             <label className="text-xs font-medium text-slate-600">
  //               Full Name
  //             </label>
  //
  //             <input
  //               placeholder="Full name"
  //               className="form-input"
  //               value={userData.FullName}
  //               onChange={(e) =>
  //                 handleValueChange("FullName", e.target.value)
  //               }
  //               type="text"
  //             />
  //           </div>
  //
  //           <div className="mt-3">
  //             <label className="text-xs font-medium text-slate-600">
  //               Phone Number
  //             </label>
  //
  //             <input
  //               placeholder="Phone number"
  //               className="form-input"
  //               value={userData.PhoneNumber}
  //               onChange={(e) =>
  //                 handleValueChange("PhoneNumber", e.target.value)
  //               }
  //               type="number"
  //             />
  //           </div>
  //
  //           <div>
  //             <label className="text-xs font-medium text-slate-600">
  //               Password
  //             </label>
  //
  //             <input
  //               placeholder="password"
  //               className="form-input"
  //               value={userData.Password}
  //               onChange={(e) => handleValueChange("Password", e.target.value)}
  //               type="password"
  //             />
  //           </div>
  //
  //           <div className="mt-3">
  //             <label className="text-xs font-medium text-slate-600">Role</label>
  //
  //             <select
  //               name="Gender"
  //               id="Gender"
  //               className="form-input"
  //               value={userData.Role}
  //               onChange={(e) => handleValueChange("Role", e.target.value)}
  //             >
  //               <option value="">Select Role</option>
  //               <option value="SuperAdmin">Super Admin</option>
  //               <option value="Admin">Admin</option>
  //               <option value="User">User</option>
  //             </select>
  //           </div>
  //
  //           <div className="mt-3">
  //             <label className="text-xs font-medium text-slate-600">
  //             Organization
  //             </label>
  //
  //             <select
  //               name="Organization"
  //               id="Organization"
  //               className="form-input"
  //               value={userData.Organization}
  //               onChange={(e) => handleValueChange("Organization", e.target.value)}
  //             >
  //               <option value="">Select Organization</option>
  //               <option value="Hospital">Hospital</option>
  //               <option value="DSP">DSP</option>
  //               <option value="Municipal">Municipal</option>
  //             </select>
  //           </div>
  //
  //           {error && (
  //             <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
  //           )}
  //
  //           <div className="flex justify-end mt-7">
  //             <button
  //               className="add-btn"
  //               onClick={handleSubmit}
  //               disabled={loading}
  //             >
  //               {uesrId ? "UPDATE User" : "Add User"}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //
  //     <Modal
  //       isOpen={openDeleteAlert}
  //       onClose={() => setOpenDeleteAlert(false)}
  //       title="Delete user"
  //     >
  //       <DeleteAlert
  //         content="Are you sure you want to delete this user?"
  //         onDelete={() => deleteUser()}
  //       />
  //     </Modal>
  //   </DashboardLayout>
  // );
  const { user } = useContext(UserContext);

  return (
    <DashboardLayout activeMenu="Doctors">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Hello, {user.fullName}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5"></div>
      </div>
    </DashboardLayout>
  );
}

export default HospitalDoctors;
