import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar.jsx";
import MetaData from "../layout/MetaData";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <MetaData title={title} />
      <Sidebar className="flex-shrink-0 w-64 bg-gray-800 text-white p-4" />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
