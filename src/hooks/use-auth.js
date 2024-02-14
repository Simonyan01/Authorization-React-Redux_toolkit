import { useSelector } from "react-redux"
import { selectAuthData } from "../features/auth/authSlice"

export function useAuth() {
  const { email, token, id } = useSelector(selectAuthData)

  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}
