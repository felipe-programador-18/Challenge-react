import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useAutentication } from './hook/useAuthentication'; 

import Navbar from './component/Navbar';
import Footer from './component/Footer';


import Feeds from './Pages/HomeFeeds/Homefeeds';
import SingInLogin from './Singin/singin';
import SingupUser from './SingupUser/Singup';

import { AuthProvider } from './managecontext/Authcontext';
import { FavoriteProvider } from './managecontext/Anothercontext';
import CreateFeeds from './Pages/Createfeeds/Createfeeds';
import DashboardReaction from './Pages/ReactionDashboards/reaction';
import FeedIds from './Pages/FeedId/feed.id';



const favoritesKey = 'favorites'

function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAutentication()
  const loadingUser = user === undefined
  
  const [upvotesFavorites, setupvotesFavorites] = useState([])
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
     
    })
  },[auth])
   
  const loadingFavorites = () => {
    const saveUpvotes= JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setupvotesFavorites(saveUpvotes)
  }
  const updateFavoritePost= (user) => {
    const updateFavorited = [...upvotesFavorites]
    const favoritesIndex = upvotesFavorites.indexOf(user)
     
     if(favoritesIndex >= 0){
      updateFavorited.splice(favoritesIndex,1) 
     }else{
      updateFavorited.push(user)
     }
     window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorited))
     setupvotesFavorites(updateFavorited)
   }  
 
  useEffect(() => {
   loadingFavorites()
  },[])
 
  if(loadingUser){
    return <p>Loading ....</p>
  }


  return ( 
  <div className="App">
    <AuthProvider value={{user}}>   
      <FavoriteProvider value={{upvotesPostFavorites:upvotesFavorites,
      updateupvotesFavorites:updateFavoritePost }}>

       <BrowserRouter>
        <Navbar/>
         <div className='container' >
          <Routes>
          
          <Route path='/' element ={ <Feeds/> } /> 
          <Route path='/posts/:id' element={<FeedIds/>} /> 
          
          <Route path='/signup' element={ !user ? <SingupUser/>: <Navigate to='/' />  } />
          <Route path='/signin' element={!user ? <SingInLogin/> : <Navigate to='/'/>   }  />  
           
          <Route path='/posts/create' element={ user ? <CreateFeeds/> :  <Navigate to='/signin' /> }  /> 
          <Route path='/dashboard' element={ user ? <DashboardReaction/> : <Navigate to='/signin' /> } /> 

          </Routes>
         </div>
        <Footer/> 
      
       </BrowserRouter>
       </FavoriteProvider>
     </AuthProvider> 
  </div>
  
  );
}

export default App;
