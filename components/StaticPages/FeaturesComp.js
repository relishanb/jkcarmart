import React from 'react';
import Image from 'next/image';
import styles from './About.module.scss';


const FeaturesComp=(props)=>{
    const {id, title,img} = props;

    const clickHandler = (keyID) => {
      props.onChange(keyID);
    };
   
return(
<>

<div className='col-lg-4'>
    <div id={id} className={`${styles.features_item} ${props.selectedId === props.id ? "active" : ""}`}
    onClick={(e) => {
      clickHandler(props.id, e);
      }}>
                      <div className={styles.features_icons}>
                        <div className={styles.icon_circle}>
                          <a className={styles.et_hero_tab} onClick={props.scrollDown}>
                            <Image src={img} alt='Icon'/>
                          </a>
                        </div>
                      </div>
                      <h3><a  className={styles.features_title} onClick={props.scrollDown} >{title}</a></h3>
   </div>
</div>


</>

)

    }
export default FeaturesComp;