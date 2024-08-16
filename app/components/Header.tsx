import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react';
import NavItems from "./utils/NavItems"
import { ThemeSwitcher } from "../utils/ThemeSwitcher"
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi"
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login"
import SignUp from "../components/Auth/SignUp"
import Verification from "../components/Auth/Verification"
type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = (props) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
        <div className='w-full relative'>
            <div className="absolute top-[80vh] left-0 animated-wrapper filter blur-3xl z-20">
                <div className="w-24 h-24 rounded-full border-4 border-white fixed glow" style={{ left: '20%', transform: 'translate(-50%, -50%)' }}></div>
            </div>
            <div className={`w-full border-b ${active ? "fixed top-0 left-0 h-16 z-50" : "h-20"} 
                ${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border-[#ffffff1c] shadow-xl" : "dark:border-[#ffffff1c] dark:shadow"} 
                transition duration-500`}
            >
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-16 sm:h-20 flex items-center justify-between p-3">
                        <div>
                            <Link href={"/"}
                                className={`text-[20px] sm:text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                            >
                                ELearning
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={props.activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            <div className='sm:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer dark:text-white text-black"
                                onClick={() => props.setOpen(true)}
                            />
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                {
                    openSidebar && (
                        <div
                            className='fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#000000244]'
                            onClick={handleClose}
                            id="screen"
                        >
                            <div className='w-[70%] fixed z-[999999999] h-screen bg-[#0000008c] dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <NavItems activeItem={props.activeItem} isMobile={true} />
                                <HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer dark:text-white ml-5 my-2 text-black"
                                    onClick={() => props.setOpen(true)}
                                />
                                <br />
                                <br />
                                <p className='text-[16px] px-2 pl-5 text-blacj dark:text-white'>
                                    Copyright @ 2023 ELearning
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                props.route === "Login" && (
                    <>
                        {
                            props.open && (
                                <CustomModal 
                                    open={props.open}
                                    setOpen={props.setOpen}
                                    setRoute={props.setRoute}
                                    activeItem={props.activeItem}
                                    component={Login}
                                />
                            )
                        }
                    </>
                )
            }


            {
                props.route === "Sign-up" && (
                    <>
                        {
                            props.open && (
                                <CustomModal 
                                    open={props.open}
                                    setOpen={props.setOpen}
                                    setRoute={props.setRoute}
                                    activeItem={props.activeItem}
                                    component={SignUp}
                                />
                            )
                        }
                    </>
                )
            }
            {
                props.route === "Verification" && (
                    <>
                        {
                            props.open && (
                                <CustomModal 
                                    open={props.open}
                                    setOpen={props.setOpen}
                                    setRoute={props.setRoute}
                                    activeItem={props.activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header;
