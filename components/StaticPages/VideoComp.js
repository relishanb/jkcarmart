import React, {useState} from 'react';
import Image from 'next/image';
import styles from './Videos.module.scss';
import { FaPlay } from 'react-icons/fa';

import Modal from '../UI/Modal';

import ReactPlayer from 'react-player'


const VideoComp = (props) => {
  const { link, title, img, duration } = props;
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="col-lg-4">
        <div className={styles.help_video}>
          <div className={styles.video}>
            <img src={img} alt="Sell Car" />
            <button className={styles.play_btn} onClick={openModal}>
              <div
                title="Play Video"
                className={`${styles.video_icon} ${styles.lvideo}`}
              >
                <FaPlay />
              </div>
            </button>

            {modal && (
              <Modal className={styles.model} title={title} closeModel={openModal}>
                <div className={styles.modal__video_align}>
                  <ReactPlayer
                    controls={true}
                    playing={true}
                    url={link}
                    width="100%"
                    height="100%"
                  />
                </div>
              </Modal>
            )}
          </div>
          <div className={styles.help_title}>
            <h4>{title}</h4>
            <p>duration: {duration}</p> 
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoComp;
