import styles from './PaginationViewMore.module.css';
function PaginationViewMore(props){
return(    
    <div className={styles.view_more}>
      <div className={styles.show_count}>Showing {props.activeRecords} of {props.totalRecords} {props.text}</div>
      {props.activeRecords < props.totalRecords && 
      <div className={styles.show_more}>
        <a onClick={props.onClick} className="btn btn_border_primary">
         Show More {props.text}
        </a>
      </div>
    }
    </div>
)
}

export default PaginationViewMore;