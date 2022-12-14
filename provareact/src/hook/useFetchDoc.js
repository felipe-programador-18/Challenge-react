import{useState, useEffect} from 'react'

import { db }  from '../firebase/managefirebase'
import {getDoc, doc} from 'firebase/firestore'




export const useFecthingDocument =(docCollection,id) =>{
  
  const [document,setDocument] = useState(null)
  const [error, setError] = useState(null)  
  const [loading, setLoading] = useState(null)


 
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    const LoadDocument = async () => {
      if(cancelled) return;

    try {
        const docRef = await doc(db, docCollection,id) 
        const snapDocs = await getDoc(docRef)
        console.log('this snapdocs bring up what ?',snapDocs)
        
        setDocument(snapDocs.data())
        setLoading(false)
    } catch (error) {
       console.log(error)
       setDocument(error.message)
       
       setDocument(true)
    }   
 
   }
        LoadDocument();
  },[docCollection,cancelled, id]);
       
 
     useEffect(() => {
       return () => setCancelled(true)
     },[])
     
     return {document, loading, error };
 };
 
