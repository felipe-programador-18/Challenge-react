import React,{useState, useContext} from 'react'
import styles from './createfeeds.module.css'
import { useNavigate } from 'react-router-dom'

import FavoriteContext from '../../managecontext/Anothercontext'

import  { useAuthValue } from '../../managecontext/Authcontext'
import  { useInsertDocument } from '../../hook/useInsertDocuments'


const CreateFeeds = () => {
   const[title, setTitle] = useState("")
   const[body, setBody] = useState("")
  
   const[formError, setFormError] = useState("")
    
   const { insertDocument,response } = useInsertDocument("posts") 
   const {user} =useAuthValue()
   
   const { updateupvotesFavorites, upvotesPostFavorites} = useContext(FavoriteContext)
   const upvotes = upvotesPostFavorites.includes(user) ? "💛" : "🖤"
    console.log('testing',upvotes)

   console.log('user about create', user)
   const navigate = useNavigate()
  
   //const {createUser,error:authError, loading} = useAutentication()
   const handlingSubmit = (e) => {
    e.preventDefault()
    setFormError("")


    if(!title || !body){
      setFormError("Por favor, preencha todos os campos.")
    }

 
    if(formError) return;
    

    insertDocument({
     title, 
     body ,
     uid:user.uid,
     createdBy: user.displayName,
    })
   
    navigate("/")   
  
   }

   const UpdatesFeedsPost= () =>{
    updateupvotesFavorites(user)
  }  

   return( <div className={styles.create_post} >
       <h2>Criar post</h2>
       <p>Escreva o que quiser e compartilhe o seu conhecimento.{upvotes} </p>

   
        <form onSubmit={handlingSubmit}>
          <label >
            <span>Descrição de Post:</span>
            <input type='text' 
            name='Title' 
            required 
            placeholder='Pense num boa descrição...' 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}  />
          </label>
          
          
           
          <label>
           <span>Conteúdo:</span>  
           <textarea name="body" 
            required
            value={body}
            placeholder="Insira o conteúdo do post." 
            onChange={(e) => setBody(e.target.value) }  ></textarea>
          
          </label> 
         <button onClick={UpdatesFeedsPost} > 
          {upvotes}
         </button>
         
    
          {!response.loading && <button className='btn' >Cadastrar</button> }
           
           {response.loading && (<button className='btn' disabled >
            Aguarde .... 
           </button>) }

         {response.error && <p className='error' > {response.error} </p>}  
         {formError && <p className='error' > {formError} </p>}  

           
        
        </form>
      
   </div> )
}

export default CreateFeeds