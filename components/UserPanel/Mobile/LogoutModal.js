import { authenticationActions } from '@/store/authentication';
import { useRouter } from 'next/router';
import React from 'react'
import { FaX } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux';

export const LogoutModal = ({toggleLogoutModal}) => {
    const route=useRouter();
    const dispatch=useDispatch();

    const logout=()=>{
        dispatch(authenticationActions.loggout());
        route.push("/")
    }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 pt-4 pb-3 relative">
            <div className="flex items-center justify-between mb-4 border-b px-3 pb-3">
              <h2 className="text-lg font-semibold">Log Out</h2>
              <button
                onClick={toggleLogoutModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaX color='black' size={16} />
              </button>
            </div>

            <p className="text-gray-800 font-medium mb-6 py-3 px-4">
              Are you sure you want to logout from jkcarmart?
            </p>

            <div className="flex justify-center space-x-4 border-t pt-2">
              <button
                onClick={toggleLogoutModal}
                className="px-10 py-3 border border-orange-500 text-orange-500 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="flex gap-2 px-10 py-3 bg-red-500 text-white rounded-lg font-medium"
              >
                <MdLogout size={19}/>
                Logout
              </button>
            </div>
          </div>
        </div>
  )
}
