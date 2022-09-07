
import React from 'react'

const FavoriteContext = React.createContext({
    upvotesPostFavorites: [],
    updateupvotesFavorites : (id) => null
})
export const FavoriteProvider = FavoriteContext.Provider
export default FavoriteContext