import React, { useCallback, useState } from "react";
import Styles from "./SearchResult.module.scss";
import {
  ContactIcon,
  DropdownArrowIcon,
  EyeIcon,
  HeartIcon,
  TickIcon,
} from "./Icons/Icons";
import ReactPaginate from "react-paginate";
function renderStars(rating) {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const decimalPart = rating - filledStars;
  const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75;

  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i}>★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half">★½</span>);
  }

  const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty${i}`}>☆</span>);
  }

  return stars;
}

const SearchResult = ({ onNextClick }) => {
  const topRatedBusinesses = [
    {
      src: "/userInterface/searchList/car-n-style.png",
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    // { src: '/userInterface/searchList/nu-look.png',  name: 'Nu-Look', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
    {
      src: "/userInterface/searchList/byc.png",
      name: "Bsckyard customs BYC",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/chowdary.png",
      name: "Chowdhary car accessories",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/enigma.png",
      name: "Enigma car accessories",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    // { src: '/userInterface/searchList/nu-look.png',  name: 'Nu-Look', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
    {
      src: "/userInterface/searchList/byc.png",
      name: "Bsckyard customs BYC",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/chowdary.png",
      name: "Chowdhary car accessories",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/enigma.png",
      name: "Enigma car accessories",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    // { src: '/userInterface/searchList/nu-look.png',  name: 'Nu-Look', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
    {
      src: "/userInterface/searchList/byc.png",
      name: "Bsckyard customs BYC",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/chowdary.png",
      name: "Chowdhary car accessories",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/enigma.png",
      name: "Enigma car accessories",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    // { src: '/userInterface/searchList/nu-look.png',  name: 'Nu-Look', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
    {
      src: "/userInterface/searchList/byc.png",
      name: "Bsckyard customs BYC",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/chowdary.png",
      name: "Chowdhary car accessories",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/enigma.png",
      name: "Enigma car accessories",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    // { src: '/userInterface/searchList/nu-look.png',  name: 'Nu-Look', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
    {
      src: "/userInterface/searchList/byc.png",
      name: "Bsckyard customs BYC",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/chowdary.png",
      name: "Chowdhary car accessories",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },
    {
      src: "/userInterface/searchList/enigma.png",
      name: "Enigma car accessories",
      review: "14 review",
      address: "Gandhi Nagar, Jammu",
      rating: 4.0,
    },
  ];

  const list = [
    { name: "music" },
    { name: "seat covers" },
    { name: "mats" },
    { name: "damping" },
  ];

  const businessesPerPage = 3; 
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  const startIndex = currentPage * businessesPerPage;
  const endIndex = startIndex + businessesPerPage;

  const businessesToDisplay = topRatedBusinesses.slice(startIndex, endIndex);

  const handleItemClick = (index) => {};


  const handleMoreClick = useCallback(() => {
    onNextClick("MoreInfo");

    window.scrollTo(0, 0);
  }, [onNextClick]);

  return (
    <div className="container">
      <div className={Styles.main}>
        {/* Section First */}
        <div className={Styles.topRatedLists}>
          <div className={Styles.topRatedListItem2}>
            <p className={Styles.topRatedListItemName2}>
              <span className={Styles.list2span}>
                Accessories <DropdownArrowIcon />{" "}
              </span>
            </p>
            <p className={Styles.topRatedListItemName2}>
              <span className={Styles.list2span}>
                Location <DropdownArrowIcon />{" "}
              </span>
            </p>
            <p className={Styles.topRatedListItemName2}>
              <span className={Styles.list2span}>Top Rated </span>
            </p>

            <p className={Styles.topRatedListItemName2}>
              <span className={Styles.list2span}>
                Verified <TickIcon />{" "}
              </span>
            </p>
          </div>
        </div>

        {/* Section Second */}

        <div className={Styles.section}>
          <div className={Styles.searchLists}>
            {businessesToDisplay.map((business, index) => (
              <div key={index} className={Styles.searchList}>
                <img
                  src={business.src}
                  alt={business.name}
                  className={Styles.img}
                />

                <div className={Styles.contentList}>
                  <div className={Styles.searchItemContent}>
                    <span className={Styles.name}>{business.name}</span>
                    <span className={Styles.address}>{business.address}</span>
                    <div className={Styles.ratingSection}>
                      <div className={Styles.ratingNumber}>
                        {business.rating.toFixed(1)}
                      </div>
                      <div className={Styles.rating}>
                        {renderStars(business.rating)}
                      </div>

                      <div className={Styles.review}>{business.review}</div>
                    </div>

                    <div className={Styles.lists}>
                      {list.map((list, index) => (
                        <div
                          key={index}
                          className={Styles.list}
                          onClick={() => handleItemClick(index)}
                        >
                          <p className={Styles.listName}>{list.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className={Styles.view}>
                      <div className={Styles.contact}>
                        <div>
                          <span className={Styles.number}>
                            {" "}
                            <ContactIcon />{" "}
                            <span className={Styles.contactNumber}>
                              9796228282
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className={Styles.number}>
                            {" "}
                            <EyeIcon />{" "}
                            <span className={Styles.contactNumber}>
                              103 Viewed
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className={Styles.moreButton} onClick={handleMoreClick}>
                        <span className={Styles.more}>More</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.heartIcon}>
                    <HeartIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.addBox}>
            <span className={Styles.expandText}>
              <span className={Styles.addExpand}>ADD</span> and{" "}
              <span className={Styles.addExpand}>Expand</span> your business
              reach with JKcarmart
            </span>
            <button className={Styles.addButton}>Add</button>
          </div>
        </div>
        {/* Pagination */}
        <div className={Styles.paginationContainer}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(topRatedBusinesses.length / businessesPerPage)}
            onPageChange={handlePageChange}
            containerClassName={Styles.pagination}
            activeClassName={Styles.activePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
