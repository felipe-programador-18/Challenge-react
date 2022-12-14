import {useState, useEffect,useReducer} from 'react'
import { db }  from '../firebase/managefirebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'


const initialState = {
    loading: null,
    error: null
}


const insertReducer = (state, action) => {
   switch(action.type){
    case "LOADING":
     return {loading:true, error:null}
    case "INSERT_DOC":
     return {loading:false, error: null}
    case "ERROR":
     return {loading:false, error: action.payload }   
    default:   
    return state;
   }
    

}


export const useInsertDocument = (docCollection) => {
  const [response, dispatch]= useReducer(insertReducer, initialState)
 
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const checkBeforeIsCancelled = (action) => {
    if(!cancelled){
        dispatch(action)
    }
  }
  
 
  const insertDocument = async (document) => {
    checkBeforeIsCancelled({
        type:"LOADING",
      })

    try {
      const newDocument =  {...document, createdAT: Timestamp.now() 
       }
      const insertedDocument  = await addDoc(
        collection(db,docCollection),
        newDocument
        )
        checkBeforeIsCancelled({
            type:"INSERT_DOC",
            payload: insertedDocument
        })

    } catch (error) {
        checkBeforeIsCancelled({
            type:"ERROR",
           payload: error.message
        })
    } 
  } 

   useEffect(() => {
     return () =>  setCancelled(true)
   },[]);
  
   return{ insertDocument,response }

}