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
    return cars.filter((car) => car.postedCarStatus === status || (status === "Sold" && car.isSold));
  };

  const displayedCars = filterCars(activeTab);
  console.log(displayedCars)

  const toggleDrawer = (selectedCar) => {
    if (selectedCar.postedCarStatus === "Pending") {
      setSelectedCar(selectedCar);
      console.log("selected car", selectedCar);
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      console.log("Only pending ads can be edited.");
    }
  };

  const handleUpdateCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.car_ID === updatedCar.car_ID ? updatedCar : car))
    );
    setIsDrawerOpen(false);
  };

  const handleSoldStatusChange = (carId, isSold) => {
    console.log("status", isSold);
    updateAdIsSold({ carId, isSold }).then(() => {
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.car_ID === carId ? { ...car, isSold, postedCarStatus: isSold ? "Sold" : car.postedCarStatus } : car
        )
      );
      // Re-filter cars to update the displayed cars
      setCars((prevCars) => filterCars(activeTab));
      // If the car is marked as sold, switch to the "Sold" tab
      if (isSold) {
        setActiveTab("Sold");
      }
    }).catch((error) => {
      console.error("Failed to update sold status", error);
    });
  };

  return (
    <div className="pb-20 overflow-auto max-h-screen mb-1 bg-gray-50 ">
      {/* Tabs */}
      <div className="fixed bg-white w-full flex py-4 gap-2 px-3 z-50">
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