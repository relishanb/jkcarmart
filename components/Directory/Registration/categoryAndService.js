import React, { useCallback, useEffect, useState } from "react";
import styles from "./categoryAndService.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import {
  useGetBusinessCategoriesListQuery,
  useGetBusinessCategoriesServicesQuery, useAddBusinessUserCategoryServiceMutation
} from "@/store/apiServices/apiServices";
import { setCategories, setServices, setMutationStatus } from "@/store/categoryAndService";

const CategoriesAndServices = ({ onNextClick, onBackClick }) => {
  const savedServices = useSelector(
    (state) => state.categoryAndService.services
  );



  // console.log("savedServices", savedServices);

  useEffect(() => {
    setSelectedServices(savedServices);
  }, [savedServices]);

  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedServicesArray, setSelectedServicesArray] = useState([]);

  const [selectedServicesObject, setSelectedServicesObject] = useState({});


  // Loading state for services
  const [isServicesLoading, setIsServicesLoading] = useState(true);

  // Fetch categories and services using Redux Toolkit Query
  const { data: categories, isFetching: isCategoriesFetching } =
    useGetBusinessCategoriesListQuery();

  const {
    data: services,
    isFetching: isServicesFetching,
    isError: servicesError,
  } = useGetBusinessCategoriesServicesQuery(selectedCategory?.catID, {
    skip: !selectedCategory,
  });



  const authenticatedUserId = useSelector(
    (state) => state.authentication.userId
  );

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch]);

  useEffect(() => {
    // console.log("Services:", services);

    if (services) {
      setIsServicesLoading(false);
      dispatch(setServices(services));
    }

    setSelectedOptions((prevSelectedOptions) => {
      prevSelectedOptions.forEach((option, index) => {
        if (services[0].catIDFK == option.catID)
          prevSelectedOptions[index].services = services;
      });

      return prevSelectedOptions;
    });
  }, [services, dispatch]);

  // Fetch services for the selected category whenever it changes
  useEffect(() => {
    if (selectedCategory) {
      fetchServicesForCategory(selectedCategory.catID);
    }
  }, [selectedCategory]);



  // Function to navigate back to the "BusinessInfoPage"
  const handleBackClick = useCallback(() => {
    onBackClick();
    window.scrollTo(0, 0); 
  }, [onBackClick]);

  // Dropdown and Services
  const maxSelection = 3;
  const maxServices = 9;
  const [selectedOptions, setSelectedOptions] = useState([]);

 
  const [selectedServices, setSelectedServices] = useState(services);
  const [showDropdown, setShowDropdown] = useState(true)

  // Function to fetch services for the selected category
  const fetchServicesForCategory = async (catID) => {
    // console.log("fetchServicesForCategory Services", services);

    setIsServicesLoading(true);
    try {
      if (servicesError) {
        throw servicesError;
      }

      return services;
    } catch (error) {
      // console.error("Error fetching services:", error);
      return [];
    } finally {
      setIsServicesLoading(false);
    }
  };
  // For the category selected from the dropdown
  const handleOptionSelect = (option) => {
    if (selectedOptions.length < maxSelection) {
      const selectedCategory = dropdownOptions.find(
        (cat) => cat.catName === option
      );

      if (selectedCategory) {
        setSelectedOptions((prevSelectedOptions) => [
          ...prevSelectedOptions,
          {
            name: option,
            catID: selectedCategory.catID,
            services: [],
          },
        ]);

        setSelectedCategory(selectedCategory);
        if (selectedOptions.length + 1 !== maxSelection) {
          setShowDropdown(false);
        }
      }
    }
  };



  // Handle deselection of an option
  const handleOptionDeselect = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter(
        (selectedOption) => selectedOption.name !== option
      )
    );
    setSelectedCategory(null);
  };

  const handleAddMoreCategoriesClick = () => {
    setShowDropdown(true);
  };

  const handleServiceSelect = (selectedService, selectedCategory) => {
    const maxServicesReached = selectedOptions.some(
      (option) =>
        option.catID === selectedCategory.catID &&
        option.services.length >= maxServices
    );
  
    if (maxServicesReached) {
      return;
    }
  
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.map((option) =>
        option.catID === selectedCategory.catID
          ? {
              ...option,
              services: option.services.map((service) =>
                service === selectedService
                  ? { ...service, selected: true }
                  : service
              ),
            }
          : option
      )
    );
  
    setSelectedServicesArray((prevSelectedServicesArray) => {
      const categoryIndex = prevSelectedServicesArray.findIndex(
        (item) => item.catID === selectedCategory.catID
      );
  
      if (categoryIndex !== -1) {
        const updatedServices = [
          ...prevSelectedServicesArray[categoryIndex].services,
          {
            serviceName: selectedService.serviceName,
            serviceID: selectedService.serviceID,
          },
        ];
        return [
          ...prevSelectedServicesArray.slice(0, categoryIndex),
          { catID: selectedCategory.catID, services: updatedServices },
          ...prevSelectedServicesArray.slice(categoryIndex + 1),
        ];
      } else {
        return [
          ...prevSelectedServicesArray,
          {
            catID: selectedCategory.catID,
            services: [
              {
                serviceName: selectedService.serviceName,
                serviceID: selectedService.serviceID,
              },
            ],
          },
        ];
      }
    });
  };
  
  const handleServiceDeselect = (selectedService, selectedCategory) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.map((option) =>
        option.catID === selectedCategory.catID
          ? {
              ...option,
              services: option.services.map((service) =>
                service === selectedService
                  ? { ...service, selected: false }
                  : service
              ),
            }
          : option
      )
    );
  
    setSelectedServicesArray((prevSelectedServicesArray) => {
      const categoryIndex = prevSelectedServicesArray.findIndex(
        (item) => item.catID === selectedCategory.catID
      );
  
      if (categoryIndex !== -1) {
        const updatedServices = prevSelectedServicesArray[
          categoryIndex
        ].services.filter((service) => service.serviceName !== selectedService.serviceName);
        return [
          ...prevSelectedServicesArray.slice(0, categoryIndex),
          { catID: selectedCategory.catID, services: updatedServices },
          ...prevSelectedServicesArray.slice(categoryIndex + 1),
        ];
      }
  
      return prevSelectedServicesArray;
    });
  };
  
  
  
  
  const [addBusinessUserCategoryService, response] = useAddBusinessUserCategoryServiceMutation();

  console.log("response", response);

  // Function to navigate to the "/timing" page
  const onFrameContainer18Click = async () => {
    const selectedCategoryIds = selectedOptions.map((option) => option.catID);

    const categoriesToSave = selectedServicesArray.map((category) => ({
      bServiceID: 0,
      categortyID: category.catID,
      services: category.services.map((service) => service.serviceID).join(","),
    }));
  
    const requestBody = {
      userID: authenticatedUserId,
      categories: categoriesToSave,
    };
  
    console.log("requestBody", requestBody);
    
  try {
 
    const response = await addBusinessUserCategoryService(requestBody);


    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Data saved successfully!',
    });

    onNextClick();
    window.scrollTo(0, 0); 
  } catch (error) {
   
    console.error('Error saving data:', error);
  }
};
  

  
  // Available options for the dropdown
  const dropdownOptions = useSelector(
    (state) => state.categoryAndService.categories
  );

  // Extract the catName property from each category object
  const selectedOptionNames = selectedOptions.map((option) => option.name);
  const filteredOptions = dropdownOptions
    .map((category) => category.catName)
    .filter((option) => !selectedOptionNames.includes(option));
   

   

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
                <div className={styles.dropDownOptions} key={option.name}>
                  <span>{option.name}</span>
                  <span
                    className={styles.closeIcon}
                    onClick={() => handleOptionDeselect(option.name)}
                  >
                    &#10006;
                  </span>
                </div>
              ))}

              {/* "Add more categories" text */}
           
            </div>
            {selectedOptions.length < maxSelection && !showDropdown && (
                <div className={styles.addMoreItems}>
                  <span onClick={handleAddMoreCategoriesClick}>
                    + Add more categories
                  </span>
                </div>
              )}
          </div>
         

          {/* Dropdown and "Add more items" */}
          {showDropdown && selectedOptions.length < maxSelection && (
            <div>
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
                    <option
                      key={option}
                      value={option}
                      className={styles.dropdownOption}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
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
            <div className={styles.selectedOption} key={index}>
              <div className={styles.optionRow}>
                <p className={styles.optionsBackground}>{option.name}</p>
              </div>
              <div className={styles.serviceParentList}>
                <div className={styles.frameDiv}>
                  <div className={styles.serviceRow}>
                  {option.services && option.services.length > 0 ? (
              option.services.map((service, index) => {
                const serviceClassName = service.selected
                  ? `${styles.serviceList} ${styles.selectedService}`
                  : styles.serviceList;

                return (
                  <div
                    key={index}
                    className={serviceClassName}
                    onClick={() => {
                      if (service.selected) {
                        handleServiceDeselect(service, option);
                      } else {
                        handleServiceSelect(service, option);
                      }
                    }}
                  >
                    <span className={styles.serviceRender}>
                      {service.serviceName}
                    </span>
                    {service.selected && (
                      <span
                        className={styles.closeIcon}
                        onClick={() => handleServiceDeselect(service, option)}
                      >
                        &#10006;
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div>No services available for {option.name}</div>
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
          <div className={styles.describeYourBusiness}>
            Categories & services
          </div>
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
