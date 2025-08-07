import axios, { AxiosError, AxiosRequestConfig } from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
})


let isRefreshing = false

type FailedRequest = {
  resolve: (value?: unknown) => void
  reject: (error: unknown) => void
}

let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token)
  })
  failedQueue = []
}

// ✅ Interceptor de request: injeta token automaticamente
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token")
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean }

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            if (typeof token === "string") {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              }
            }
            return api(originalRequest)
          })
          .catch(error => Promise.reject(error))
      }

      isRefreshing = true

      const refreshToken = sessionStorage.getItem("refresh_token")

      if (!refreshToken) {
        sessionStorage.clear()
        window.location.href = "/"
        return Promise.reject(err)
      }

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          null,
          {
            headers: {
              "Refresh-Token": refreshToken,
            },
            withCredentials: true,
          }
        )

        const newToken = data.access_token
        sessionStorage.setItem("token", newToken)

        processQueue(null, newToken)

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        }

        return api(originalRequest)
      } catch (error) {
        processQueue(error, null)
        sessionStorage.clear()
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
