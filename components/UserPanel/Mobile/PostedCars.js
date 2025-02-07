import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserAdsQuery, useGetUserByUserIdQuery, useUpdateAdIsSoldMutation } from "@/store/apiServices/apiServices";
import Drawer from "react-modern-drawer";
import { DrawerHeader } from "./DrawerHeader";
import "react-modern-drawer/dist/index.css";
import EditPostedAd from "../EditPostedAd";
import CarList from "./CarList";

const PostedCars = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState();
  const [cars, setCars] = useState([]);
  const [updateAdIsSold] = useUpdateAdIsSoldMutation();

  let userId = useSelector((state) => state.authentication.userId);
  userId = parseInt(userId);

  const { data: fetchedCars = [], isLoading, isSuccess } = useGetUserAdsQuery(userId);
  console.log("is loading", isLoading)
  console.log("car fetchedCars", fetchedCars)
  useEffect(() => {
    if (isSuccess) {
      setCars(fetchedCars);
    }
  }, [fetchedCars, isLoading]);

  const tabs = ["All", "Pending", "Approved", "Rejected", "Sold"];

  const filterCars = (status) => {
    if (status === "All") return cars;
    return cars.filter((car) => car.postedCarStatus === status);
  };

  const displayedCars = filterCars(activeTab);

  const toggleDrawer = (selectedCar) => {
    setSelectedCar(selectedCar);
    console.log("selected car", selectedCar)
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleUpdateCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.car_ID === updatedCar.car_ID ? updatedCar : car))
    );
    setIsDrawerOpen(false);
  };

  const handleSoldStatusChange = (carId, isSold) => {
    console.log("status", isSold)
    updateAdIsSold({ carId, isSold });
    setCars((prevCars) =>
      prevCars.map((car) => (car.car_ID === carId ? { ...car, isSold } : car))
    );
  };

 

  return (
    <div className="pt-8 pb-20 overflow-auto max-h-screen mb-1 bg-gray-50 px-3">
      <div>
      </div>
      {/* Tabs */}
      <div className="flex mb-12 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 rounded-lg ${activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Car List */}
      <CarList cars={displayedCars} toggleDrawer={toggleDrawer} handleSoldStatusChange={handleSoldStatusChange} />

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
            <EditPostedAd 
            id={selectedCar.car_ID} 
            car={selectedCar} 
            setIsDrawerOpen={setIsDrawerOpen} 
            isSold={selectedCar.isSold} />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default PostedCars;
