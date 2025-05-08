import { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import { API_PATHS } from "../../utils/apiPaths";
import axoisInstance from "../../utils/axiosInstance";
import RecordListTabel, { RecordTabelOrganizationType, RecordTabelType } from "../../components/RecordsTable";

function BirthRecords() {
  useUserAuth();
  const { user } = useContext(UserContext);

  const [deathRecordsData, setDeathRecordsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDeathRecords = async () => {
    try {
      const response = await axoisInstance.get(API_PATHS.RECORDS.RSH.GET_ALL_BIRTH_RECORDS);
      setDeathRecordsData(response.data.map(record => ({
        ...record,
        LatinFullName: record.HashedLatinFullName.slice(0, 5),
      })));
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await axoisInstance.get(API_PATHS.RECORDS.RSH.GET_ALL_BIRTH_RECORDS_CSV, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'birth_records.csv'); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const copyAccessToken = async () => {
    try {
      await navigator.clipboard.writeText(localStorage.getItem("token"));
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  useEffect(() => {
    getDeathRecords();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Birth Records">
      <div className="card my-5">
        <div className="flex items-center justify-between">
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Hello, {user?.fullName}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
          <div>
            <button className="download-btn me-3" onClick={downloadCSV}>Download CSV</button>
            <button className="download-btn" onClick={copyAccessToken}>Copy Access Token</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="card">
            <h3 className="text-lg md:text-xl font-medium mb-6">Birth Records</h3>
            <RecordListTabel
              tableData={deathRecordsData || []}
              recordTabelType={RecordTabelType.BirthTabe}
              recordTableOrganization={RecordTabelOrganizationType.DSP}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BirthRecords;
