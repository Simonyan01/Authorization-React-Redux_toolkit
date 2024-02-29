import { useContext } from "react"
import { UserContext } from "./createContext"

export const useAuth = () => useContext(UserContext)
