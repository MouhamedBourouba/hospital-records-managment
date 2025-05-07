import moment from "moment";
import axoisInstance from "../utils/axiosInstance";
import { LuCheck, LuX } from "react-icons/lu";
import { API_PATHS } from "../utils/apiPaths";

export const RecordTabelType = {
  DeathTabel: 0,
  BirthTabe: 1,
}
export const RecordTabelOrganizationType = {
  Hospital: 0,
  ASP: 1,
  DSP: 2
}

const RecordsTable = ({
  tableData,
  isLoading,
  recordTabelType = RecordTabelType.BirthTabe,
  recordTableOrganization = RecordTabelOrganizationType.Hospital
}) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-500 border border-green-200";
      case "pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "rejected":
        return "bg-red-100 text-red-500 border border-red-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const approveRecord = async (record) => {
    try {
      const path = recordTabelType == RecordTabelType.BirthTabe ? 
        API_PATHS.RECORDS.ASP.APPROVE_BIRTH_RECORD :
        API_PATHS.RECORDS.ASP.APPROVE_DEATH_RECORD;

      const res = await axoisInstance.post(path + record._id)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const rejectRecord = async (record) => {
    try {
      console.log("klafjsakldfjasdlk;jfkljfakl;sj")
      const path = recordTabelType == RecordTabelType.BirthTabe ? 
        API_PATHS.RECORDS.ASP.REJECT_BIRTH_RECORD :
        API_PATHS.RECORDS.ASP.REJECT_DEATH_RECORD;

      console.log(path)

      const res = await axoisInstance.post(path + record._id)
      console.log(path)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
              Full Name
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
              City
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">
              Gender
            </th>

            <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">
              Birth Date
            </th>

            {recordTabelType == RecordTabelType.DeathTabel ? (
              <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">
                Death Date
              </th>
            ) : null}

            <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <tr className="border-t border-gray-200 text-center">
            <td className="p-4" colSpan={5}>Loading...</td>
          </tr>}
          {tableData.map((user) => (
            <tr key={user._id} className="border-t border-gray-200">
              <td className="p-4">
                <span className="my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden">
                  {user.LatinFullName}
                </span>
              </td>

              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block bg-gray-100 text-gray-500 border border-gray-200`}
                >
                  {user.City}
                </span>
              </td>

              <td className="p-4">
                <span className="my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden">
                  {user.Gender}
                </span>
              </td>

              <td className="p-4 text-gray-700 text-[13px] text-nowrap hidden md:table-cell">
                {user.BirthDate
                  ? moment(user.BirthDate).format("Do MMM YYYY")
                  : "N/A"}
              </td>

              {recordTabelType == RecordTabelType.DeathTabel ? (
                <td className="p-4 text-gray-700 text-[13px] text-nowrap hidden md:table-cell">
                  {user.DateOfDeath ? moment(user.DateOfDeath).format("Do MMM YYYY")
                    : "N/A"}
                </td>
              ) : null}

              <td className="p-4">
                <span
                  className={`${getStatusBadgeColor(
                    user.Status
                  )} px-2 py-1 text-xs rounded inline-block`}
                >
                  {user.Status}
                </span>
              </td>

              {
                recordTableOrganization == RecordTabelOrganizationType.ASP
                  && user.Status == "pending" ?
                  (<td className="w-1">
                    <div className="flex gap-2 justify-center items-center me-2">
                      <button onClick={() => { approveRecord(user) }} className="text-green-600 hover:text-green-800">
                        <LuCheck size={25} />
                      </button>
                      <button onClick={() => { rejectRecord(user) }} className="text-red-600 hover:text-red-800">
                        <LuX size={25} />
                      </button>
                    </div>
                  </td>) : null
              }

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
