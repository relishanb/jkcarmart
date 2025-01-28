import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdArrowUpward } from "react-icons/md";
import Select from "react-select";

const EditProfileMobile = ({
  isOpen,
  toggleDrawer,
  locations,
  userDetails,
  updateProfile,
}) => {
  const [isDealer, setIsDealer] = useState(userDetails?.userType === "Car Dealer");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userDetails?.firstName || "",
      email: userDetails?.emailID || "",
      address: userDetails?.address1 || "",
      district: userDetails?.districtId
        ? { value: userDetails.districtId, label: userDetails.districtName }
        : null,
      mobileNumber: userDetails?.mobileNumber || "",
      userType: isDealer,
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      userId: userDetails.user_ID,
      firstName: data.name,
      emailId: data.email,
      districtId: data.district?.value || null,
      userType: data.userType ? "Car Dealer" : "Car Seller",
      address: data.address,
    };
    updateProfile(updatedData); // Call the API
  };

  const handleDealerToggle = (checked) => setIsDealer(checked);

  return (
    <div className="p-4 overflow-auto max-h-screen">
      <div className="mt-6 p-4 w-full bg-white rounded-xl shadow-lg border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Add Name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Add Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Number (Read-Only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              value={userDetails?.mobileNumber || ""}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* District */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locations}
                  placeholder="Select Location"
                  classNamePrefix="react-select"
                />
              )}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              placeholder="Address"
              {...register("address")}
              className="w-full px-4 py-2 border rounded focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              rows="3"
            />
          </div>

          {/* Dealer Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dealer"
              {...register("userType")}
              checked={isDealer}
              onChange={(e) => handleDealerToggle(e.target.checked)}
              className="h-4 w-4 text-orange-500 border-gray-300"
            />
            <label htmlFor="dealer" className="text-sm font-medium text-gray-700">
              Are you a Dealer?
            </label>
          </div>

          {/* Upload Image Section (Visible only for Dealers) */}
          {isDealer && (
            <div className="border px-4 py-4 text-center bg-orange-50">
              <div className="py-4 bg-orange-100 rounded-xl">
                <button
                  type="button"
                  className="my-2 px-2 py-2 bg-white text-white rounded-full"
                >
                  <MdArrowUpward color="orange" size={24} />
                </button>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-800 font-medium">
                    Upload Business Image
                  </span>
                  <span className="text-gray-500 font-normal">
                    (Max 1 Image Allowed)
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Update Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!watch("name") && !watch("email") && !watch("address")}
          className={`mt-8 w-full py-3 rounded ${
            watch("name") || watch("email") || watch("address")
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-orange-500 text-white text-[16px] mt-2 cursor-not-allowed opacity-50"
          }`}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProfileMobile;
