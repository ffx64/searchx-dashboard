import { CombolistDataType, CombolistMetadataType } from "@/types/combolist.type"
import { toast } from "sonner"
import api from "@/lib/api"

export const SearchOptions = {
  X: "search",
  username: "username",
  email: "email",
  password: "password",
  domain: "domain",
} as const

export class CombolistService {
    private url = "http://localhost:8080/api/v1/combolist"

    async getAllMetadata(id: string): Promise<CombolistMetadataType[]> {
        try {
            const token = sessionStorage.getItem("token")
            
            const response = await api.get<CombolistMetadataType[]>(`combolist/metadata/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )

            if (!Array.isArray(response.data) || response.data.length === 0) {
                toast.error("No data found for the performed search.")
                return []
            }

            return response.data
        } catch (error) {
            console.error("Error fetching metadata:", error)
            toast.error("Failed to load metadata.")
            return []
        }
    }

    async getData(search: string, option: keyof typeof SearchOptions): Promise<CombolistDataType[]> {
        try {
            const token = sessionStorage.getItem("token")

            const response = await api.get<CombolistDataType[]>(`${this.url}/data/${SearchOptions[option]}/${encodeURIComponent(search)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
        
            if (!Array.isArray(response.data) || response.data.length === 0) {
                toast.error("No data found for the performed search.")
                return []
            }
        
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
            toast.error("Failed to load data.")
            return []
        }
    }
}