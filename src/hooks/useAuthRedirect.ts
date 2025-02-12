
import AuthStateManager from "@/lib/axios/auth-state"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useAuthRedirect(loginPath = "/login") {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = AuthStateManager.subscribe(() => {
      navigate(loginPath)
    })

    return () => {
      unsubscribe()
    }
  }, [navigate, loginPath])
}

