import React, {useState} from 'react'
import styles from './home.module.css'

import { useNavigate, Link} from 'react-router-dom'


import { useFecthingDocuments } from '../../hook/useFecthingDocuments' 



import FeedDetails from '../../component/Feedsdetails'

const Feeds = () => {
   const [query, setQuery] = useState('')
   const {documents:posts, loading}  = useFecthingDocuments("posts")
     
   const navigate = useNavigate() 

   const handSubmit = (e) => {
        e.preventDefault()

       if(query){
        return navigate(`/search/?q=${query}`)
       }
    
    } 
    
    return(
    <div  className={styles.home}>
      <h1>Veja nossos postes mais recentes.</h1>

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