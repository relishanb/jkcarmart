import Card from "@/components/UI/Card";
import styles from "./Home.module.scss";
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { useState } from "react";
function AppInfoVideo(props) {

  const [isVideoPlaying,setIsVideoPlaying] = useState(false);
  function playVideo(){
    console.log("isVideoPlaying",isVideoPlaying);
    setIsVideoPlaying(true);
  }

  return (
    
      <Card className={styles.video_card}>
         


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

        

        
        
        
        
 
    
      </Card>
    
  );
}
export default AppInfoVideo;
