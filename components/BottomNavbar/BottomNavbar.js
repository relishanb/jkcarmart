import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscKey } from "react-icons/vsc";
import { BiUser } from "react-icons/bi";
import { IoCarOutline } from 'react-icons/io5';
import { PiHouse } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from '@/store/authentication';

const BottomNavbar = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  const dispatch = useDispatch();

  const checkAuthentication = () => {
    if (isLoggedIn) {
      router.push("/userpanel"); 
    } else {
      dispatch(authenticationActions.toggleAuthenticationModel(true));
    }
  };

  return (
    <nav className="fixed md:hidden bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around items-center py-3 z-10">
      {/* Home */}
      <Link href="/">
        <div className="flex flex-col items-center text-gray-500">
          <PiHouse size={22} className={router.pathname === "/" ? "text-orange-500" : ""} />
          <span className={router.pathname === "/" ? "text-orange-500 text-sm font-medium" : "text-sm"}>Home</span>
        </div>
      </Link>

      {/* Buy */}
      <Link href="/buy">
        <div className="flex flex-col items-center text-gray-500">
          <IoCarOutline size={22} className={router.pathname === "/buy" ? "text-orange-500" : ""} />
          <span className={router.pathname === "/buy" ? "text-orange-500 text-sm font-medium" : "text-sm"}>Buy</span>
        </div>
      </Link>

      {/* Sell */}
      <Link href="/sell">
        <div className="flex flex-col items-center text-gray-500">
          <VscKey size={22} className={`${router.pathname === "/sell" ? "text-orange-500" : ""} rotate-45`} />
          <span className={router.pathname === "/sell" ? "text-orange-500 text-sm font-medium" : "text-sm"}>Sell</span>
        </div>
      </Link>

      {/* Account */}
      <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={checkAuthentication}>
        <BiUser size={22} className={router.pathname === "/userpanel" ? "text-orange-500" : ""} />
        <span className={router.pathname === "/userpanel" ? "text-orange-500 text-sm font-medium" : "text-sm"}>Account</span>
      </div>
    </nav>
  );
};

export default BottomNavbar;
