import Blog from "./Blog";
import Link from "next/link";

function HomePageBlogs(props){   
  
    return(
        <>

<div className="sec-heading"><h2>Latest <span>Blogs</span></h2></div>

<div className={`row`}>

{

props.blogs?.map((blog,index)=>{

  return(<div className="col-md-3" key={index}>
        
        <Blog blog={blog} class="style_one" />

      </div>)      
      }) 

} 

<div className="col-md-12 text-center mt-24"><Link className="btn btn_border_primary display-inline-block" href="/blog">View All Blogs</Link></div>

</div>
        
        </>
    )
   
}
export default HomePageBlogs;