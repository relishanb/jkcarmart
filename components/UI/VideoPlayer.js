import ReactPlayer from "react-player";

function VideoPlayer(){
return(
    <ReactPlayer
    url="https://youtu.be/U_rPY1WGoLI"
    width="100%"
    height="500px"
    playing
    playIcon={<button>Play</button>}
    light="https://i.stack.imgur.com/zw9Iz.png"
  />
);
}
export default VideoPlayer;