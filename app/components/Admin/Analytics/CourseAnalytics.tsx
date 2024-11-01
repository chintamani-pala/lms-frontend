import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Label,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

const CourseAnalytics = () => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: "Jun 2023", uv: 3 },
  //     { name: "July 2023", uv: 2 },
  //     { name: "August 2023", uv: 5 }, // Corrected spelling
  //     { name: "Sept 2023", uv: 7 },
  //     { name: "October 2023", uv: 2 },
  //     { name: "Nov 2023", uv: 5 },
  //     { name: "December 2023", uv: 7 },
  //   ];

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: item.month,
        uv: item.count,
      });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen ">
          <div className="mt-12 px-6">
            <h1 className={`${styles.title} text-center`}>Courses Analytics</h1>
            <p
              className={`${styles.label} text-center text-gray-600 dark:text-gray-400`}
            >
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[80%] flex items-center justify-center">
            <ResponsiveContainer width="85%" height="60%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="name" tick={{ fill: "#555" }} />
                <YAxis domain={[minValue, "auto"]} tick={{ fill: "#555" }} />
                <Bar dataKey="uv" fill="#3faf82" radius={[5, 5, 0, 0]}>
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
