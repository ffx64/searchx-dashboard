export type CombolistDataType = {
  id: number
  email: string
  username: string
  password: string
  domain: string
  metadata_id: string
}

export type CombolistMetadataType = {
  id: string
  source: string
  collected_at: string
  tags: string[]
  notes: string
}
