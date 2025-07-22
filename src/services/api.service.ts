import axios, { AxiosError, AxiosRequestConfig } from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
})

let isRefreshing = false

type FailedRequest = {
  resolve: (value?: unknown) => void
  reject: (error: unknown) => void
}

let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  console.log("🔥 processQueue - token:", token, "error:", error)
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    console.log("💥 interceptor catch - error:", err)

    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean }

    if(err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        console.log("🔁 Token refresh already in progress...")
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            console.log("🔓 Retrying original request with new token:", token)
            if (typeof token === "string") {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              }
            }
            return api(originalRequest)
          })
          .catch(error => {
            console.log("🚫 Failed queued request:", error)
            return Promise.reject(error)
          })
      }

      isRefreshing = true

      const refreshToken = sessionStorage.getItem("refresh_token")
      const token = sessionStorage.getItem("token")

      console.log("🗝️ Stored tokens:", { refreshToken, token })

      if (!refreshToken || !token) {
        console.log("❌ Tokens missing. Redirecting to login.")
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("token")
        window.location.href = "/"
        return Promise.reject(err)
      }

      try {
        console.log("🔄 Sending refresh request...")
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          null,
          {
            headers: {
              "Refresh-Token": refreshToken,
              "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )

        console.log("✅ Token refreshed successfully:", data.access_token)
        sessionStorage.setItem("token", data.access_token)

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.access_token}`,
        }

        processQueue(null, data.access_token)

        return api(originalRequest)
      } catch (error) {
        console.log("💀 Error refreshing token:", error)
        processQueue(error, null)
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("token")
        window.location.href = "/"
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)

export default api
