import { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import { API_PATHS } from "../../utils/apiPaths";
import axoisInstance from "../../utils/axiosInstance";
import { LuSquarePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import RecordListTabel, { RecordTabelType } from "../../components/RecordsTable";

function DeathRecords() {
  useUserAuth();
  const { user } = useContext(UserContext);

  const [deathRecordsData, setDeathRecordsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDeathRecords = async () => {
    try {
      const response = await axoisInstance.get(API_PATHS.RECORDS.HOSPITAL.GET_ALL_DEATH_RECORDS);

      if (response.data) {
        setDeathRecordsData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDeathRecords();
    return () => { };
  }, []);


  return (
    <DashboardLayout activeMenu="Death Records">
      <div className="card my-5">
        <div className="flex items-center justify-between">
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Hello, {user?.fullName}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>

          <Link to={"/hospital/add-death"} className="flex download-btn">
            <LuSquarePlus className="text-lg" />
            Add Death Record
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="card">
            <h3 className="text-lg md:text-xl font-medium mb-6">Birth Records</h3>
            <RecordListTabel
              tableData={deathRecordsData || []}
              recordTabelType={RecordTabelType.DeathTabel}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DeathRecords;
