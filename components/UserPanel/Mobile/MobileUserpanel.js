import React, { useState } from 'react'
import { MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { LogoutModal } from './LogoutModal';
import { useRouter } from 'next/router';
import CarsShortlistedInner from '@/components/Cars/CarsShortlisted/CarsShortlistedInner';
import Drawer from 'react-modern-drawer';
import { DrawerHeader } from './DrawerHeader';
import Button from '@/components/UI/Button';
import PostedCars from './PostedCars';
import EditProfile from './EditProfile';
import { useGetUserByUserIdQuery } from '@/store/apiServices/apiServices';

export const MobileUserpanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null);

  const toggleDrawer = (content = null) => {
    setDrawerContent(content);
    setIsOpen(!isOpen);
  };


  const userId = parseInt(useSelector((state) => state.authentication.userId));
  const { data: userdetails } = useGetUserByUserIdQuery(userId);
  console.log("user", userdetails)

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const route = useRouter();

  const authentication = useSelector((state) => state.authentication);
  console.log(authentication)

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  }

  const renderDrawerContent = () => {
    switch (drawerContent) {
      case 'editProfile':
        return (
          <div className='bg-white px-3'>
            <EditProfile setIsOpen={setIsOpen} />
          </div>
        );

      case 'postedCars':
        return (
          <div className='bg-white'>
            <PostedCars />
          </div>
        );
      case 'wishlistCars':
        return (
          <div>
            <CarsShortlistedInner />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    userdetails && (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-start shadow-lg py-28 px-4">
        <div className="flex flex-col items-start px-3 gap-1 bg-white border rounded-lg mb-8">
          <h3 className="mt-4 text-lg font-semibold">Welcome, {userdetails.firstName || "User"}!</h3>
          <p className="text-gray-500 text-sm font-medium">{userdetails ? userdetails.mobileNo : ""}</p>
        </div>
        <div className="space-y-4 text-md">
          <Button
            onClick={() => toggleDrawer('editProfile')}
            className="flex items-center justify-between w-full text-left px-3 py-3 font-medium border rounded-lg bg-white text-black">
            <span>Edit Profile</span>
            <span className='text-gray-400'>&gt;</span>
          </Button>

          <Button
            onClick={() => toggleDrawer('postedCars')}
            className="flex items-center justify-between w-full text-left px-3 py-3 font-medium border rounded-lg bg-white text-black">
            <span>Posted cars</span>
            <span className='text-gray-400'>&gt;</span>
          </Button>

          <Button
            className="flex items-center justify-between w-full text-left px-3 py-3 font-medium border rounded-lg bg-white text-black"
            onClick={() => toggleDrawer('wishlistCars')}>
            <span>Wishlist cars</span>
            <span className='text-gray-400'>&gt;</span>
          </Button>

          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            style={{ width: '100%' }}
          >
            <DrawerHeader setIsOpen={setIsOpen} />
            <div className="">
              {renderDrawerContent()}
            </div>
            {/* <BottomNavbar/> */}
          </Drawer>

          <Button
            className="flex gap-2 w-full px-3 py-3 font-medium border rounded-lg bg-white text-red-500"
            onClick={toggleLogoutModal}>
            <MdLogout size={19} />
            <span>Log Out</span>
          </Button>
        </div>
        {isLogoutModalOpen && (
          <LogoutModal toggleLogoutModal={toggleLogoutModal} />
        )}
      </div>
    ))
}
