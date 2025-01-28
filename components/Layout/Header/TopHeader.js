import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaSearch, FaMapMarkerAlt, FaRegTimesCircle, FaShareAlt } from "react-icons/fa";
import { IoArrowBack, IoLogoApple, IoLogoGooglePlaystore, IoShareSocial } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import { isIOS, isAndroid, isMobile } from "react-device-detect";

import SearchBoxCars from "./SearchBoxCars";
import SearchBoxLocations from "./SearchBoxLocations";
import { HeaderHeartIcon, ProfileIcon } from "../Icons/Icons";
import { MobileMenu } from "./MobileMenu";
import LoginModal from "@/components/UI/LoginModal";
import Login from "@/components/Login/Login";
import Button from "@/components/UI/Button";

function TopHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const authentication = useSelector((state) => state.authentication);
  const totalShortlistedCars = useSelector(
    (state) => state.userInterestedCars.shortlistedCars.length
  );

  const [showBackArrow, setShowBackArrow] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [locationSearchActive, setLocationSearchActive] = useState(false);

  useEffect(() => {
    setShowBackArrow(
      router.pathname === "/car/shortlisted" || /^\/car\/details\/\d+$/.test(router.asPath)
    );
  }, [router.pathname]);

  const toggleAuthenticationModel = (status) => {
    dispatch(authenticationActions.toggleAuthenticationModel(status === "open"));
  };

  const toggleSidebar = (status) => {
    setIsSidebarActive(status === "open");
  };

  const logOut = () => {
    setIsSidebarActive(false);
    dispatch(authenticationActions.loggout());
  };


  const homeScreenSearch = () => {
    if (router.pathname === "/") {
      return (
        <div className="search_bar md:hidden max-w-screen-md flex mt-2 md:mt-0 z-55">
              <SearchBoxCars />
              <i className="absolute top-4 right-4">
                <FaSearch className="text-gray-400" />
              </i>
            </div>
      );
    }
    return null;
  };

  const renderConditionalButton = () => {
    if (/^\/car\/details\/\d+$/.test(router.asPath)) {
      // Show Share Icon on /car/details/:id
      return (
        <div className="md:hidden flex items-center pr-1 justify-center cursor-pointer">
          <IoShareSocial size={25} />
        </div>
      );
    } else if (router.pathname === "/buy" ) {
      // Show Heart Icon on /buy
      return (
        <div
          title="Shortlisted Cars"
          className={`md:hover:bg-[#ffceb6] md:bg-neutral-100 md:rounded-full md:p-2 rounded-full cursor-pointer flex items-center justify-center pr-1 md:transition md:duration-500 ${
            totalShortlistedCars > 0 ? "active" : ""
          }`}
        >
          <Link
            id="Cars_Shortlisted"
            className="user_activity_link cars_shortlisted_link"
            href={totalShortlistedCars > 0 ? "/car/shortlisted" : "/car/shortlisted"}
          >
            {totalShortlistedCars > 0 && (
              <span className="absolute top-0 md:top-1 right-0 md:right-60 bg-orange-500 text-white rounded-xl px-1 text-xs">
                {totalShortlistedCars}
              </span>
            )}
            <i className="icon">
              <HeaderHeartIcon />
            </i>
          </Link>
        </div>
      );
    }

    // Default: Show Get the App Button
    return (
      <Button className="flex md:hidden justify-center gap-1 px-1 items-center w-full text-center bg-orange-500 text-white text-md font-small py-1 rounded-xl">
        {isAndroid && <IoLogoGooglePlaystore size={20} />}
        {isIOS && <IoLogoApple color="white" size={20} />}
        <span className="text-white">Get the App</span>
      </Button>
    );
  };

  return (
    <>
      {/* Main Header */}
      <div className="main_header relative z-10">
        <div className="container">
          <div className="toggle cursor-pointer">
            {showBackArrow ? (
              <IoArrowBack size={34} color="black" className="p-1" onClick={() => router.back()} />
            ) : (
              <FaBars size={34} className="p-1" onClick={() => setIsSidebarActive(true)} />
            )}
          </div>

          <div className="col nav_container flex items-center justify-between pt-2 md:pt-0">
            <div className="logo">
              <Link href="/">
                <img src="/logo.png" width="150" alt="Logo" />
              </Link>
            </div>

            <div className="search_bar hidden md:flex mt-2 md:mt-0 z-55">
              <i className="icon">
                <FaSearch color="black" />
              </i>
              <SearchBoxCars />
            </div>

            {homeScreenSearch()}

            <div className="myaccount flex items-center space-x-4 relative z-10">
              {/* Conditional Button */}
              <div className="mt-1">{renderConditionalButton()}</div>

              <div
          title="Shortlisted Cars"
          className={`md:hover:bg-[#ffceb6] md:bg-neutral-100 md:rounded-full md:p-2 rounded-full cursor-pointer hidden md:flex items-center justify-center pr-1 md:transition md:duration-500 ${
            totalShortlistedCars > 0 ? "active" : ""
          }`}
        >
          <Link
            id="Cars_Shortlisted"
            className="user_activity_link cars_shortlisted_link"
            href={totalShortlistedCars > 0 ? "/car/shortlisted" : "/car/shortlisted"}
          >
            {totalShortlistedCars > 0 && (
              <span className="absolute top-0 md:top-1 right-0 md:right-60 bg-orange-500 text-white rounded-xl px-1 text-xs">
                {totalShortlistedCars}
              </span>
            )}
            <i className="icon">
              <HeaderHeartIcon />
            </i>
          </Link>
        </div>

              {/* Login / Profile */}
              {!authentication.isLoggedIn ? (
                <div
                  className="w-[45px] h-[45px] rounded-full bg-neutral-50 cursor-pointer hover:bg-[#ffceb6] items-center justify-center transition duration-500 hidden md:flex"
                  onClick={() => toggleAuthenticationModel("open")}
                >
                  <Link href="#">
                    <i className="flex justify-center items-center">
                      <ProfileIcon />
                    </i>
                  </Link>
                </div>
              ) : (
                <Link className="my_account favourite" href="/userpanel">
                  <i className="icon z-10">
                    <ProfileIcon />
                  </i>
                </Link>
              )}

              {/* Contact Info */}
              <div className="hidden md:flex flex-col">
                <span className="header_contact_text">Contact us</span>
                <Link href="tel:0191-2484817" className="header_contact_number gtmEvent_phoneLink_click">
                  0191-2484817
                </Link>
              </div>

              {/* Location Search */}
              {locationSearchActive && (
                <>
                  <ul className="menu location location_mobile absolute z-30">
                    <i className="icon">
                      <FaMapMarkerAlt />
                    </i>
                    <SearchBoxLocations />
                  </ul>
                  <span className="close_location_mobile absolute z-30" onClick={() => setLocationSearchActive(false)}>
                    <FaRegTimesCircle />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="search_bar hidden mt-2 z-5">
        <i className="icon">
          <FaSearch color="black" />
        </i>
        <SearchBoxCars />
      </div>

      {/* Mobile Sidebar Menu */}
      <MobileMenu
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
        toggleSidebar={toggleSidebar}
        toggleAuthenticationModel={toggleAuthenticationModel}
        authentication={authentication}
        authenticationActions={authenticationActions}
        dispatch={dispatch}
      />

      {/* Login Modal */}
      {authentication.isAuthenticationModelActive && (
        <LoginModal onClose={() => toggleAuthenticationModel("close")}>
          <Login />
        </LoginModal>
      )}
    </>
  );
}

export default TopHeader;
