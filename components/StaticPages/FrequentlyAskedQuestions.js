import Accordion from './Accordion';
import { accordionData,faqDataBuyCar,faqDataSellCar,faqDataDealers } from './FaqData';
import styles from './Faq.module.scss';
 
const FrequentlyAskedQuestions = () => {
 
  return (

<section className="first_section">
      <div className='container'>
      <div className="sec-heading">
          <h2>
          <span>Frequently</span> Asked Questions
          </h2>
        </div>    

        
        <div className={styles.accordion}>
                      {accordionData.map(({ title, content }, index) => (
                                  <Accordion key={index} title={title} content={content} />
        ))}
      </div>

        <h3>Buying Cars in Jammu</h3>
        <div className={styles.accordion}>
                      {faqDataBuyCar.map(({ title, content }, index) => (
                                  <Accordion key={index} title={title} content={content} />
        ))}
      </div>    

      <h3>Selling Cars in Jammu</h3>
        <div className={styles.accordion}>
                      {faqDataSellCar.map(({ title, content }, index) => (
                                  <Accordion key={index} title={title} content={content} />
        ))}
      </div> 

      <h3>Dealing with Dealers</h3>
        <div className={styles.accordion}>
                      {faqDataDealers.map(({ title, content }, index) => (
                                  <Accordion key={index} title={title} content={content} />
        ))}
      </div> 

      </div>      
    </section>


   
    );
  }
 
export default FrequentlyAskedQuestions