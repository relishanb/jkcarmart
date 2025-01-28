import '@/styles/globals.scss'

import { Provider } from 'react-redux';
import store from '../store/index';

import Integrations from './integrations/integrations';
import { ToastContainer } from 'react-toastify';
import BottomNavbar from '@/components/BottomNavbar/BottomNavbar';
import ScrollToTop from '@/components/ScrollToTop';

export default function App({ Component, pageProps }) {
  return (<>
  <Integrations />  
  <Provider store={store}>
    <ScrollToTop/>
    <Component {...pageProps} />
    <BottomNavbar/>
    </Provider>
  </>)
}
