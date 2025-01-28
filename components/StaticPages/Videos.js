import React, { useState } from 'react';
import VideoComp from './VideoComp';
import styles from './Videos.module.scss';

const Videos = () => {
  const [selectedVideoType, setSelectedVideoType] = useState("All Videos");
  const videoTypes = [
    {  type: "All Videos" },
    {  type: "Tips for buying used cars" },
    {  type: "Tips for selling used cars" },
  ];

  const videoData = [
    {link: "https://www.youtube.com/watch?v=BpsS3SM0POE",duration: "1 min : 42 secs", title: "Sell Car As New User", img: 'http://i3.ytimg.com/vi/BpsS3SM0POE/hqdefault.jpg'},
    {link: "https://www.youtube.com/watch?v=SbYEmLVqIH8", duration: "1 min : 34 secs", title: "Sell Car As Registered User", img: 'http://i3.ytimg.com/vi/SbYEmLVqIH8/hqdefault.jpg'},
  ];

  const proTipsBuying = [    
    {link: "https://www.youtube.com/watch?v=SOiowJ5oNjw", duration: "1 min : 34 secs", title: "One Tip, if you are looking to buy used car", img: 'http://i3.ytimg.com/vi/SOiowJ5oNjw/hqdefault.jpg'},  
  ];

  const proTipsSelling = [
    {link: "https://www.youtube.com/watch?v=U7wdjPMfZGA", duration: "1 min : 34 secs", title: "How to prepare your used car for sale?", img: 'http://i3.ytimg.com/vi/U7wdjPMfZGA/hqdefault.jpg'}    
  ];
  let filteredVideos = videoData;

  if (selectedVideoType === "Tips for buying used cars") {
    filteredVideos = proTipsBuying;
  } else if (selectedVideoType === "Tips for selling used cars") {
    filteredVideos = proTipsSelling;
  }

    
   return (
    
    <div className={styles.overallDiv}>
    
    <section className="first_section">
        <div className="container">
          <div className={styles.help_area}>
            <div className="container">
              <div className={styles.secHeading}>
                <h2>Video Tutorials</h2>
                <h3>Get started with our video tutorials to guide you to better use our services</h3>
              </div>

              <div className={styles.chooseType}>Choose from the following.</div>

              <div className={styles.listTypes}>
                {videoTypes.map((typeList, index) => (
                  <span
                    key={index}
                    className={selectedVideoType === typeList.type ? styles.selectedListType : styles.listType}
                    onClick={() => setSelectedVideoType(typeList.type)}
                  >
                    {typeList.type}
                  </span>
                ))}
              </div>
              <div className="row">
                {filteredVideos.map(({ link, title, img, duration }, index) => (
                  <VideoComp key={index} link={link} title={title} img={img} duration={duration} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       
    
    
    
    
    </div>

        );
  }
export default Videos