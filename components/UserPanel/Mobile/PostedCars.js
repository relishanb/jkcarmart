import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCircle, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetUserAdsQuery } from "@/store/apiServices/apiServices";
import Drawer from "react-modern-drawer";
import { DrawerHeader } from "./DrawerHeader";
import "react-modern-drawer/dist/index.css";
import EditPostedCar from "./EditPostedCar";

const PostedCars = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);

  const userId = parseInt(useSelector((state) => state.authentication.userId));
  const { data: fetchedCars = [] } = useGetUserAdsQuery(userId);

  useEffect(() => {
    setCars(fetchedCars);
  }, [fetchedCars]);

  const tabs = ["All", "Pending", "Approved", "Rejected", "Sold"];

  const filterCars = (status) => {
    if (status === "All") return cars;
    return cars.filter((car) => car.postedCarStatus === status);
  };

  const displayedCars = filterCars(activeTab);

  const toggleDrawer = (car = null) => {
    setSelectedCar(car);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleUpdateCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.car_ID === updatedCar.car_ID ? updatedCar : car))
    );
    setIsDrawerOpen(false);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="py-8 overflow-auto max-h-screen mb-1 bg-gray-50 px-3">
      {/* Tabs */}
      <div className="flex mb-12 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 rounded-lg ${
              activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Car List */}
      <div>
        {displayedCars.length > 0 ? (
          displayedCars.map((car) => (
            <div
              key={car.car_ID}
              className={`bg-white p-4 mb-4 rounded-lg shadow-sm border cursor-pointer ${
                car.postedCarStatus === "Sold" ? "relative" : ""
              }`}
              onClick={() => toggleDrawer(car)}
            >
              {car.postedCarStatus === "Sold" && (
                <div className="absolute top-0 left-0 right-0 bg-black text-white py-2 text-center font-semibold">
                  Sold
                </div>
              )}

              <div className="flex ">
                <div className="flex flex-col">
                  <div className="flex border-b ">
                    <div className="w-28 h-28">
                {car.carImagesList?.length > 0 ? (
                  <img
                    src={car.carImagesList[0]}
                    alt="Car"
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
                )}
                </div>

                <div className="flex flex-col  mt-1">
                  {/* First Line: Year, Brand, Variant */}
                  <div className="flex justify-start gap-2 items-center flex-wrap text-xs font-semibold text-gray-500 mb-2 ">
                    <span>{car.modelYear}</span>
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[6px]" /> {car.brandName}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[6px]" /> {car.variantName}
                    </span>
                  </div>
                  {/* Second Line: Price */}
                  <p className="text-lg text-black font-semibold mb-1 border-b pb-2">
                    {formatCurrency(car.expectedPrice)}
                  </p>

                  {/* Third Line: Distance Traveled */}
                  <div className="text-sm text-gray-500 font-medium">
                    <span>{formatNumber(car.totalDriven)} km</span>
                  </div>
                </div>
                </div>

                <div className="flex justify-between gap-14 mt-1 ">
                  {/* Post Date */}
                  <div className="text-md font-medium text-gray-500 mt-3">
                    {formatDate(car.createDate)}
                  </div>

                  {/* Show Total Views only if Approved */}
                  {car.postedCarStatus === "Approved" ? (
                    <div className="flex mt-2 gap-1 text-sm font-medium text-gray-500">
                      <FaEye size={20}/>
                      <span> {formatNumber(car.totalViews)} views</span>
                    </div>
                  ):(
                    <div className="flex mt-2 gap-1 text-sm font-medium text-gray-500">
                      <FaEye color="white" size={20}/>
                      <span className="text-white"> {formatNumber(car.totalViews)} views</span>
                    </div>
                  )}

                  {/* Status */}
                  <div
                    className={`text-sm text-gray-500 flex font-medium mt-1 p-1 ${
                      car.postedCarStatus === "Pending"
                        ? "bg-yellow-200 border-yellow-800 rounded-lg "
                        : car.postedCarStatus === "Approved"
                        ? "bg-green-100 text-green-700 rounded-lg"
                        : car.postedCarStatus === "Rejected"
                        ? "bg-red-100 text-red-700 rounded-lg"
                        : ""
                    }`}
                  >
                    {car.postedCarStatus || "Not Specified"}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black">No cars found for this tab.</p>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{ width: "100%" }}
      >
        <DrawerHeader setIsOpen={setIsDrawerOpen} />
        <div className="px-4">
          {selectedCar && (
            <EditPostedCar car={selectedCar} onUpdate={handleUpdateCar} />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default PostedCars;
