"use client"

import { useState, useRef, useEffect } from "react"
import { AlertTriangle, FileIcon, FileText, Filter, Globe, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CombolistDataType, CombolistMetadataType } from "@/types/combolist.type"
import { CombolistService, SearchOptions } from "@/services/combolist.service"

export default function CombolistPage() {
  const combolist = new CombolistService()

  const [search, setSearch] = useState("")
  const [searchType, setSearchType] = useState<keyof typeof SearchOptions>("X")
  const [results, setResults] = useState<CombolistDataType[]>([])
  const [searched, setSearched] = useState(false)
  const [metadataMap, setMetadataMap] = useState<Record<string, CombolistMetadataType | null>>({})
  const [loadingMetadataId, setLoadingMetadataId] = useState<string | null>(null)
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)

  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverCount = useRef(0)

  const [dataSearchCount, setDataSearchCount] = useState(0);

  const handleSearch = async () => {
    const data = await combolist.getData(search, searchType)
    setResults(data)
    setSearched(true)
    setDataSearchCount(data.length)
  }

  const handleMetadataClick = async (metadataId: string) => {
    if (openPopoverId === metadataId) {
      setOpenPopoverId(null)
      return
    }
    if (!metadataMap[metadataId]) {
      setLoadingMetadataId(metadataId)
      const metadataArray = await combolist.getAllMetadata(metadataId)
      const metadata = Array.isArray(metadataArray) ? metadataArray[0] : metadataArray
      setMetadataMap(prev => ({ ...prev, [metadataId]: metadata || null }))
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
    <div className="space-y-6 bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-muted rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider">DATA CORRESPONDING TO THE RESEARCH</p>
              <p className="text-2xl font-bold text-white font-mono">{dataSearchCount}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider">ACTIVE SOURCES</p>
              <p className="text-2xl font-bold text-chart-2 font-mono">89</p>
            </div>
            <Globe className="w-8 h-8 text-chart-2" />
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg lg:col-span-2 p-4 border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search intelligence reports..."
            className="pl-10 bg-background text-white placeholder-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      {/* Result Table */}
      <Card className="rounded-lg bg-muted w-full max-w-full">
        <CardContent className="p-1">
          {!searched && (
            <p className="text-center text-gray-400 select-none">Enter a term and press search or Enter</p>
          )}

          {searched && results.length === 0 && (
            <p className="text-center text-red-500 select-none">No results found for the searched term.</p>
          )}

          {searched && results.length > 0 && (
            <div className="max-h-[650px] overflow-y-auto rounded-md">
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
                  {results.map((item, idx) => (
                    <TableRow key={item.id} className="hover:bg-muted/50 text-center">
                      <TableCell>{idx + 1}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
