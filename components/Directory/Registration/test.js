import React, { useCallback, useState } from "react";
import styles from "./categoryAndService.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CategoriesAndServices = ({ onNextClick, onBackClick }) => {
  const router = useRouter();

  // Function to navigate to the "/timing" page
   const onFrameContainer18Click = useCallback(() => {
    onNextClick();
  }, [onNextClick]);

  // Function to navigate back to the "BusinessInfoPage"
  const handleBackClick = useCallback(() => {
    onBackClick();
  }, [onBackClick]);

  // Dropdown and Services
  const maxSelection = 3;
  const maxServices = 9;
  const servicesPerRow = 3;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [selectedServices, setSelectedServices] = useState({});

  // Handle selection of an option in the dropdown
  const handleOptionSelect = (option) => {
    if (selectedOptions.length < maxSelection) {
      setSelectedOptions([...selectedOptions, option]);
      setSelectedServices({ ...selectedServices, [option]: [] });
      setShowDropdown(false);
      setIsArrowRotated(false);
    }
  };

  // Handle deselection of an option
  const handleOptionDeselect = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selected) => selected !== option
    );
    const updatedServices = { ...selectedServices };
    delete updatedServices[option];
    setSelectedOptions(updatedOptions);
    setSelectedServices(updatedServices);
    if (updatedOptions.length === 0) {
      setShowDropdown(true);
    }
  };

  // Handle selection of a service within an option
  const handleServiceSelect = (option, service) => {
    const updatedServices = { ...selectedServices };
    if (!updatedServices[option]) {
      updatedServices[option] = [];
    }
    const optionServices = updatedServices[option];
    if (optionServices.includes(service)) {
      updatedServices[option] = optionServices.filter((s) => s !== service);
    } else {
      if (optionServices.length < maxServices) {
        updatedServices[option] = [...optionServices, service];
      }
    }
    setSelectedServices(updatedServices);
  };

  // Handle deselection of a service within an option
  const handleServiceDeselect = (option, service) => {
    const updatedServices = { ...selectedServices };
    updatedServices[option] = updatedServices[option].filter(
      (s) => s !== service
    );
    setSelectedServices(updatedServices);
  };

  // Handle "Add more items" click
  const handleAddMoreItems = () => {
    setShowDropdown(true);
    setIsArrowRotated(false);
  };

  // Available options for the dropdown
  const dropdownOptions = [
    "Option service Option service 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
    "Option 11",
    "Option 12",
  ];

  // Services available for each option
  const optionServices = {
    "Option service Option service 1": [
      "Service A",
      "Service B",
      "Service C",
      "Service D",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
      "Service J",
      "Service K",
      "Service O",
      "Service L",
      "Service M",
      "Service N",
    ],
    "Option 2": [
      "Service F",
      "Service G",
      "Service H",
      "Service I",
      "Service J",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
    ],
    "Option 3": [
      "Service K",
      "Service L",
      "Service M",
      "Service N",
      "Service O",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
    ],
    "Option 4": [
      "Service A",
      "Service B",
      "Service C",
      "Service D",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
      "Service J",
      "Service K",
      "Service O",
      "Service L",
      "Service M",
      "Service N",
    ],
    "Option 5": [
      "Service A",
      "Service B",
      "Service C",
      "Service D",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
      "Service J",
      "Service K",
      "Service O",
      "Service L",
      "Service M",
      "Service N",
    ],
    "Option 6": [
      "Service A",
      "Service B",
      "Service C",
      "Service D",
      "Service E",
      "Service F",
      "Service G",
      "Service H",
      "Service I",
      "Service J",
      "Service K",
      "Service O",
      "Service L",
      "Service M",
      "Service N",
    ],
  };

  // Filtered options that are not yet selected
  const filteredOptions = dropdownOptions.filter(
    (option) => !selectedOptions.includes(option)
  );

  return (
    <div className={styles.categoriesAndServices}>
      <div className={styles.frameParent}>
        {/* About section */}
        <div className={styles.aboutParent}>
          <div className={styles.about}>
            <span>About</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.describeYourBusinessWrapper}>
            <textarea
              rows="8"
              cols="80"
              className={styles.describeYourBusiness}
              type="text"
              placeholder="Describe Your Business...."
            />
          </div>
        </div>

        {/* Categories section */}
        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <div className={styles.categoriesParent}>
              <div className={styles.about}>
                <span>Categories </span>
                <span className={styles.span1}>*</span>
              </div>
              <div className={styles.selectYourBusiness}>
                Select your Business type
              </div>

              {/* Selected options */}
              <div className={styles.selectedOptionsContainer}>
                {selectedOptions.map((option) => (
                  <div className={styles.dropDownOptions} key={option}>
                    <span>{option}</span>
                    <span
                      className={styles.closeIcon}
                      onClick={() => handleOptionDeselect(option)}
                    >
                      &#10006;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dropdown and "Add more items" */}
            {selectedOptions.length < maxSelection && (
              <div>
                {showDropdown && (
                  <div>
                    <select
                      onChange={(e) => handleOptionSelect(e.target.value)}
                      className={styles.dropdown}
                      style={{
                        background: `url(bxsuparrow.svg) no-repeat calc(100% - 8px) center var(--foundation-neutral-neutral-100, #DEDEDE)`,
                      }}
                    >
                    
                      <option value="">Choose Category</option>
                      {filteredOptions.map((option) => (
                        <option key={option} value={option} className={styles.dropdownOption}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {!showDropdown && (
                  <div
                    className={styles.addMoreItems}
                    onClick={handleAddMoreItems}
                  >
                    + Add more items
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Services section */}
        <div className={styles.servicesParent}>
          <div className={styles.about}>Services</div>
          <div className={styles.selectYourBusiness}>
            Select services you provide within the selected category
          </div>
        </div>

        {/* Service list */}
        <div className={styles.frameGroup}>
          {selectedOptions.map((option, index) => (
            <div className={styles.selectedOption}>
              <div key={option} className={styles.optionRow}>
                <p className={styles.optionsBackground}>{option}</p>
              </div>

              <div className={styles.serviceParentList}>
                <div className={styles.frameDiv}>
                  <div className={styles.serviceRow}>
                    {optionServices[option] &&
                    optionServices[option].length > 0 ? (
                      optionServices[option].map((service, index) => (
                        <div
                          key={service}
                          className={styles.serviceList}
                          style={{
                            backgroundColor: selectedServices[option]?.includes(
                              service
                            )
                              ? "var(--foundation-primary-primary-400, #E98A4A)"
                              : "var(--foundation-neutral-neutral-100, #DEDEDE)",
                          }}
                          onClick={() => handleServiceSelect(option, service)}
                        >
                          <span className={styles.serviceRender}>
                            {service}
                          </span>
                          {selectedServices[option]?.includes(service) && (
                            <span
                              className={styles.closeIcon}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServiceDeselect(option, service);
                              }}
                            >
                              &#10006;
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>No services available for {option}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next and Back buttons */}
        <div className={styles.nextWrapper} onClick={onFrameContainer18Click}>
          <b className={styles.next}>Next</b>
        </div>
        <div className={styles.backWrapper} onClick={handleBackClick}>
          <b className={styles.next}>Back</b>
        </div>
      </div>

      {/* Business Info, Categories & services, Timings, Photos */}
      <div className={styles.component104}>
        <div className={styles.businessInfoParent}>
          <div className={styles.describeYourBusiness}>Business Info </div>
          <div className={styles.describeYourBusiness}>Categories & services</div>
          <div className={styles.timings}>Timings</div>
          <div className={styles.timings}>Photos</div>
        </div>
        <div className={styles.component104Inner}>
          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndServices;















// import React, { useCallback, useEffect, useState } from "react";
// import styles from "./categoryAndService.module.scss";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetBusinessCategoriesListQuery, useGetBusinessCategoriesServicesQuery } from "@/store/apiServices/apiServices";
// import { setCategories, setServices } from "@/store/categoryAndService";

// const CategoriesAndServices = ({ onNextClick, onBackClick }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState();

//   // Loading state for services
//   const [isServicesLoading, setIsServicesLoading] = useState(true);

//   // Fetch categories and services using Redux Toolkit Query
//   const { data: categories, isFetching: isCategoriesFetching } =
//     useGetBusinessCategoriesListQuery();
//   const {
//     data: services,
//     isFetching: isServicesFetching,
//     setQueryData,
//   } = useGetBusinessCategoriesServicesQuery(selectedCategory?.catID, {
//     skip: !selectedCategory,
//   });

//   useEffect(() => {
//     console.log("Categories:", categories);
//     if (categories) {
//       dispatch(setCategories(categories));
//     }
//   }, [categories, dispatch]);

//   useEffect(() => {
//     console.log("Services:", services);
//     if (services) {
//       setIsServicesLoading(false);
//       dispatch(setServices(services));
//     }
//   }, [services, dispatch]);

//   // Fetch services for the selected category whenever it changes
//   useEffect(() => {
//     if (selectedCategory) {
//       setIsServicesLoading(true);

//       // Fetch services for the selected category
//       const fetchServices = async () => {
//         try {
//           const result = await useGetBusinessCategoriesServicesQuery(
//             selectedCategory.catID
//           ).unwrap();
//           setIsServicesLoading(false);

//           // Use setQueryData to update the services data
//           setQueryData(result);
//         } catch (error) {
//           setIsServicesLoading(false);
//           console.error("Error fetching services:", error);
//         }
//       };

//       fetchServices();
//     }
//   }, [selectedCategory, setQueryData]);

//   // Function to navigate to the "/timing" page
//   const onFrameContainer18Click = useCallback(() => {
//     onNextClick();
//   }, [onNextClick]);

//   // Function to navigate back to the "BusinessInfoPage"
//   const handleBackClick = useCallback(() => {
//     onBackClick();
//   }, [onBackClick]);

//   // Dropdown and Services
//   const maxSelection = 3;
//   const maxServices = 9;
//   // const servicesPerRow = 3;
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(true);
//   const [isArrowRotated, setIsArrowRotated] = useState(false);
//   const [selectedServices, setSelectedServices] = useState({});

//   // For the category selected from the dropdown
//   const handleOptionSelect = (option) => {
//     if (selectedOptions.length < maxSelection) {
//       setSelectedOptions([...selectedOptions, option]);
//       setShowDropdown(false);
//       setIsArrowRotated(false);

//       const selectedCategory = dropdownOptions.find(
//         (cat) => cat.catName === option
//       );

//       if (selectedCategory) {
//         setSelectedCategory(selectedCategory);
//       }
//       console.log("services list", services);
//     }
//   };

//   // Handle deselection of an option
//   const handleOptionDeselect = (option) => {
//     const updatedOptions = selectedOptions.filter(
//       (selected) => selected !== option
//     );
//     const updatedServices = { ...selectedServices };
//     delete updatedServices[option];
//     setSelectedOptions(updatedOptions);
//     setSelectedServices(updatedServices);
//     if (updatedOptions.length === 0) {
//       setShowDropdown(true);
//     }
//   };

//   // Handle selection of a service within an option
//   const handleServiceSelect = (option, service) => {
//     const updatedServices = { ...selectedServices };
//     if (!updatedServices[option]) {
//       updatedServices[option] = [];
//     }

//     const optionServices = updatedServices[option];
//     if (optionServices.includes(service)) {
//       updatedServices[option] = optionServices.filter((s) => s !== service);
//     } else {
//       if (optionServices.length < maxServices) {
//         updatedServices[option] = [...optionServices, service];
//       }
//     }
//     setSelectedServices(updatedServices);
//   };

//   // Handle deselection of a service within an option
//   const handleServiceDeselect = (option, service) => {
//     const updatedServices = { ...selectedServices };
//     updatedServices[option] = updatedServices[option].filter((s) => s !== service);
//     setSelectedServices(updatedServices);
//   };

//   // Handle "Add more items" click
//   const handleAddMoreItems = () => {
//     setShowDropdown(true);
//     setIsArrowRotated(false);
//   };

//   // Available options for the dropdown
//   const dropdownOptions = useSelector(
//     (state) => state.categoryAndService.categories
//   );

//   // Services available for each option
//   const optionServices = useSelector(
//     (state) => state.categoryAndService.services
//   );

//   // Extract the catName property from each category object
//   const filteredOptions = dropdownOptions
//     .map((category) => category.catName)
//     .filter((option) => !selectedOptions.includes(option));

//   return (
//     <div className={styles.categoriesAndServices}>
//       <div className={styles.frameParent}>
//         {/* About section */}
//         <div className={styles.aboutParent}>
//           <div className={styles.about}>
//             <span>About</span>
//             <span className={styles.span}>*</span>
//           </div>
//           <div className={styles.describeYourBusinessWrapper}>
//             <textarea
//               rows="8"
//               cols="80"
//               className={styles.describeYourBusiness}
//               type="text"
//               placeholder="Describe Your Business...."
//             />
//           </div>
//         </div>

//         {/* Categories section */}
//         <div className={styles.frameWrapper}>
//           <div className={styles.frameContainer}>
//             <div className={styles.categoriesParent}>
//               <div className={styles.about}>
//                 <span>Categories </span>
//                 <span className={styles.span1}>*</span>
//               </div>
//               <div className={styles.selectYourBusiness}>
//                 Select your Business type
//               </div>

//               {/* Selected options */}
//               <div className={styles.selectedOptionsContainer}>
//                 {selectedOptions.map((option) => (
//                   <div className={styles.dropDownOptions} key={option}>
//                     <span>{option}</span>
//                     <span
//                       className={styles.closeIcon}
//                       onClick={() => handleOptionDeselect(option)}
//                     >
//                       &#10006;
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Dropdown and "Add more items" */}
//             {selectedOptions.length < maxSelection && (
//               <div>
//                 {showDropdown && (
//                   <div>
//                   <select
//   onChange={(e) => handleOptionSelect(e.target.value)}
//   className={styles.dropdown}
//   style={{
//     background: `url(bxsuparrow.svg) no-repeat calc(100% - 8px) center var(--foundation-neutral-neutral-100, #DEDEDE)`,
//   }}
// >
//   <option value="">Choose Category</option>
//   {filteredOptions.map((option) => (
//     <option key={option} value={option} className={styles.dropdownOption}>
//       {option}
//     </option>
//   ))}
// </select>
//                   </div>
//                 )}

//                 {!showDropdown && (
//                   <div
//                     className={styles.addMoreItems}
//                     onClick={handleAddMoreItems}
//                   >
//                     + Add more items
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Services section */}
//         <div className={styles.servicesParent}>
//           <div className={styles.about}>Services</div>
//           <div className={styles.selectYourBusiness}>
//             Select services you provide within the selected category
//           </div>
//         </div>

//         {/* Service list */}
//         <div className={styles.frameGroup}>
//         {selectedOptions.map((option) => (
//   <div className={styles.selectedOption} key={option}>
//       <div className={styles.optionRow}>
//         <p className={styles.optionsBackground}>{option}</p>
//       </div>
//       <div className={styles.serviceParentList}>
//       <div className={styles.frameDiv}>
//         <div className={styles.serviceRow}>
//           {selectedServices[option] && selectedServices[option].length > 0 ? (
//             selectedServices[option].map((service) => (
//               <div
//                 key={service.serviceID}
//                 className={styles.serviceList}
//                 style={{
//                   backgroundColor: selectedServices[option]?.includes(service)
//                     ? "var(--foundation-primary-primary-400, #E98A4A)"
//                     : "var(--foundation-neutral-neutral-100, #DEDEDE)",
//                 }}
//                 onClick={() => handleServiceSelect(option, service)}
//               >
//                 <span className={styles.serviceRender}>{service.serviceName}</span>
//                   {selectedServices[option]?.includes(service) && (
//                     <span
//                       className={styles.closeIcon}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleServiceDeselect(option, service);
//                       }}
//                     >
//                       &#10006;
//                     </span>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div>No services available for {option}</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//         {/* Next and Back buttons */}
//         <div className={styles.nextWrapper} onClick={onFrameContainer18Click}>
//           <b className={styles.next}>Next</b>
//         </div>
//         <div className={styles.backWrapper} onClick={handleBackClick}>
//           <b className={styles.next}>Back</b>
//         </div>
//       </div>

//       {/* Business Info, Categories & services, Timings, Photos */}
//       <div className={styles.component104}>
//         <div className={styles.businessInfoParent}>
//           <div className={styles.describeYourBusiness}>Business Info </div>
//           <div className={styles.describeYourBusiness}>Categories & services</div>
//           <div className={styles.timings}>Timings</div>
//           <div className={styles.timings}>Photos</div>
//         </div>
//         <div className={styles.component104Inner}>
//           <div className={styles.frameChild} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesAndServices;