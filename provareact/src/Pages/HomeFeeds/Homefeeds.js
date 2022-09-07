import React, {useContext} from 'react'
import styles from './home.module.css'

import {Link} from 'react-router-dom'
import { useFecthingDocuments } from '../../hook/useFecthingDocuments' 

import FeedDetails from '../../component/Feedsdetails'
import FavoriteContext from '../../managecontext/Anothercontext'


const Feeds = () => {
   
  const {documents:posts, loading}  = useFecthingDocuments("posts")
  const {upvotesPostFavorites}  = useContext(FavoriteContext)
   
  

  const handSubmit = (e) => {
        e.preventDefault()    
  } 
    
    return(
    <div  className={styles.home}>
      <h3>Total de posts curtidos {upvotesPostFavorites.length} 🖤  </h3>

      <form onSubmit={handSubmit} className={styles.search_form} >
      
      </form>
      
      <div>
        {loading && <p>Carregando .....</p> }
        

        {posts && posts.map((post) => <FeedDetails key={post.id} post={post} /> ) }
          
        
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p> Não foram encontrados Feeds. </p>
            
            <Link to='/posts/create'  className='btn' > Crie seu Primeiro Feeds. </Link>
            </div>
        ) }
  
           
      </div>
    
    </div>
    )
}

export default Feeds