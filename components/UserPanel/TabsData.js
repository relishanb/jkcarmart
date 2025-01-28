import { FaRegPlusSquare, FaEdit, FaHeart, FaUserAlt, FaEye, FaSignInAlt } from 'react-icons/fa';
export const TabsData = [
  {
    id:'PostedAds', 
    icon: <FaEdit />, 
    text: 'Posted Ads'    
  },
  {
    id:'PostAd', 
    icon: <FaRegPlusSquare />, 
    text: 'Post Ad'
  },
  {
    id:'FavouriteAds',
    icon: <FaHeart />,
    text: 'Shortlisted Cars'
  },
  {
    id:'EditProfile', 
    icon: <FaUserAlt />, 
    text: 'Edit Profile' 
  }, 
  {
    id:'Logout', 
    icon: <FaSignInAlt />, 
    text: 'Logout' 
  }
];

