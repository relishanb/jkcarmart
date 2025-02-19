// import { useState } from "react";
// import { FiCheck } from "react-icons/fi";
// import RequestFormModal from "./RequestFormModal";
// import { useRouter } from 'next/router';

// export default function NoResults({ src }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

//   const handleRequestClick = () => {
//     setIsModalOpen(true);
//   };

//   const route = useRouter();

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFormSubmit = (formData) => {
//     setIsModalOpen(false);
//     setIsSuccessModalOpen(true);

//     setTimeout(() => {
//       route.push("/");
//     }); 
//   };

//   const handleCloseSuccessModal = () => {
//     route.push("/");
//     setIsSuccessModalOpen(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center text-center px-6 space-y-4 h-[75vh]">
//       {/* <h2 className="text-lg font-semibold">0 cars found for search result</h2> */}
//       <img src={src} alt="No results" className="w-[300px] h-16" />
//       <p className="text-gray-600 text-sm">
//         No result for your search, please try something else
//       </p>
//       <p className="text-gray-500 text-sm">or</p>
//       <button
//         className="bg-orange-500 text-white text-sm font-medium px-4 py-3 rounded-md shadow-md"
//         onClick={handleRequestClick}
//       >
//         Make a Request
//       </button>
//       <RequestFormModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleFormSubmit}
//       />
//       {isSuccessModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white flex flex-col items-center p-6 rounded-md shadow-md">
//             <div className="bg-orange-500 flex justify-center w-14 rounded-full py-3 mb-2">
//               <FiCheck className=" text-white text-3xl" />
//             </div>
//             <p>We'll get back to you within 24 hours</p>
//             <button
//               className="bg-orange-500 text-white px-4 py-2 rounded-md mt-2"
//               onClick={handleCloseSuccessModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from 'react';
import RequestFormModal from './RequestFormModal';
import { FiCheck } from 'react-icons/fi';
import { UseRequiredCarMutation } from "@/store/apiServices/apiServices"; 

export default function NoResults({ src, title, desc }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 h-[75vh]">
      <img src={src} alt="No results" className="w-[300px] h-16" />
      <p className="text-gray-600 text-sm">No result for your search, please try something else</p>
      <button
        className="bg-orange-500 text-white text-sm font-medium px-4 py-3 rounded-md shadow-md"
        onClick={handleRequestClick}
      >
        Make a Request
      </button>
      <RequestFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // onSubmit={handleFormSubmit}
        setIsModalOpen={setIsModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
      />
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white flex flex-col items-center p-6 rounded-md shadow-md">
            <div className="bg-orange-500 flex justify-center w-14 rounded-full py-3 mb-2">
              <FiCheck className=" text-white text-3xl" />
            </div>
            <p>We'll get back to you within 24 hours</p>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}