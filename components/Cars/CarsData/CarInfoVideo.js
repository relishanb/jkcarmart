import Card from "@/components/UI/Card";
import styles from "./CarInfo.module.css";
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { useState } from "react";
function CarInfoVideo(props) {

  const [isVideoPlaying,setIsVideoPlaying] = useState(false);
  function playVideo(){
    console.log("isVideoPlaying",isVideoPlaying);
    setIsVideoPlaying(true);
  }

  return (
    <div className={`${styles.ad_details} ${props.width=="Full"?styles.full_width:""}`}>
      <Card className={styles.video_card}>
        <div className={styles.ad_image}>    


{

isVideoPlaying ? <div className={styles.video_container}>
<ReactPlayer          
          playing={true}
          controls={true}
          url={props.video.link}
          width="100%"
          height="100%"
        />
</div> : <div className={styles.thubnail_container}>
        <img src={props.video.img}  />
        <div
              title="Play Video"
              className={styles.video_play_icon}
              onClick={playVideo}
            >
              <FaPlay />
            </div>
        </div>
}

        

        
        
        
        
        </div>
        <div className={styles.video_card_body}>
                <h3>{props.video.title}</h3>
        </div>
      </Card>
    </div>
  );
}
export default CarInfoVideo;
