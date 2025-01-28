import React, { useState } from "react";
import Button from "@/components/UI/UIcomponents/Button";
import { usePostDataMutation } from "@/store/apiServices/apiServices";
import { FiLoader } from "react-icons/fi";

export const EligibilityForm = ({ closeModal, carId }) => {
  const [formData, setFormData] = useState({
    carid: carId,
    fullname: "",
    birthyear: "",
    mobileno: "",
    emailid: "",
    employmenttype: "",
    monthlyincome: "",
    employmentduration: "",
    durationunit: "Months",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [postData, { isLoading }] = usePostDataMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "monthlyincome") {
      const formattedValue = value.replace(/,/g, "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    setError("");
    setFieldErrors({});
  };

  const validateForm = () => {
    const {
      fullname,
      birthyear,
      mobileno,
      emailid,
      employmenttype,
      monthlyincome,
      employmentduration,
    } = formData;

    if (
      !fullname ||
      !birthyear ||
      !mobileno ||
      !emailid ||
      !employmenttype ||
      !monthlyincome ||
      !employmentduration
    ) {
      setError("Please fill all the fields.");
      return false;
    }

    const newFieldErrors = {};

    if (!/^[a-zA-Z ]+$/.test(fullname)) newFieldErrors.fullname = "Full name must only contain letters and spaces.";
    if (new Date().getFullYear() - new Date(birthyear).getFullYear() < 15) newFieldErrors.birthyear = "You must be at least 15 years old.";
    if (!/^\d{10}$/.test(mobileno)) newFieldErrors.mobileno = "Mobile number must be 10 digits.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailid)) newFieldErrors.emailid = "Enter a valid email address.";
    if (!["Govt. service", "Private", "Unemployed", "Retired"].includes(employmenttype)) newFieldErrors.employmenttype = "Select a valid employment type.";
    if (!/^\d+(\.\d+)?$/.test(monthlyincome.replace(/,/g, ""))) newFieldErrors.monthlyincome = "Monthly income must be a valid number.";
    if (!/^[0-9]+$/.test(employmentduration)) newFieldErrors.employmentduration = "Employment duration must be a number.";

    setFieldErrors(newFieldErrors);

    if (Object.keys(newFieldErrors).length > 0) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await postData({ ...formData, monthlyincome: formData.monthlyincome.replace(/,/g, "") }).unwrap();
      if (response.statusCode === "200") {
        setTimeout(closeModal, 1000);
      } else {
        setError(response.error || "An error occurred.");
      }
    } catch (error) {
      setError(error?.data?.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <label className="block mb-2">
            Full Name
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-2 border rounded mt-1"
            />
            {fieldErrors.fullname && <p className="text-red-500 text-sm">{fieldErrors.fullname}</p>}
          </label>
          <label className="block mb-2">
            Year of Birth
            <input
              type="date"
              name="birthyear"
              value={formData.birthyear}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
            {fieldErrors.birthyear && <p className="text-red-500 text-sm">{fieldErrors.birthyear}</p>}
          </label>
          <label className="block mb-2">
            Mobile No.
            <input
              type="tel"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-2 border rounded mt-1"
            />
            {fieldErrors.mobileno && <p className="text-red-500 text-sm">{fieldErrors.mobileno}</p>}
          </label>
          <label className="block mb-2">
            Email Address
            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-2 border rounded mt-1"
            />
            {fieldErrors.emailid && <p className="text-red-500 text-sm">{fieldErrors.emailid}</p>}
          </label>
          <label className="block mb-2">
            Employment Type
            <select
              name="employmenttype"
              value={formData.employmenttype}
              onChange={handleChange}
              className="w-full p-2 h-10 mt-1 border rounded focus:outline-none"
            >
              <option value="">Select Employment Type</option>
              <option value="Govt. service">Govt. service</option>
              <option value="Private">Private</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
            </select>
            {fieldErrors.employmenttype && <p className="text-red-500 text-sm">{fieldErrors.employmenttype}</p>}
          </label>
          <label className="block mb-2">
            Monthly Income
            <input
              type="text"
              name="monthlyincome"
              value={formData.monthlyincome}
              onChange={handleChange}
              placeholder="Enter your monthly income"
              className="w-full p-2 border rounded mt-1"
            />
            {fieldErrors.monthlyincome && <p className="text-red-500 text-sm">{fieldErrors.monthlyincome}</p>}
          </label>
          <label className="block mb-2">
            Employment Duration
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="employmentduration"
                value={formData.employmentduration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-3/4 p-2 border rounded mt-1"
              />
              <select
                name="durationunit"
                value={formData.durationunit}
                onChange={handleChange}
                className="w-1/2 h-10 p-2 border rounded mt-1 focus:outline-none"
              >
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
            </div>
            {fieldErrors.employmentduration && <p className="text-red-500 text-sm">{fieldErrors.employmentduration}</p>}
          </label>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded"
            >
              Cancel
            </button>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? <FiLoader size={20} className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
