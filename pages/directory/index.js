  import FrontPage from '@/components/Directory/userInterface/FrontPage';
import MoreInfo from '@/components/Directory/userInterface/MoreInfo';
import SearchResult from '@/components/Directory/userInterface/SearchResult';
import Layout from '@/components/Layout/Layout';
import Head from 'next/head'
import { useEffect, useState } from 'react';
  
  
  const PageDirectory = () => {
  
    const [currentPage, setCurrentPage] = useState("frontPage");
  
    useEffect(() => {
      localStorage.setItem('currentPage', currentPage);
      console.log("Stored Page:", currentPage); 
      if (currentPage) {
        setCurrentPage(currentPage);
      }
    }, []);
  
    const handleNextClick = (nextPage) => {
      setCurrentPage(nextPage);
      localStorage.setItem('currentPage', nextPage);
    };
  
    const renderComponent = () => {
      switch (currentPage) {
        case "frontPage":
          return (
            <FrontPage
              onNextClick={() => setCurrentPage("searchResult")}
           
            />
          );
          case "searchResult":
          return (
            <SearchResult
            onNextClick={() => setCurrentPage("moreInfo")}
              onBackClick={() => setCurrentPage("frontPage")}
            />
          );
        case "moreInfo":
          return (
          <MoreInfo 
          // onNextClick={() => setCurrentPage("ApplicationForm")}
          // onSaveAndCloseClick={() => setCurrentPage("Jobs")} 
          />
          );
       
  
           
        default:
          return null;
      }
    };
  
    return (
  
  <>
  
  <Head>
      <title>JK CarMart - Directory</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Nunito:700,600,500,400&display=swap" rel="stylesheet"></link>
    </Head>
  
      <div activePage="Jobs">
      <Layout>
     
      {renderComponent()}
     
      </Layout>
          
      
  
      </div>
  
  </>
  
    );
  };
  
  export default PageDirectory;
  
