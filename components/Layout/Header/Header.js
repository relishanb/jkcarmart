import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import TopHeader from "./TopHeader";

function Header(props) {
  const [active, setActive] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [financeDropdown, setFinanceDropdown] = useState(false); 
  const dropdownRef = useRef(null); 

  const ToggleSidebar = () => {
    setIsopen(!isOpen);
    setActive(!active);
  };

  const toggleFinanceDropdown = () => {
    setFinanceDropdown(!financeDropdown);
  };

  // Close the Finance dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFinanceDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header className={`${props.className} fixed top-0 left-0 w-full z-10`}>
  <TopHeader ToggleSidebar={ToggleSidebar} />
  <div className="secondary_header bg-gray-900">
    <div className="container">
      <nav id="navbar" className="primary-menu">
        <ul className={`menu mob-menu ${isOpen ? "active" : ""}`}>
          <li className="item item_first">
            <Link
              href="/buy"
              className="text-base font-semibold text-white px-4 py-2"
            >
              Buy Car
            </Link>
          </li>
          <li className="item">
            <Link
              href="/sell"
              className="text-base font-semibold text-white px-4 py-2"
            >
              Sell Car
            </Link>
          </li>
          <li className="item">
            <Link
              href="/dealers"
              className="text-base font-semibold text-white px-4 py-2"
            >
              Dealers
            </Link>
          </li>
          <li
  className="item relative group"
  ref={dropdownRef} 
>
  <div
    className="flex items-center cursor-pointer text-base text-white py-5 font-medium tracking-wide"
    onClick={toggleFinanceDropdown}
  >
    <span>FINANCE</span>
    <IoIosArrowDown
      className={`ml-2 transition-transform duration-200 ${
        financeDropdown ? "rotate-180" : ""
      }`}
    />
     {financeDropdown && (
    <ul className="absolute flex flex-col top-full mt-1 z-50 bg-white border border-gray-200 shadow-lg rounded-lg">
      <li className="flex hover:bg-orange-500 rounded-t-lg">
        <Link
          href="/finance/emi-calculator"
          className=" text-base font-medium text-black hover:text-white"
        >
          EMI Calculator
        </Link>
      </li>
      <li className="flex hover:bg-orange-500 rounded-b-lg">
        <Link
          href="/"
          className="text-base font-medium text-black hover:text-white"
        >
          Car Valuation
        </Link>
      </li>
    </ul>
  )}
  </div>

</li>
         </ul>
        <div
          className={`menuoverlay ${isOpen ? "active" : ""}`}
        
        ></div>
      </nav>
    </div>
  </div>
</header>

    </>
  );
}

export default Header;
