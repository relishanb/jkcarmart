import '@/styles/globals.scss';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import store from '../store/index';
import Integrations from './integrations/integrations';
import BottomNavbar from '@/components/BottomNavbar/BottomNavbar';
import ScrollToTop from '@/components/ScrollToTop';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Integrations />
      <Provider store={store}>
        <ScrollToTop />
        <Component {...pageProps} />
        {router.pathname !== '/search' && <BottomNavbar />}
      </Provider>
    </>
  );
}
