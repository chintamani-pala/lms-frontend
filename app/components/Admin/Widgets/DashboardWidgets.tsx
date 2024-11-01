import React, { FC } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import UserAnalytics from "../Analytics/UserAnalytics";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ value, open }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] ml-3 gap-4">
        {/* Adjust grid layout */}
        <div className="p-4 md:p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="mt-[45px] flex flex-col justify-start mr-2">
          {/* Align cards vertically */}
          {/* Sales Obtained Card */}
          <div className="w-full dark:bg-[#111C43] rounded-lg shadow-md p-5 flex items-center justify-between mt-4">
            <div className="flex items-center">
              <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
              <div className="ml-3">
                <h5 className="font-Poppins dark:text-[#fff] text-black text-[20px] md:text-[24px] font-semibold">
                  120
                </h5>
                <h5 className="font-Poppins dark:text-[#45CBA0] text-black text-[16px] md:text-[18px] font-light">
                  Sales Obtained
                </h5>
              </div>
            </div>
            <div className="text-right">
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="pt-2 text-center text-gray-500 text-[14px] md:text-[16px]">
                +120%
              </h5>
            </div>
          </div>
          {/* New Users Card */}
          <div className="w-full dark:bg-[#111C43] rounded-lg shadow-md p-5 flex items-center justify-between mt-4">
            <div className="flex items-center">
              <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
              <div className="ml-3">
                <h5 className="font-Poppins dark:text-[#fff] text-black text-[20px] md:text-[24px] font-semibold">
                  450
                </h5>
                <h5 className="font-Poppins dark:text-[#45CBA0] text-black text-[16px] md:text-[18px] font-light">
                  New Users
                </h5>
              </div>
            </div>
            <div className="text-right">
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="pt-2 text-center text-gray-500 text-[14px] md:text-[16px]">
                +150%
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111C43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
