// import Image from "next/image";
// import React, { useState } from "react";
// import defaultAvatar from "../../../public/assets/avatar.png";
// import { AiOutlineCamera } from "react-icons/ai";

// type Props = {
//   avatar: string | null;
//   user: any;
// };

// const ProfileInfo: FC<Props> = ({ user, avatar }) => {
//   const [name, setName] = useState(user && user.name);

//   const imageHandler = async (e: any) => {
//     console.log("Image changed");
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     console.log("Profile updated");
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-md dark:bg-gray-800 rounded-lg p-6">
//       {/* Profile Picture */}
//       <div className="flex justify-center">
//         <div className="relative group">
//           <Image
//             src={user?.avatar || avatar ? user.avatar.url : defaultAvatar}
//             alt="Profile"
//             width={120}
//             height={120}
//             className="w-28 h-28 object-cover rounded-full border-4 border-teal-600"
//           />
//           <input
//             type="file"
//             id="avatar"
//             className="hidden"
//             onChange={imageHandler}
//             accept="image/png, image/jpg, image/webp"
//           />
//           <label htmlFor="avatar" className="cursor-pointer">
//             <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center group-hover:bg-teal-800 transition duration-200">
//               <AiOutlineCamera size={20} />
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="mt-8">
//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-teal-500 focus:border-teal-500"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Email Address
//             </label>
//             <input
//               type="text"
//               readOnly
//               className="block w-full p-2 border border-gray-300 bg-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-teal-500 focus:border-teal-500"
//               value={user?.email}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <input
//               type="submit"
//               className="w-full sm:w-48 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg cursor-pointer hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
//               value="Update Profile"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(file);
  };
  useEffect(() => {
    if (isSuccess || success) setLoadUser(true);
    if (error || updateError) console.log(error);
    if (success || isSuccess) {
      toast.success("Profile Updated successfully");
    }
  }, [isSuccess, error, updateError, success]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name) {
      await editProfile({ name });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800 transition duration-300">
      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="relative group">
          <Image
            src={user?.avatar ? user.avatar.url : defaultAvatar}
            alt="Profile"
            width={120}
            height={120}
            className="w-28 h-28 object-cover rounded-full border-4 border-teal-600 dark:border-teal-400"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/webp"
          />
          <label htmlFor="avatar" className="cursor-pointer">
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center group-hover:bg-teal-700 dark:bg-teal-400 dark:group-hover:bg-teal-500 transition duration-200">
              <AiOutlineCamera size={20} />
            </div>
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="text-black block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-teal-500 focus:border-teal-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="text"
              readOnly
              className="text-black block w-full p-2 border border-gray-300 bg-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 focus:ring-teal-500 focus:border-teal-500"
              value={user?.email}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <input
              type="submit"
              className="w-full sm:w-48 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg cursor-pointer hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-400 transition duration-200"
              value="Update Profile"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
