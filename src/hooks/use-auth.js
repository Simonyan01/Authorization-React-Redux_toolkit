import { selectData } from "features/auth/sign_up/signUpSlice"
import { useSelector } from "react-redux"

export function useAuth() {
  const { email, token, id } = useSelector(selectData)

  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}
