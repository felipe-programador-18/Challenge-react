
import styles  from './feeds.module.css'
import { Link } from 'react-router-dom'


const FeedDetails = ({post}) => {
  

return (<div className={styles.post_detail} >
     <h2>{post.title}</h2>
     <p className={styles.create_by} > {post.createdBy} </p>
      
   <div className={styles.tags} >

   </div>
   <Link to={`/posts/${post.id}`}  className='btn btn-outline'> Ler. </Link>
    </div>  )

}


export default FeedDetails