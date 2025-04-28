import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex items-center justify-center w-[90%] md:w-[50%] shadow-sm rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
