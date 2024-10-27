// import {
//   useEditLayoutMutation,
//   useGetHeroDataQuery,
// } from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import toast from "react-hot-toast";

// type Props = {};

// const EditCategories = (props: Props) => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
//     refetchOnMountOrArgChange: true,
//   });
//   const [editlayout, { isSuccess: layoutSuccess, error, reset }] =
//     useEditLayoutMutation();
//   const [categories, setCategories] = useState<any>([]);

//   useEffect(() => {
//     if (data) {
//       setCategories(data?.layout?.categories);
//     }
//     if (layoutSuccess) {
//       toast.success("Categories Updated Successfully");
//       refetch();
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error("Failed to update categories: " + errorData?.data?.message);
//       }
//     }
//   }, [data, layoutSuccess, error]);

//   const handleCategoriesAdd = (id: any, value: string) => {
//     setCategories((prevCategories: any) => {
//       return prevCategories.map((category: any) => {
//         if (category._id === id) {
//           return { ...category, title: value };
//         }
//         return category;
//       });
//     });
//   };

//   const areCategoriesUnchanged = (
//     originalCategories: any[],
//     newCategories: any[]
//   ) => {
//     return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
//   };

//   const isAnyCategoryTitleEmpty = (categories: any[]) => {
//     return categories.some((category: any) => category.title === "");
//   };

//   const newCategoriesHandler = () => {
//     if (categories[categories.length - 1].title === "") {
//       toast.error("Category title cannot be empty");
//       return;
//     }
//     setCategories((prevCategories: any) => [
//       ...prevCategories,
//       { title: "", _id: Date.now() },
//     ]);
//   };

//   const EditCategoriesHandler = async () => {
//     if (
//       !areCategoriesUnchanged(categories, data?.layout?.categories) &&
//       !isAnyCategoryTitleEmpty(categories)
//     ) {
//       await editlayout({
//         type: "Categories",
//         categories,
//       });
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[80px] text-center px-4 lg:px-0">
//           <h1 className={`${styles.title} text-2xl font-bold mb-8`}>
//             Manage Categories
//           </h1>

//           <div className="space-y-4 max-w-lg mx-auto">
//             {categories &&
//               categories.map((item: any) => (
//                 <div
//                   className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md"
//                   key={item._id}
//                 >
//                   <input
//                     className={`${styles.input} border-b-2 border-gray-300 dark:border-gray-600 flex-1 text-lg p-2 bg-transparent focus:outline-none`}
//                     value={item.title}
//                     onChange={(e) =>
//                       handleCategoriesAdd(item._id, e.target.value)
//                     }
//                     placeholder="Enter Category Name"
//                   />
//                   <AiOutlineDelete
//                     className="ml-3 text-red-500 hover:text-red-700 cursor-pointer text-xl"
//                     onClick={() => {
//                       setCategories((prevCategories: any) =>
//                         prevCategories.filter(
//                           (category: any) => category._id !== item._id
//                         )
//                       );
//                     }}
//                   />
//                 </div>
//               ))}
//           </div>

//           <div className="flex justify-center mt-6 space-x-4">
//             <IoMdAddCircleOutline
//               className="text-green-500 hover:text-green-700 text-3xl cursor-pointer"
//               onClick={newCategoriesHandler}
//             />
//             <button
//               onClick={EditCategoriesHandler}
//               disabled={
//                 areCategoriesUnchanged(categories, data?.layout?.categories) ||
//                 isAnyCategoryTitleEmpty(categories)
//               }
//               className={`px-6 py-2 rounded-lg ${
//                 !areCategoriesUnchanged(categories, data?.layout?.categories) &&
//                 !isAnyCategoryTitleEmpty(categories)
//                   ? "bg-blue-500 hover:bg-blue-600 text-white"
//                   : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditCategories;

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editlayout, { isSuccess: layoutSuccess, error, reset }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
    if (layoutSuccess) {
      toast.success("Categories Updated Successfully");
      reset(); // Reset mutation state to avoid duplicate messages
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("Failed to update categories: " + errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, reset]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category: any) => category.title === "");
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
      return;
    }
    setCategories((prevCategories: any) => [
      ...prevCategories,
      { title: "", _id: Date.now() },
    ]);
  };

  const EditCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(categories, data?.layout?.categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editlayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[80px] text-center px-4 lg:px-0">
          <h1 className={`${styles.title} text-2xl font-bold mb-8`}>
            Manage Categories
          </h1>

          <div className="space-y-4 max-w-lg mx-auto">
            {categories &&
              categories.map((item: any) => (
                <div
                  className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md"
                  key={item._id}
                >
                  <input
                    className={`${styles.input} border-b-2 border-gray-300 dark:border-gray-600 flex-1 text-lg p-2 bg-transparent focus:outline-none`}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(item._id, e.target.value)
                    }
                    placeholder="Enter Category Name"
                  />
                  <AiOutlineDelete
                    className="ml-3 text-red-500 hover:text-red-700 cursor-pointer text-xl"
                    onClick={() => {
                      setCategories((prevCategories: any) =>
                        prevCategories.filter(
                          (category: any) => category._id !== item._id
                        )
                      );
                    }}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <IoMdAddCircleOutline
              className="text-green-500 hover:text-green-700 text-3xl cursor-pointer"
              onClick={newCategoriesHandler}
            />
            <button
              onClick={EditCategoriesHandler}
              disabled={
                areCategoriesUnchanged(categories, data?.layout?.categories) ||
                isAnyCategoryTitleEmpty(categories)
              }
              className={`px-6 py-2 rounded-lg ${
                !areCategoriesUnchanged(categories, data?.layout?.categories) &&
                !isAnyCategoryTitleEmpty(categories)
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
