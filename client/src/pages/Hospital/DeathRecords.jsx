import React from "react";

function DeathRecords() {
  useUserAuth();
  const { user } = useContext(UserContext);

  return (
    <DashboardLayout activeMenu="Death records">
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

export default DeathRecords;
