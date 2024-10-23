import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { redirect } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/user/userApi";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  // const logOutHandler = async () => {
  //   setLogout(true);
  //   await signOut();
  // };
  const [logoutUser] = useLogoutMutation({});

  const logOutHandler = async () => {
    setLogout(true);
    await logoutUser({});
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900  bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000054] rounded-[5px] dark:shadow-sm shadow-md mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-ful bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-ful bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default Profile;
