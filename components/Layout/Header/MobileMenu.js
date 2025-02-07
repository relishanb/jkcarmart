import React, { useState } from 'react'
import { FaX } from 'react-icons/fa6'

import { isIOS, isAndroid } from 'react-device-detect';
import { PiPhoneCall } from "react-icons/pi";
import Link from 'next/link';
import Button from '@/components/UI/Button';
import { IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserByUserIdQuery } from '@/store/apiServices/apiServices';



export const MobileMenu = ({ dispatch, isSidebarActive, setIsSidebarActive, toggleSidebar, authentication, authenticationActions, toggleAuthenticationModel }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const logOut = () => {
    dispatch(authenticationActions.loggout());
  }

  const menuItems = [
    { label: "Buy Car", route: "/buy" },
    { label: "Sell Car", route: "/sell" },
    { label: "Dealers", route: "/dealers" },
    {
      label: "Finance",
      route: "",
      isDropdown: true,
      dropdownItems: [
        { label: "EMI Calculator", route: "/finance/emi-calculator" },
        { label: "Car Valuation", route: "" },
      ],
    },
  ];

  const userId = parseInt(useSelector((state) => state.authentication.userId));
  const { data: userdetails } = useGetUserByUserIdQuery(userId);
  console.log("user", userdetails)

  function handleRedirect(route) {
    setIsSidebarActive(false);
    if (route) {
      window.location.href = route;
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ${isSidebarActive ? "visible opacity-100" : "invisible opacity-0"
        }`}
      onClick={toggleSidebar}
    >
      <div
        className={`bg-white w-72 h-full absolute top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarActive ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-6 right-2 text-2xl " onClick={toggleSidebar}>
          <FaX size={35} className="px-2 pb-4 text-black" />
        </button>

        <div className="p-4 py-6">
          {authentication.isLoggedIn ? (
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold">Welcome, {userdetails && userdetails.firstName || "User" }!</h2>
              <p className="text-sm font-medium text-gray-800">{userdetails ? userdetails.mobileNo : ""}</p>
              <Link href={"/userpanel"} className="text-orange-500 text-sm ">Edit profile &gt;</Link>
            </div>
          ) : (
            <div className="border-b-2 pb-4">
              <h2 className="text-lg font-semibold">Login/Signup</h2>
              <button
                className="text-orange-500 font-medium text-sm mt-2"
                onClick={() => dispatch(authenticationActions.toggleAuthenticationModel(true))}
              >
                Add login details &gt;
              </button>
            </div>
          )}

          <ul className="space-y-3 mt-4 text-lg text-gray-500">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="border-b border-gray-100"
              >
                {!item.isDropdown ? (
                  <div
                    className="flex gap-44 cursor-pointer"
                    onClick={() => handleRedirect(item.route)}
                  >
                    <span className="w-full">
                      <span className="block py-2 text-black">{item.label}</span>
                    </span>
                    <span className="mt-2">&gt;</span>
                  </div>
                ) : (
                  <>
                    <div
                      className="flex gap-40 transition duration-200 cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <span className="w-full">
                        <span className="block py-2 text-black">{item.label}</span>
                      </span>
                      <span className="mr-2 rotate-90 cursor-pointer">&gt;</span>
                    </div>
                    {isDropdownOpen && (
                      <ul className="flex flex-col gap-2 mt-2 space-y-2 text-md font-small border-b border-gray-100 pb-2">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <li
                            key={dropdownIndex}
                            className="pl-4 text-gray-500 cursor-pointer"
                            onClick={() => handleRedirect(dropdownItem.route)}
                          >
                            {dropdownItem.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className='fixed bottom-20 w-[16rem]'>
            <div >
              <p className="text-gray-600 text-sm flex items-center border-t pt-4">
                <div>
                  <PiPhoneCall size={25} className="mr-2 text-orange-500 " />
                </div>
                <div>
                  <span className="text-black font-semibold">Need help?</span><br />
                  <Link href="tel:0191-2459080" className="text-sm text-orange-500">Contact us on 0191-2459080</Link>
                </div>
              </p>
            </div>

            <div className="mt-4">
            <Link
                href={isAndroid
                    ? "https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"
                    : isIOS
                        ? "https://apps.apple.com/in/app/jkcarmart/id1629198882"
                        : "https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button className="flex justify-center gap-2 items-center w-full text-center bg-orange-500 text-white text-lg font-medium rounded-lg p-2">
                    {isAndroid && <IoLogoGooglePlaystore size={20} />}
                    {isIOS && <IoLogoApple color="white" size={20} />}
                    <span className="text-white">Get the App</span>
                </Button>
            </Link>
            </div>
          </div>

          {/* Logout Button (If Logged In) */}
          {/* {authentication.isLoggedIn && (
              <button className="text-red-500 mt-4 flex items-center" onClick={logOut}>
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            )} */}
        </div>
      </div>
    </div>
  )
}
