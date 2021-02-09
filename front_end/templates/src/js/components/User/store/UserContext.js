import React from "react"
import { useLocalStore } from "mobx-react"
import { createUserStore } from "./UserStore"


const UserContext = React.createContext(null)

export const UserStoreProvider = ({ children }) => {
    const store = useLocalStore(createUserStore)
    return (
        <UserContext.Provider value={store}> 
            {children} 
        </UserContext.Provider>
    )
}

export const useUserStore = () => React.useContext(UserContext)
