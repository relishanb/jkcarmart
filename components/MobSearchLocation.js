import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, filterPositions, filterNames } from "@/store/filters";
import { useRouter } from "next/router";
import { useGetLocationsQuery } from "@/store/apiServices/apiServices";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FiMapPin, FiChevronDown, FiX, FiSearch } from "react-icons/fi";

function SearchBoxLocations() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const route = useRouter();

  const location = useSelector(
    (state) => state.filter.filterData[filterPositions.Location].Location[0]
  );

  const { data } = useGetLocationsQuery();
  const locations =
    data?.map((item) => ({
      id: item.districtId,
      value: item.districtName,
    })) || [];

  // Filter locations based on search input
  const filteredLocations = locations.filter((loc) =>
    loc.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showCars(values) {
    dispatch(filterActions.updateSearchLocation(values.value));
    dispatch(filterActions.applyFilter());
    route.push("/buy");
    setIsDrawerOpen(false); 
  }

  function clearSearch() {
    dispatch(filterActions.clearFilter(filterNames.Location)); 
    setIsDrawerOpen(false); 
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <div
        className={`flex items-center border border-gray-300 bg-white rounded-full py-2 px-2 gap-8 cursor-pointer ${
          location ? "border-orange-500" : "border-gray-300"
        }`}
        onClick={() => setIsDrawerOpen(true)}
      >
        <div className="flex justify-between items-center">
        <FiMapPin className={`${location ? "text-orange-500" : "text-gray-500"} mr-1`} />
        <span className={`flex-grow ${location ? "text-orange-500" : "text-gray-500"} text-sm` }>
          {location || "Location"}
        </span>
        </div>
        <div>
        <FiChevronDown size={18} className={`${location ? "text-orange-500" : "text-gray-500"}`} />
        </div>
      </div>

      {/* Drawer for Searching Locations */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="bottom"
        size="75%"
        className="px-5 pt-3 bg-white rounded-t-2xl"
      >
        <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
          Select Location
        </h2>

        {/* Search Box inside Drawer */}
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 pl-2 pr-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Location List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((item) => (
              <div
                key={item.id}
                className="px-3 py-3 border-b cursor-pointer hover:bg-orange-100"
                onClick={() => showCars(item)}
              >
                {item.value}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No locations found.</p>
          )}
        </div>
          </div>
        {/* Clear Button (Always Visible, But Disabled If No Location Selected) */}
        <button
          className={`fixed mt-4 px-4 py-2 bottom-2 rounded-md flex items-center justify-center mx-auto w-[90%] transition ${
            location
              ? "bg-orange-500 text-white cursor-pointer "
              : "bg-orange-500 text-white cursor-not-allowed opacity-50"
          }`}
          onClick={clearSearch}
          disabled={!location}
        >
          <span className="text-lg" > Clear</span>
        </button>
      </Drawer>
    </div>
  );
}

export default SearchBoxLocations;
