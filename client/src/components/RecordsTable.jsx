import moment from "moment";

const RecordsTable = ({ tableData, isLoading }) => {
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

              <td className="p-4">
                <span
                  className={`${getStatusBadgeColor(
                    user.Status
                  )} px-2 py-1 text-xs rounded inline-block`}
                >
                  {user.Status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
