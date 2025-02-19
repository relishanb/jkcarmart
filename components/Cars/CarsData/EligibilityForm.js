import React, { useState } from "react";
import Button from "@/components/UI/UIcomponents/Button";
import { usePostDataMutation } from "@/store/apiServices/apiServices";
import { FiCheck, FiLoader } from "react-icons/fi";
import { FaX } from "react-icons/fa6";
import CustomSelect from "@/components/UI/CustomSelect";

export const EligibilityForm = ({ closeModal, carId }) => {
  const [formData, setFormData] = useState({
    carid: carId,
    fullname: "",
    age: "",
    mobileno: "",
    emailid: "",
    employmenttype: "",
    monthlyincome: "",
    employmentduration: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [postData, { isLoading }] = usePostDataMutation();

 const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, employmenttype: e.value });
    }
  };

  const validateForm = () => {
    const { fullname, age, mobileno, emailid, employmenttype, monthlyincome } = formData;
    if (!fullname || !age || !mobileno || !emailid || !employmenttype || !monthlyincome) {
      setError("Please fill all the required fields.");
      return false;
    }

    const newFieldErrors = {};

    if (!/^[a-zA-Z ]+$/.test(fullname)) newFieldErrors.fullname = "Full name must only contain letters and spaces.";
    if (parseInt(age, 10) < 20) newFieldErrors.age = "You must be at least 20 years old.";
    if (!/^\d{10}$/.test(mobileno)) newFieldErrors.mobileno = "Mobile number must be 10 digits.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailid)) newFieldErrors.emailid = "Enter a valid email address.";
    if (!["Govt. service", "Private", "Unemployed", "Retired"].includes(employmenttype)) newFieldErrors.employmenttype = "Select a valid employment type.";
    if (!/^\d+(\.\d+)?$/.test(monthlyincome.replace(/,/g, ""))) newFieldErrors.monthlyincome = "Monthly income must be a valid number.";
    if (formData.employmentduration && !/^[0-9]+(\.[0-9]+)?$/.test(formData.employmentduration)) {
      newFieldErrors.employmentduration = "Employment duration must be a valid number.";
    }

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await postData({
        ...formData,
        monthlyincome: formData.monthlyincome.replace(/,/g, ""),
      }).unwrap();

      if (response.statusCode === "200") {
        setIsSubmitted(true);
        setTimeout(closeModal, 2000);
      } else {
        setError(response.error || "An error occurred.");
      }
    } catch (error) {
      setError(error?.data?.message || "Failed to submit. Please try again.");
    }
  };
  
  const employmentOptions = [
    { value: '', label: 'Select Employment Type' },
    { value: 'Govt. service', label: 'Govt. service' },
    { value: 'Private', label: 'Private' },
    { value: 'Unemployed', label: 'Unemployed' },
    { value: 'Retired', label: 'Retired' },
  ];

  const ageOptions = [...Array(61)].map((_, i) => {
    const age = i + 20;
    return { value: age, label: age.toString() };
  });

  return (
    <div onClick={closeModal}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        {isSubmitted ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-500 rounded-full p-3">
                <FiCheck className="text-white text-3xl" />
              </div>
            </div>
            <h2 className="text-lg font-semibold">Thank you for sharing</h2>
            <p className="text-gray-600 mt-2">We will reach out to you shortly.</p>
          </div>
        ) : (

          <form onSubmit={handleSubmit}>
            <FaX
              size={12}
              className="relative left-72 text-gray-800 hover:text-gray-900 cursor-pointer"
              onClick={closeModal}
            />
            {error && <p className="text-red-500 text-sm mb-2 font-medium">*{error}</p>}
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-2 border rounded my-1"
            />
            {fieldErrors.fullname && <p className="text-red-500 text-sm font-medium">*{fieldErrors.fullname}</p>}
            <label className="block font-semibold">Age</label>
            <input
              name="age"
              placeholder="Select Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border my-1  rounded  "
            />
            {fieldErrors.age && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.age}</p>
            )}
            <label className="block font-semibold">Mobile No.</label>
            <input
              type="tel"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-2 border rounded my-1"
            />
            {fieldErrors.mobileno && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.mobileno}</p>
            )}
            <label className="block font-semibold">Email Address</label>
            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-2 border rounded my-1"
            />
            {fieldErrors.emailid && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.emailid}</p>
            )}
            <label className="block font-semibold">Employment Type</label>
            <CustomSelect
              value={employmentOptions.find(option => option.value === formData.employmenttype)}
              onChange={handleChange}
              options={employmentOptions}
            />
            {/* <select
              name="employmenttype"
              value={formData.employmenttype}
              onChange={handleChange}
              className="w-full p-2 h-10 my-1 border bg-white rounded focus:outline-none "
            >
              <option value="" >Select Employment Type</option>
              <option value="Govt. service">Govt. service</option>
              <option value="Private">Private</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
            </select> */}
            {fieldErrors.employmenttype && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.employmenttype}</p>
            )}
            <label className="block font-semibold">Monthly Income</label>
            <input
              type="text"
              name="monthlyincome"
              value={formData.monthlyincome}
              onChange={handleChange}
              placeholder="Enter your monthly income"
              className="w-full p-2 border rounded my-1"
            />
            {fieldErrors.monthlyincome && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.monthlyincome}</p>
            )}
            <label className="block font-semibold">
              Employment Duration (in Years) <span className="text-white">emduration</span>
            </label>
            <input
              type="number"
              name="employmentduration"
              value={formData.employmentduration}
              onChange={handleChange}
              placeholder="e.g - 4.6"
              className="w-full p-2 border rounded my-1"
            />
            {fieldErrors.employmentduration && (
              <p className="text-red-500 text-sm font-medium">*{fieldErrors.employmentduration}</p>
            )}
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
        )}
      </div>
    </div>
  );
};
