import { CombolistDataType, CombolistMetadataType } from "@/types/combolist.type"
import { toast } from "sonner"
import api from "@/services/api.service"

const fetch = async <T,>(url: string): Promise<T> => {
  const token = sessionStorage.getItem("token")
  const { data } = await api.get<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const searchX = async (
  search: string,
  searchType: keyof typeof searchOptions
): Promise<CombolistDataType[]> => {
  if (!search.trim()) return []

  try {
    const url = `/combolist/${searchOptions[searchType]}/${encodeURIComponent(search)}`
    const data = await fetch<CombolistDataType[]>(url)

    if (!Array.isArray(data)) {
      toast.error("No data found for the performed search.")
      return []
    }

    return data
  } catch (err) {
    console.error("Error searching combolist", err)
    toast.error("Error performing the search. Please try again.")
    return []
  }
}

export const getMetadataX = async (metadataId: string): Promise<CombolistMetadataType | null> => {
  try {
    const data = await fetch<CombolistMetadataType>(`/combolist/metadata/${metadataId}`)
    return data
  } catch (err) {
    toast.error("Error loading metadata.")
    return null
  }
}

export const searchOptions = {
  X: "data/search",
  username: "data/username",
  email: "data/email",
  password: "data/password",
  domain: "data/domain",
} as const
