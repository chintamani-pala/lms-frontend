"use client";
import React from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
// import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = ({ params }: any) => {
  const id = params.id;
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Create Course"
          description="Learning Management System"
          keywords="Programming,LMS,Learning,Computer Scienc,Web Development"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            {/* <CreateCourse /> */}
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
