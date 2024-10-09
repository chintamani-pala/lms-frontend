import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-[#d2deea]" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar ? user.avatar.url : avatarDefault}
          width={40}
          height={40}
          alt=""
          className="w-[20px] h-[20px] 800px:w-[40px] 800px:h-[40px] rounded-full cursor-pointer"
        />
        <h5 className="pl-2 font-Poppins 800px:block hidden dark:text-white text-black ">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-[#d2deea]" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 font-Poppins 800px:block hidden dark:text-white text-black ">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-[#d2deea]" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 font-Poppins 800px:block hidden dark:text-white text-black ">
          Enrolled Courses
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          href="/admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4 ? "dark:bg-slate-800 bg-[#d2deea]" : "bg-transparent"
          }`}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="pl-2 font-Poppins 800px:block hidden dark:text-white text-black ">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 font-Poppins 800px:block hidden dark:text-white text-black ">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
