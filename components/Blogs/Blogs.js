import styles from "./Blogs.module.css"
import Blog from "./Blog";

function Blogs(props){

    //console.log("props",props);

    return(

      <>

<div className={styles.banner}>
            <h1 className={styles.banner_heading}><span>Car Market Insights</span> : Read Now!</h1>
          </div> 

        <section className="bg_color">
        <div className="container">     


<div className={"row"}>

<div className="col-md-8">

{

props.blogs?.map((blog,index)=>{
  return(<Blog key={index} blog={blog} class="style_two" />)      
      }) 

} 

</div>

</div>
        
</div>
      </section>

      </>
      
    )
   
}
export default Blogs;