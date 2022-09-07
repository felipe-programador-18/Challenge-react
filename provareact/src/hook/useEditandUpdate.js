import {useState, useEffect,useReducer} from 'react'
import { db }  from '../firebase/managefirebase'
import { updateDoc, doc } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}


const UpdatedatesReducer = (state, action) => {
   switch(action.type){
    case "LOADING":
     return {loading:true, error:null}
    case "UPDATE_DOC":
     return {loading:false, error: null}
    case "ERROR":
     return {loading:false, error: action.payload }   
    default:   
    return state;
   }
    

}


export const useUpdateDocument = (docCollection) => {
  const [response, dispatch]= useReducer(UpdatedatesReducer, initialState)
 
  const [cancelled, setCancelled] = useState(false)

  const checkBeforeIsCancelled = (action) => {
    if(!cancelled){
        dispatch(action)
    }
  }
  

  const UpdateMoreDocumet = async (id, data) => {
    checkBeforeIsCancelled({
        type:"LOADING",
      })

    try {
     const docRef = await doc(db,docCollection, id);
     const updateDocmore =  await updateDoc(docRef,data)
     
      checkBeforeIsCancelled({
            type:"UPDATE_DOC",
            payload:updateDocmore
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
  
   return{ UpdateMoreDocumet,response }

}