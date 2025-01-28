import React, { useCallback, useState } from 'react'
import Styles from './FrontPage.module.scss'
import { CategoryIcon, DropdownArrowIcon, LocationIcon, RatingsIcon, SearchIcon, ServicesIcon, ShopsIcon, UserIcon } from './Icons/Icons'
import { useRouter } from 'next/router';

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


const FrontPage = ({ onNextClick }) => {

    const images = [
        { src: '/userInterface/popularCategories/popular1.png', name: 'Car Accessory', services: '30+ services' },
        { src: '/userInterface/popularCategories/popular2.png', name: 'Car Tires', services: '12+ services' },
        { src: '/userInterface/popularCategories/popular3.png', name: 'Car Paint', services: '15+ services' },
        { src: '/userInterface/popularCategories/popular4.png', name: 'Car Wash', services: '10+ services' },
        { src: '/userInterface/popularCategories/popular5.png', name: 'Car Services', services: '20+ services' },
      ];

      const [topRatedList, setTopRatedList] = useState([
        { name: 'Service', clicked: false },
        { name: 'Paint', clicked: false },
        {name: 'Wash', clicked: false},
        {name: 'Accessories', clicked: false},
        {name: 'Tires & Rims', clicked: false},
        {name: 'Accessories', clicked: false},
      ]);

      const topRatedBusinesses = [
        { src: '/userInterface/topRatedBusinesses/car-n-style.png', name: 'Car-N-Style', review: '12 review', address: 'Gandhi Nagar, Jmammu', rating: 4.0, },
        { src: '/userInterface/topRatedBusinesses/sanjay-motor.png', name: 'Sanjay Motor Service', review: '16 review', address: 'Nai Basti, Jammu', rating: 4.2, },
        { src: '/userInterface/topRatedBusinesses/nu-look.png', name: 'Nu-Look', review: '22 review', address: 'Waqf Market, Jammu', rating: 4.8, },
       
      ];

      const list= [
       { name: 'music'}, 
       { name: 'seat covers'},
       { name: 'mats'},
       { name: 'damping'},
      ]
    
      const handleItemClick = (index) => {
        const updatedList = topRatedList.map((item, i) => ({
            ...item,
            clicked: i === index ? !item.clicked : false,
        }));
        setTopRatedList(updatedList);
    };
    

    const router = useRouter();

    const handleSearchClick = useCallback(() => {
      onNextClick("SearchResult");
  
      window.scrollTo(0, 0);
    }, [onNextClick]);

      


  return (
    <div className="container">
    <div className={Styles.main}>

    {/* Section First */}
        <div className={Styles.section1}>
            <div className={Styles.discover}>
                <span> <span className={Styles.discoverSpan}>Discover</span> <span className={Styles.text}>car related <br />
Business easily</span></span>
<span className={Styles.span2}>
From workshops to tires: Connect with the best car businesses in <br /> your area.
</span>
<div className={Styles.icons}>
    <div className={Styles.firstRow}>
        <div className={Styles.shops}>
        <div ><ShopsIcon /></div>
        <div className={Styles.shopSpan2}><span className={Styles.shopSpan2span}>150+</span>Shops</div>
        </div>
        <div className={Styles.shops}>
        <div ><ServicesIcon /></div>
        <div className={Styles.shopSpan2}><span className={Styles.shopSpan2span}>1k+</span>Services</div>
        </div>
    </div>
    <div className={Styles.secondRow}>
    <div className={Styles.shops}>
        <div ><UserIcon /></div>
        <div className={Styles.shopSpan2}><span className={Styles.shopSpan2span}>400+</span>User reviews</div>
        </div>
        <div className={Styles.shops}>
        <div ><RatingsIcon /></div>
        <div className={Styles.shopSpan2}><span className={Styles.shopSpan2span}>1k+</span>Ratings</div>
        </div>
    </div>
</div>
            </div>

            <div className={Styles.image}>
                <img src="/userInterface/discoverCar.png" alt="" srcset="" className={Styles.imageCar} />
            </div>
        </div>



{/* Section Second */}
        <div className={Styles.section2}>
            <div className={Styles.section2Layout}>
                <div className={Styles.clsLayout}>
                <div className={Styles.firstRow}>
        <div className={Styles.list}>
        <div ><CategoryIcon /></div>
        <div className={Styles.list2}><span className={Styles.list2span}>Categories <DropdownArrowIcon /> </span>Choose Categories</div>
        </div>
        <div className={Styles.list}>
        <div ><LocationIcon /></div>
        <div className={Styles.list2}><span className={Styles.list2span}>Loaction <DropdownArrowIcon /> </span>Choose Location</div>
        </div>
        <button className={Styles.button} onClick={handleSearchClick}>
        <span ><SearchIcon /></span>
        <span className={Styles.search}>Search </span>
        </button>
    </div>
                </div>
            </div>
        </div>


{/* Section Third */}

<div className={Styles.section3}>
    <span className={Styles.heading}>Popular Categories</span>
    <div className={Styles.popularCategories}>
    {images.map((image, index) => (
        <div key={index} className={Styles.item}>
          <img src={image.src} alt={image.name} className={Styles.img} />
          <div className={Styles.itemsContent}>
          <p className={Styles.itemName}>{image.name}</p>
          <p className={Styles.itemService}>{image.services}</p>
          </div>
        </div>
      ))}
</div>
</div>


{/* Section Fourth */}

<div className={Styles.section3}>
    <span className={Styles.heading}>Top rated business </span>
    <span className={Styles.trusted}>Trusted and Top-Reviewed Businesses Near You</span>

    <div className={Styles.topRatedList}>
  {topRatedList.map((list, index) => (
    <div
      key={index}
      className={Styles.topRatedListItem}
      onClick={() => handleItemClick(index)}
      style={{ backgroundColor: list.clicked ? '#E46D1D' : '#F3F3F3' }}
    >
      <p className={Styles.topRatedListItemName}>{list.name}</p>
    </div>
  ))}
</div>


    <div className={Styles.topRated}>
    {topRatedBusinesses.map((business, index) => (
    <div key={index} className={Styles.topRatedBusinessesItem}>
        <img src={business.src} alt={business.name} className={Styles.img} />
        <div className={Styles.topRatedBusinessesItemContent}>
            <div className={Styles.topRatedBusinessesItemName}>
                <span>{business.name}</span>
                <span className={Styles.review}>{business.review}</span>
            </div>
            <div className={Styles.itemService}>{business.address}</div>
            <div className={Styles.rating}>
                {renderStars(business.rating)} 
                <span className={Styles.ratingNumber}>{business.rating.toFixed(1)}</span>

                
            </div>
            <div className={Styles.topRatedLists}>
  {list.map((list, index) => (
    <div
      key={index}
      className={Styles.topRatedListItem2}
      onClick={() => handleItemClick(index)}
    
    >
      <p className={Styles.topRatedListItemName2}>{list.name}</p>
    </div>
  ))}
</div>
        </div>
    </div>
))}

</div>
</div>

</div>

    </div>
  )
}

export default FrontPage