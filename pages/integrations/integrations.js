import Script from "next/script";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

function Integrations() {
  useEffect(() => {
    const interval = setInterval(() => {
      const zohoWidget = document.querySelector('#zsiq_float');
      if (zohoWidget && isMobile) {
        zohoWidget.style.bottom = '70px'; 
        zohoWidget.style.right = '8px'; 
        clearInterval(interval);
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QZ57DV0TGT"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-QZ57DV0TGT');
        `}
      </Script>

      <Script>
        {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PRJLCB7G');

    `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PRJLCB7G"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      {/* <!-- Meta Pixel Code --> */}
      <Script>
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '735340171686233');
fbq('track', 'PageView');

  `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=735340171686233&ev=PageView&noscript=1"
        />
      </noscript>
      {/* <!-- End Meta Pixel Code --> */}

      <Script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.$zoho=window.$zoho || {};
              $zoho.salesiq=$zoho.salesiq||{ready:function(){}};
              var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;
              s.src="https://salesiq.zohopublic.com/widget?wc=siqb9f628bb8438a3b3fea194270e90a8db8764f6bb229c8201e3e6c5efa4e0d483";
              t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
            `,
          }}
        />

    </>
  );
}

export default Integrations;