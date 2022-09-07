import React,{useContext} from 'react'
import styles from './feed.module.css'

import {useParams} from 'react-router-dom'
import { useFecthingDocument } from '../../hook/useFetchDoc'
import { useAuthValue } from '../../managecontext/Authcontext'
import FavoriteContext from '../../managecontext/Anothercontext'

const FeedIds = () => {
   const {id} = useParams()
   const {document:post, loading} = useFecthingDocument("posts",id)

   const{user} = useAuthValue()
  
  
   const {upvotesPostFavorites, updateupvotesFavorites } = useContext(FavoriteContext) 
  
   const heart = upvotesPostFavorites.includes(user) ? "💛" : "🖤"
   console.log('testing', heart)
   
   const UpdateFavotires = () =>{
    updateupvotesFavorites(user)
   }
   
   return(<div className={styles.post_container} >
         {loading && <p>carregando post ....</p>}
       <h1>posts </h1>
       <button onClick={UpdateFavotires}>
                   {heart}
               </button>
       {post && (<>
         <h3> {post.title} </h3>
         <p>{post.body}</p>
       </>) }
      
       
    </div> )
}

export default FeedIds