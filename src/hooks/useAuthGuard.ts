import { useEffect } from "react"
import { useRouter } from "next/navigation" // ajusta conforme teu router

export function useAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem("token")

      if (!token) {
        router.push("/")

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("last_login")

        return
      }
    }

    checkToken()
  }, [router])
}
