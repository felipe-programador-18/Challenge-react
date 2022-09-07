import React,{useContext} from 'react'
import styles from './reaction.module.css'
import { Link } from 'react-router-dom'

import { useAuthValue } from '../../managecontext/Authcontext'
import { useFecthingDocuments } from '../../hook/useFecthingDocuments'

import FavoriteContext from '../../managecontext/Anothercontext'

const DashboardReaction = () => {
   
    const {upvotesPostFavorites, updateupvotesFavorites } = useContext(FavoriteContext) 
    
   
    const{user  } = useAuthValue()
    const uid = user.uid 
   
    const heart = upvotesPostFavorites.includes(user) ? "💛" : "🖤"
    console.log('testing', heart)

    const {documents:posts, loading} = useFecthingDocuments('posts', null, uid)


    if(loading){
       <p>Carregando Posts .....</p>
    }
    
    
    const UpdateFavotires = () =>{
        updateupvotesFavorites(user)
    }



    return(<div className={styles.dashcontainer} >

     <h2>Dashboards!!</h2>
  
     <p>Gerencie os seus posts!</p>
     <button onClick={UpdateFavotires}>
                   {heart}
               </button>
       
       {posts && posts.length === 0 ? ( 
       <div className={styles.nopost} > 
        <p>Nenhum post encontrado aqui..</p>
        <Link to={'/posts/create'} className='btn' >Criar Primeiro post.
      
        </Link>  
       </div>  )  
        : 
        (<> 
          <div className={styles.post_header} > 
            <span>Título</span>
            <span>Ações</span>
          </div>  
          
           {posts && posts.map((post) => ( <div key={post.id} className={styles.post_row} >
           <p>{post.title}</p>
          
           <div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'  >Ver</Link>

        
           </div>
         </div>)
            )}
        </>) }
         

    </div>)
}

export default DashboardReaction