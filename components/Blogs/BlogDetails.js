import {
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
} from "@/store/apiServices/apiServicesBlogs";
import styles from "./BlogDetails.module.css";
import Blog from "./Blog";
import Link from "next/link";

function BlogDetails(props) {

  const singleBlog = props.singleBlog;
  
  const { data: allBlogs } = useGetBlogPostsQuery();

  const similarBlogs = allBlogs?.filter(({slug})=> slug != props.slug);
  console.log("similarBlogs", similarBlogs);

  

  return (
    <>
      {singleBlog && (
        <>
          <div
            className={styles.banner}
            style={{
              background: `rgba(0, 0, 0, .8) url(${singleBlog[0]._embedded["wp:featuredmedia"][0].source_url})`,
            }}
          >
            <h2
              className={styles.banner_heading}
              dangerouslySetInnerHTML={{ __html: singleBlog[0].title.rendered }}
            ></h2>
          </div>

          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                <div
                  className={styles.blog_details}
                  dangerouslySetInnerHTML={{
                    __html: singleBlog[0].content.rendered,
                  }}
                ></div>
                </div>
                
                <div className="col-md-4">
                <h3 className={styles.similar_blogs_title}>Similar Blogs</h3>
                <div className={styles.similar_blogs}>                    
                  {similarBlogs?.map((blog, index) => {
                    return <Blog key={index} blog={blog} class="style_one" />;
                  })}
                  <Link className="btn btn_border_primary" href="/blog">View All Blogs</Link>
                </div>                
                </div>               
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default BlogDetails;
