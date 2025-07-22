"use client"

import { FileIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { CombolistDataType, CombolistMetadataType } from "@/types/combolist.type"
import { getMetadataX, searchOptions, searchX } from "@/services/combolist.service"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
  const [search, setSearch] = useState("")
  const [searchType, setSearchType] = useState<keyof typeof searchOptions>("X")
  const [results, setResults] = useState<CombolistDataType[]>([])
  const [searched, setSearched] = useState(false)
  const [metadataMap, setMetadataMap] = useState<Record<string, CombolistMetadataType | null>>({})
  const [loadingMetadataId, setLoadingMetadataId] = useState<string | null>(null)
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)

  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverCount = useRef(0)

  const handleSearch = async () => {
    const data = await searchX(search, searchType)
    setResults(data)
    setSearched(true)
  }

  const handleMetadataClick = async (metadataId: string) => {
    if (openPopoverId === metadataId) {
      setOpenPopoverId(null)
      return
    }
    if (!metadataMap[metadataId]) {
      setLoadingMetadataId(metadataId)
      const metadata = await getMetadataX(metadataId)
      setMetadataMap(prev => ({ ...prev, [metadataId]: metadata }))
      setLoadingMetadataId(null)
    }
    setOpenPopoverId(metadataId)
  }

  const scheduleClose = () => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
    popoverTimeout.current = setTimeout(() => {
      if (hoverCount.current <= 0) setOpenPopoverId(null)
    }, 150)
  }

  const cancelClose = () => {
    if (popoverTimeout.current) {
      clearTimeout(popoverTimeout.current)
      popoverTimeout.current = null
    }
  }

  useEffect(() => {
    const onScroll = () => {
      if (openPopoverId) setOpenPopoverId(null)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [openPopoverId])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <div
          className={`flex flex-col items-center justify-center transition-all duration-300 ease-out w-full max-w-7xl ${
            searched ? "mb-8 mt-8" : "h-[70vh]"
          }`}
        >
          <div className="flex w-full max-w-xl gap-0 items-center">
            <div className="w-28">
              <Select
                value={searchType}
                onValueChange={val => setSearchType(val as keyof typeof searchOptions)}
              >
                <SelectTrigger
                  className="w-full h-10 rounded-r-none border-r-0 border-input"
                  aria-label="Search type"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(searchOptions).map(key => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              type="text"
              placeholder={`search by ${searchType}`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              className="flex-1 h-10 rounded-l-none border border-input border-l-0"
              aria-label="Search field"
            />
          </div>

          {searched && results.length === 0 && (
            <p className="mt-2 text-center text-sm text-red-500 select-none">
              No results found for the searched term.
            </p>
          )}
        </div>

        {searched && results.length > 0 && (
          <div
            className="shadow-xl rounded-2xl flex justify-center"
            style={{ width: 1200 }}
          >
            <Card className="rounded-2xl border-none shadow-none w-full">
              <CardContent className="p-4">
                <div className="max-h-[600px] overflow-y-auto rounded-md border w-full">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-center">#</TableHead>
                        <TableHead className="whitespace-nowrap text-center">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-center">Username</TableHead>
                        <TableHead className="whitespace-nowrap text-center">Password</TableHead>
                        <TableHead className="whitespace-nowrap text-center">Domain</TableHead>
                        <TableHead className="whitespace-nowrap text-center">Metadata</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((item, index) => (
                        <TableRow key={item.id} className="hover:bg-muted/50 text-center">
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.username}</TableCell>
                          <TableCell>{item.password}</TableCell>
                          <TableCell>{item.domain}</TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <button
                                  className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
                                  onClick={() => handleMetadataClick(item.metadata_id)}
                                  aria-label="Show metadata"
                                  onMouseEnter={() => {
                                    hoverCount.current++
                                    cancelClose()
                                  }}
                                  onMouseLeave={() => {
                                    hoverCount.current--
                                    scheduleClose()
                                  }}
                                >
                                  <FileIcon className="w-5 h-5" />
                                </button>
                              </PopoverTrigger>

                              {openPopoverId === item.metadata_id && (
                                <PopoverContent
                                  align="end"
                                  side="bottom"
                                  className="max-w-sm max-h-64 overflow-y-auto text-sm space-y-2 p-4"
                                  style={{ minWidth: 280 }}
                                  onMouseEnter={() => {
                                    hoverCount.current++
                                    cancelClose()
                                  }}
                                  onMouseLeave={() => {
                                    hoverCount.current--
                                    scheduleClose()
                                  }}
                                  onWheel={() => setOpenPopoverId(null)}
                                >
                                  {loadingMetadataId === item.metadata_id ? (
                                    <p className="text-muted-foreground">loading...</p>
                                  ) : metadataMap[item.metadata_id] ? (
                                    <>
                                      <p>
                                        <strong>source:</strong> {metadataMap[item.metadata_id]?.source || "—"}
                                      </p>
                                      <p>
                                        <strong>collected at:</strong>{" "}
                                        {metadataMap[item.metadata_id]?.collected_at
                                          ? new Date(`1970-01-01T${metadataMap[item.metadata_id]!.collected_at}`).toLocaleTimeString()
                                          : "—"}
                                      </p>
                                      <p>
                                        <strong>tags:</strong>{" "}
                                        {metadataMap[item.metadata_id] && metadataMap[item.metadata_id]?.tags?.length
                                          ? metadataMap[item.metadata_id]!.tags.join(", ")
                                          : "—"}
                                      </p>
                                      <p>
                                        <strong>notes:</strong> {metadataMap[item.metadata_id]?.notes || "—"}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-red-500">Failed to load metadata data.</p>
                                  )}
                                </PopoverContent>
                              )}
                            </Popover>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
