// import React, { FC } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid, // Import CartesianGrid
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import { styles } from "@/app/styles/style";

// type Props = {
//   isDashboard?: boolean;
// };

// const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
//   const { data, isLoading } = useGetOrdersAnalyticsQuery({});

//   const analyticsData = data || [
//     { name: "Jun 2023", count: Math.floor(Math.random() * 500) }, // Random count between 0 and 499
//     { name: "July 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Aug 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Sept 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Oct 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Nov 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Dec 2023", count: Math.floor(Math.random() * 500) },
//   ];

//   //   const analyticsData: any = [];

//   //   data &&
//   //     data.orders.last12Months.forEach((item: any) => {
//   //       analyticsData.push({
//   //         name: item.month,
//   //         count: item.count,
//   //       });
//   //     });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div
//           className={`${
//             !isDashboard
//               ? "mt-[50px]"
//               : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
//           }`}
//         >
//           <div className={`${isDashboard ? "!ml-8 mb-5" : "mt-[20px]"}`}>
//             <h1
//               className={`${styles.title} ${
//                 isDashboard ? "text-[20px]" : ""
//               } px-5 text-center`}
//             >
//               Orders Analytics
//             </h1>

//             {!isDashboard && (
//               <p className={`${styles.label} px-5 text-center`}>
//                 Last 12 months analytics data
//               </p>
//             )}
//           </div>

//           <div
//             className={`w-full ${
//               isDashboard ? "h-[30vh]" : "h-screen"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={isDashboard ? "100%" : "50%"}
//             >
//               <AreaChart
//                 data={analyticsData}
//                 margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />{" "}
//                 {/* Add CartesianGrid */}
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="count"
//                   stroke="#4d62d9"
//                   fill="#4d62d9"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderAnalytics;

// import React, { FC } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import { styles } from "@/app/styles/style";

// type Props = {
//   isDashboard?: boolean;
// };

// const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
//   const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});

//   // Log the data fetching state
//   console.log({ data, isLoading, isError });

//   if (isError) {
//     return <div>Error fetching data</div>; // Display error message
//   }

//   const analyticsData = data?.order?.last12Months?.map((item: any) => ({
//     name: item.month,
//     count: item.count,
//   })) || [
//     { name: "Jun 2023", count: Math.floor(Math.random() * 500) },
//     { name: "July 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Aug 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Sept 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Oct 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Nov 2023", count: Math.floor(Math.random() * 500) },
//     { name: "Dec 2023", count: Math.floor(Math.random() * 500) },
//   ];

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div
//           className={`${
//             !isDashboard
//               ? "mt-[50px]"
//               : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
//           }`}
//         >
//           <div className={`${isDashboard ? "!ml-8 mb-5" : "mt-[20px]"}`}>
//             <h1
//               className={`${styles.title} ${
//                 isDashboard ? "text-[20px]" : ""
//               } px-5 text-center`}
//             >
//               Orders Analytics
//             </h1>

//             {!isDashboard && (
//               <p className={`${styles.label} px-5 text-center`}>
//                 Last 12 months analytics data
//               </p>
//             )}
//           </div>

//           <div
//             className={`w-full ${
//               isDashboard ? "h-[30vh]" : "h-screen"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={isDashboard ? "100%" : "50%"}
//             >
//               <AreaChart
//                 data={analyticsData}
//                 margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="count"
//                   stroke="#4d62d9"
//                   fill="#4d62d9"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderAnalytics;

// import React, { FC } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import { styles } from "@/app/styles/style";

// type Props = {
//   isDashboard?: boolean;
// };

// const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
//   const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});

//   // Log the data fetching state
//   console.log({ data, isLoading, isError });

//   if (isError) {
//     return <div>Error fetching data</div>; // Display error message
//   }

//   // Prepare analytics data. You need to modify this based on the actual data structure.
//   const analyticsData =
//     data?.order?.last12Months?.map((item: any) => ({
//       name: item.month,
//       pv: item.count, // Assuming 'pv' corresponds to count in your data
//       uv: Math.floor(Math.random() * 500), // Mock data for uv, replace with actual if available
//     })) || [];

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div
//           className={`${
//             !isDashboard
//               ? "mt-[50px]"
//               : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
//           }`}
//         >
//           <div className={`${isDashboard ? "!ml-8 mb-5" : "mt-[20px]"}`}>
//             <h1
//               className={`${styles.title} ${
//                 isDashboard ? "text-[20px]" : ""
//               } px-5 text-center`}
//             >
//               Orders Analytics
//             </h1>

//             {!isDashboard && (
//               <p className={`${styles.label} px-5 text-center`}>
//                 Last 12 months analytics data
//               </p>
//             )}
//           </div>

//           <div
//             className={`w-full ${
//               isDashboard ? "h-[30vh]" : "h-screen"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={isDashboard ? "100%" : "50%"}
//             >
//               <LineChart
//                 data={analyticsData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderAnalytics;

import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
  // Dummy data for the chart
  const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});
  const analyticsData = data?.orders?.last12Months?.map((item: any) => ({
    name: item.month,
    count: item.count,
  }));
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : " dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : "mt-[20px]"}`}>
            <h1
              className={`${styles.title} ${
                isDashboard ? "text-[20px]" : ""
              } px-5 text-center`}
            >
              Orders Analytics
            </h1>

            {!isDashboard && (
              <p className={`${styles.label} px-5 text-center`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
