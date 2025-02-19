import { usePostRequiredCarMutation } from '@/store/apiServices/apiServices';
import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

export default function RequestFormModal({ isOpen, onClose, setIsModalOpen, setIsSuccessModalOpen }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carName, setCarName] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const [postRequiredCar, { isLoading }] = usePostRequiredCarMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !carName || !budget) {
      setError('Please fill in all the fields');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError('Please enter a valid name');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Invalid phone number');
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(carName)) {
      setError('Please enter a valid car info');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email must be a valid email address');
      return;
    }
    if (isNaN(budget)) {
      setError('Budget must be a number');
      return;
    }
    setError('');
    handleFormSubmit({ username: name, phoneno: phone, emailid: email, carinfo: carName, budget });
  };

  const handleFormSubmit = async (formData) => {
    console.log("Submitting form data:", formData);
    try {
      const response = await postRequiredCar(formData);
      console.log("Response received:", response);
      if (response?.data.statusCode === '200') {
        console.log('Form submitted successfully');
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        // Clear the form fields
        setName('');
        setPhone('');
        setEmail('');
        setCarName('');
        setBudget('');
      } else {
        console.log('Form submission failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-6">
      <div className="bg-white p-6 rounded-md shadow-md w-full flex flex-col">
        <form onSubmit={handleSubmit}>
          {error && <p className="font-medium whitespace-nowrap text-red-500 mb-4 text-left">*{error}</p>}
          <div className="mb-4 flex flex-col items-start">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:border-orange-500"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:border-orange-500"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:border-orange-500"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label className="block text-sm font-semibold mb-1">Required Car Information</label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:border-orange-500"
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label className="block text-sm font-semibold mb-1">Budget</label>
            <div className="relative w-full">
              <span className="absolute text-sm inset-y-0 left-0 flex items-center pl-3">₹</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-8 px-3 py-2 border rounded-md focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-orange-500 text-orange-500 px-2 py-1 rounded-md"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-orange-500 text-white px-2 py-1 rounded-md"
            >
              {isLoading ? <FiLoader size={20} className="animate-spin" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}