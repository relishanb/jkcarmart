import Link from "next/link";
import CardLight from "../UI/CardLight";
import styles from "./Blog.module.css";
import { FaRegCalendarAlt,FaBookReader } from "react-icons/fa";

function Blog(props) {

  //console.log(props);

  const date =   new Date(props.blog.date);
  const postDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

  const blogClass = props.class;

  return(
        <div className={`${styles.blog} ${styles[blogClass]}`}>
          <div className={styles.col_left}>
          <img className={styles.image}
            src={
              props.blog._embedded["wp:featuredmedia"][0].media_details.sizes
                .medium_large.source_url
            }
          />
          {/* <div className={styles.date}>
                <FaRegCalendarAlt /> {postDate}
              </div> */}
          </div>
          <div className={styles.col_right}>
            <h3 className={styles.title} dangerouslySetInnerHTML={{__html:props.blog.title.rendered}}></h3>
         
            <div className={styles.text} dangerouslySetInnerHTML={{__html:props.blog.excerpt.rendered}}></div>           
            <Link href={`/blog/${props.blog.slug}`} className={styles.readMore}>
             
              Read Full Blog
              </Link>
          </div>
        </div>
     )
}
export default Blog;
