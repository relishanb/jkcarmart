import React from 'react'

export const PostedCarsCard = () => {
  return (
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

                  <StatusButton status={car.postedCarStatus}/>
                  </div>
                  </div>
                </div>
              </div>
          ))
        ) : (
          <p className="text-black">No cars found for this tab.</p>
        )}
      </div>
  )
}
