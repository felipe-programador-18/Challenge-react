import styles from './navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAutentication } from '../hook/useAuthentication'
import { useAuthValue } from '../managecontext/Authcontext'  

import FavoriteContext from '../managecontext/Anothercontext'
import { useContext } from 'react'

const Navbar = () => {
 
  const {user} = useAuthValue()
  const {logout}  = useAutentication()
  
  const {upvotesPostFavorites}  = useContext(FavoriteContext)
  
  return (<div>
    <nav className={styles.navbar} >
     <NavLink to='/' className={styles.brand} >
     Seg<span>Ware</span>  
     </NavLink> 
     {upvotesPostFavorites.length} 🖤
      
      
      <ul className={styles.links_list} >
       
        
        <li>
         <NavLink to='/' className={({isActive}) =>(isActive ? styles.active : '' ) } > Feeds</NavLink>     
        </li>
         
         {/* here i can very that user not stay loggin in the page */}
         {!user && (<>
          <li>
            <NavLink to='/signin' className={({isActive}) => (isActive ? styles.active : '' ) } >
             Sing-in
            </NavLink>     
          </li>
          
          <li>
            <NavLink to='/signup' className={({isActive}) => (isActive ? styles.active : '' ) } >
              Sing-up
            </NavLink>     
          </li>
           
         </>) }
          
        {user && ( <>
          <li>
          <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : '')}>
            New Feeds
          </NavLink>     
        </li>
        <li>
          <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : '' )}>
          Reaction
          </NavLink>     
        </li>

         </>)}  
             
  
        
        {/* if user it's logount he can logout */}
        {user && (
          <li>
           <button onClick={logout}   >Logout</button>    
          </li>
         )}
      
    
      </ul>
    </nav>
  
</div>
  )}

export default Navbar