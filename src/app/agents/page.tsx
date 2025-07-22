"use client"

import { useEffect, useState, KeyboardEvent } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import api from "@/services/api.service"
import { toast } from "sonner"
import { SoftBadge } from "@/components/ui/soft-badger"

interface Agent {
  id: string
  name: string
  agent_type: string
  agent_status: string
  auth_key: string
  platform: string
  tags: string[]
  data_processed: number
  last_activity_at: string
  created_at: string
  updated_at: string
  collection_interval: number
  last_ip_address?: string
  confirmDelete?: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
  const [newAgentData, setNewAgentData] = useState<Agent | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [form, setForm] = useState({
    name: "",
    agent_type: "",
    platform: "",
    collection_interval: "",
    tags: [] as string[],
    tagInput: "",
  })

  const addTag = () => {
    const newTag = form.tagInput.trim()
    if (newTag && !form.tags.includes(newTag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, newTag], tagInput: "" }))
    }
  }

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const fetchAgents = async () => {
    try {
      const res = await api.get<Agent[]>("/agents")
      setAgents(res.data.map((agent) => ({ ...agent, tags: agent.tags ?? [] })))
    } catch (err) {
      console.error("💥 erro ao buscar agents:", err)
      toast.error("Erro ao buscar agentes. Tente novamente.")
    }
  }

  const createAgent = async () => {
    try {
      const payload = {
        name: form.name,
        agent_type: form.agent_type,
        platform: form.platform,
        collection_interval: parseInt(form.collection_interval),
        tags: form.tags,
      }

      const res = await api.post("/agents", payload)
      setAgents((prev) => [...prev, res.data])
      setForm({ name: "", agent_type: "", platform: "", collection_interval: "", tags: [], tagInput: "" })
      setOpenDialog(false)
      setNewAgentData(res.data)
      setOpenSuccessDialog(true)
    } catch (err) {
      console.error("💥 erro ao criar agent:", err)
      toast.error("Erro ao criar agente. Verifique os dados e tente novamente.")
    }
  }

  const deleteAgent = async (id: string) => {
    try {
      await api.delete(`/agents/${id}`)
      setAgents((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error("💥 erro ao deletar agent:", err)
      toast.error("Erro ao deletar agente. Tente novamente.")
    }
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesTag = selectedTag ? agent.tags.includes(selectedTag) : true
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTag && matchesSearch
  })

  useEffect(() => {
    fetchAgents()
  }, [])

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()
  const formatDateTime = (dateStr: string) => new Date(dateStr).toLocaleString()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <TooltipProvider>
        <main className="flex flex-col items-center flex-grow px-4">
          <div className="w-full max-w-7xl mt-10 mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Agents</h1>
            <div className="flex gap-2">
              <Input
                placeholder="Search agents..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Register New Agent</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <Input
                      placeholder="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Select
                      value={form.agent_type}
                      onValueChange={(value) => setForm({ ...form, agent_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collection">Collection</SelectItem>
                        <SelectItem value="beacon">Beacon</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={form.platform}
                      onValueChange={(value) => setForm({ ...form, platform: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="combolist">combolist</SelectItem>
                        <SelectItem value="discord">discord</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={form.collection_interval}
                        onChange={(e) => setForm({ ...form, collection_interval: e.target.value })}
                        className="w-24 text-center"
                        placeholder="Interval (s)"
                      />
                      <span className="text-sm text-muted-foreground">seconds</span>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center border rounded px-2 py-1">
                      {form.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="text-xs text-red-400 hover:text-red-600"
                            type="button"
                            aria-label={`Remove tag ${tag}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        value={form.tagInput}
                        onChange={(e) => setForm({ ...form, tagInput: e.target.value })}
                        onKeyDown={handleTagKeyDown}
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-foreground"
                      />
                      <Button
                        onClick={addTag}
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        type="button"
                      >
                        Add
                      </Button>
                    </div>

                    <Button
                      onClick={createAgent}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Register Agent
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agent Registered 🎉</DialogTitle>
                  </DialogHeader>
                  {newAgentData && (
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Name:</strong> {newAgentData.name}
                      </p>
                      <p>
                        <strong>Type:</strong> {newAgentData.agent_type}
                      </p>
                      <p>
                        <strong>Platform:</strong> {newAgentData.platform}
                      </p>
                      <p>
                        <strong>Interval:</strong> {newAgentData.collection_interval}s
                      </p>
                      <p>
                        <strong>Tags:</strong> {newAgentData.tags.join(", ") || "—"}
                      </p>
                      <p>
                        <strong>Status:</strong> {newAgentData.agent_status}
                      </p>
                      <p>
                        <strong>Created At:</strong> {formatDateTime(newAgentData.created_at)}
                      </p>
                      <div
                        className="overflow-x-auto max-w-full bg-zinc-800 px-2 py-1 rounded mt-2 cursor-pointer select-none"
                        onClick={() => {
                          if (newAgentData?.auth_key) {
                            navigator.clipboard.writeText(newAgentData.auth_key)
                            toast.success("Authentication key successfully copied to clipboard.")
                          }
                        }}
                        title="Clique pra copiar"
                      >
                        <code className="text-xs break-all text-green-400">
                          {newAgentData?.auth_key}
                        </code>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {selectedTag && (
            <div className="mb-4">
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedTag(null)}>
                {selectedTag} <X className="ml-1 w-3 h-3" />
              </Badge>
            </div>
          )}

          <Card className="w-full max-w-7xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead className="whitespace-nowrap">Last IP</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="whitespace-nowrap">Created</TableHead>
                      <TableHead className="whitespace-nowrap">Updated</TableHead>
                      <TableHead className="whitespace-nowrap">Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgents.map((agent, index) => (
                      <TableRow key={agent.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{agent.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {agent.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{agent.agent_type}</TableCell>
                        <TableCell>
                          {["active", "blocked", "paused"].includes(agent.agent_status) ? (
                            <SoftBadge status={agent.agent_status as "active" | "blocked" | "paused"} />
                          ) : (
                            agent.agent_status
                          )}
                        </TableCell>
                        <TableCell>{agent.platform}</TableCell>
                        <TableCell className="whitespace-nowrap">{agent.last_ip_address ?? "—"}</TableCell>
                        <TableCell>{agent.data_processed}</TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-default">{formatDate(agent.created_at)}</span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-zinc-900 text-white border border-zinc-700 shadow-md">{formatDateTime(agent.created_at)}</TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-default">{formatDate(agent.updated_at)}</span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-zinc-900 text-white border border-zinc-700 shadow-md">{formatDateTime(agent.updated_at)}</TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {agent.last_activity_at ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-default">{formatDate(agent.last_activity_at)}</span>
                              </TooltipTrigger>
                              <TooltipContent className="bg-zinc-900 text-white border border-zinc-700 shadow-md">{formatDateTime(agent.last_activity_at)}</TooltipContent>
                            </Tooltip>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button size="icon" variant="outline" className="text-blue-500">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="icon" variant="outline" className="text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm">
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                              </DialogHeader>
                              <p className="text-sm text-muted-foreground">
                                Type <strong>{agent.name}</strong> to confirm.
                              </p>
                              <Input
                                placeholder="Type agent name to confirm"
                                onChange={(e) => {
                                  const value = e.target.value
                                  setAgents((prev) =>
                                    prev.map((a) =>
                                      a.id === agent.id ? { ...a, confirmDelete: value } : a
                                    )
                                  )
                                }}
                              />
                              <Button
                                variant="destructive"
                                className="w-full"
                                disabled={agent.confirmDelete !== agent.name}
                                onClick={() => deleteAgent(agent.id)}
                              >
                                Delete
                              </Button>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </TooltipProvider>
    </div>
  )
}
