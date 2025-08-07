"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, MapPin, Clock, Shield, ChevronsLeftRightEllipsis, EthernetPort } from "lucide-react"
import { AgentsService } from "@/services/agents.service"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AgentRequestType, AgentResponseType } from "@/types/agents.type"
import { toast } from "sonner"

export default function AgentNetworkPage() {
  const agentService = new AgentsService()

  // Search state
  const [searchTerm, setSearchTerm] = useState("")

  // Agent deployment state
  const [codename, setCodename] = useState("")
  const [agentType, setAgentType] = useState("collection")
  const [platform, setPlatform] = useState("combolist")
  const [interval, setInterval] = useState("60") // Default to 60 seconds

  // Modal state
  const [deployedAuthKey, setDeployedAuthKey] = useState<string | null>(null)
  const [deployAgent, setDeployAgent] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentResponseType | null>(null)
  const [agents, setAgents] = useState<AgentResponseType[]>([])

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await agentService.getAll()
        const mappedAgents = data.map(agent => ({
          id: agent.id,
          name: agent.name,
          agent_type: agent.agent_type,
          agent_status: agent.agent_status.toLowerCase(), // ex: active, paused, compromised
          platform: agent.platform,
          last_activity_at: formatDistanceToNow(new Date(agent.last_activity_at), {
            addSuffix: true,
            locale: enUS
          }),
          data_processed: agent.data_processed ?? 0,
          created_at: formatDistanceToNow(new Date(agent.created_at), {
            addSuffix: true,
            locale: enUS
          }),
          updated_at: formatDistanceToNow(new Date(agent.updated_at), {
            addSuffix: true,
            locale: enUS
          }),
          collection_interval: agent.collection_interval,
          last_ip_address: agent.last_ip_address,
        }))

        setAgents(mappedAgents)
      } catch (err) {
        console.error("Erro ao buscar agentes:", err)
      }
    }

    fetchAgents()
  }, [])

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()
  ))

  const agentsActiveCount = agents.filter(a => a.agent_status === "active").length
  const agentsPausedCount = agents.filter(a => a.agent_status === "paused").length
  const agentsCompromisedCount = agents.filter(a => a.agent_status === "compromised").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">AGENT NETWORK</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor field operatives</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white" onClick={() => setDeployAgent(true)}>Deploy Agent</Button>
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-muted lg:col-span-1">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background text-white placeholder-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground tracking-wider">ACTIVE AGENTS</p>
                <p className="text-2xl font-bold text-chart-2 font-mono">{agentsActiveCount}</p>
              </div>
              <Shield className="w-8 h-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground tracking-wider">PAUSED</p>
                <p className="text-2xl font-bold text-chart-3 font-mono">{agentsPausedCount}</p>
              </div>
              <Shield className="w-8 h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground tracking-wider">COMPROMISED</p>
                <p className="text-2xl font-bold text-red-500 font-mono">{agentsCompromisedCount}</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent List */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="text-sm font-medium tracking-wider">AGENT ROSTER</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">CODENAME</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">TYPE</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">PLATFORM</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">LAST SEEN</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">DATA</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">COLLECTION INTERVAL</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent, index) => (
                  <tr
                    key={agent.id}
                    className={`border-b hover:bg-background transition-colors cursor-pointer`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <td className="py-3 px-4 text-sm text-white">{agent.name}</td>
                    <td className="py-3 px-4 text-sm text-white font-mono">{agent.agent_type}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            agent.agent_status === "active"
                              ? "bg-chart-2 animate-pulse"
                              : agent.agent_status === "paused"
                                ? "bg-chart-3 animate-pulse"
                                : "bg-red-500 animate-pulse"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-300 uppercase tracking-wider">{agent.agent_status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <ChevronsLeftRightEllipsis className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{agent.platform}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300 font-mono">{agent.last_activity_at}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-white font-mono">{agent.data_processed}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300 font-mono">{agent.collection_interval} seconds</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" className="hover:text-white border hover:border-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
          <DialogContent className="bg-muted text-white max-w-2xl font-mono">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-bold text-white tracking-wider">
                  {selectedAgent.name}
                </DialogTitle>
                <p className="text-sm text-gray-400 font-mono">{selectedAgent.id}</p>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">STATUS</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedAgent.agent_status === "active"
                        ? "bg-chart-2"
                        : selectedAgent.agent_status === "paused"
                        ? "bg-chart-3"
                        : "bg-red-500"
                    } animate-pulse`}
                  />
                  <span className="text-sm text-white uppercase tracking-wider">
                    {selectedAgent.agent_status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">DATA PROCESSED</p>
                <p className="text-sm text-white">{selectedAgent.data_processed}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">AGENT TYPE</p>
                <p className="text-sm text-white">{selectedAgent.agent_type}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">LAST SEEN</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{selectedAgent.last_activity_at}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">LAST IP</p>
                <div className="flex items-center gap-2">
                  <EthernetPort className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{selectedAgent.last_ip_address}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">CREATED</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{selectedAgent.created_at}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 tracking-wider mb-1">UPDATED</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{selectedAgent.updated_at}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 flex gap-2 justify-start border-t">
              <Button className="bg-white text-black">Assign Mission</Button>

              <Button
                disabled={selectedAgent.agent_status === "compromised"}
                variant="outline"
                className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                onClick={() => {
                  const status =
                    selectedAgent.agent_status === "active" ? "paused" : "active"

                  const updatedAgent: AgentRequestType = {
                    name: selectedAgent.name,
                    agent_type: selectedAgent.agent_type,
                    platform: selectedAgent.platform,
                    collection_interval: selectedAgent.collection_interval,
                    tags: selectedAgent.tags,
                    agent_status: status,
                  }

                  agentService
                    .update(selectedAgent.id, updatedAgent)
                    .then(() => {
                      toast.success(`Agent ${status} successfully!`)
                      setAgents(
                        agents.map((a) =>
                          a.id === selectedAgent.id
                            ? { ...a, agent_status: status }
                            : a
                        )
                      )
                      setSelectedAgent(null)
                    })
                    .catch((error) => {
                      console.error("Failed to pause agent:", error)
                      toast.error("Failed to pause agent")
                    })
                }}
              >
                {selectedAgent.agent_status === "active" ? "Suspend Agent" : "Reactivate Agent"}
              </Button>

              <Button
                variant="outline"
                className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                onClick={() => {
                  agentService
                    .delete(selectedAgent.id)
                    .then(() => {
                      toast.success("Agent deleted successfully!")
                      setAgents(agents.filter((a) => a.id !== selectedAgent.id))
                      setSelectedAgent(null)
                    })
                    .catch((error) => {
                      console.error("Failed to delete agent:", error)
                      toast.error("Failed to delete agent")
                    })
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Deploy Agent Modal */}
      <Dialog open={deployAgent} onOpenChange={setDeployAgent}>
        <DialogContent className="bg-muted text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-wider">DEPLOY AGENT</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="codename" className="text-sm tracking-wider">Codename</Label>
              <Input
                id="codename"
                placeholder="e.g. hellwave"
                className="bg-background text-white"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm tracking-wider">Type</Label>
              <Select value={agentType} onValueChange={setAgentType}>
                <SelectTrigger className="bg-background text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-white">
                  <SelectItem value="collection">Collection</SelectItem>
                    <SelectItem value="beacon">Beacon</SelectItem>
                  </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm tracking-wider">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-background text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-muted text-white">
                  <SelectItem value="combolist">Combolist</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="interval" className="text-sm tracking-wider">Collection Interval (s)</Label>
              <Input
                id="interval"
                type="number"
                className="bg-background text-white"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
              onClick={() => setDeployAgent(false)}
            > Cancel </Button>
            <Button
              className="bg-white text-black"
              onClick={() => {
                const newAgent: AgentRequestType = {
                  name: codename,
                  agent_type: agentType,
                  platform: platform,
                  collection_interval: parseInt(interval, 10),
                  tags: [],
                }

                agentService.create(newAgent)
                  .then((response) => {
                    if (response) {
                      toast.success("Agent deployed successfully!")
  
                      setDeployedAuthKey(response.auth_key)
                      setAgents([...agents, { ...response, last_activity_at: "Just now", data_processed: 0 }])
                    }
                  })
                  .catch((error) => {
                    console.error("Failed to deploy agent:", error)
                  })

                setDeployAgent(false)
              }}
            > Deploy </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>  

      <Dialog open={!!deployedAuthKey} onOpenChange={() => setDeployedAuthKey(null)}>
        <DialogContent className="bg-muted text-white min-w-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-wider">Agent Auth Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">Use this token to authenticate your agent:</p>
            <div className="bg-background border border-muted-foreground rounded px-3 py-2 font-mono text-white text-sm flex items-center justify-between">
              <span className="truncate">{deployedAuthKey}</span>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(deployedAuthKey!)
                  toast.success("Token copied to clipboard")
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/90 text-black hover:bg-white hover:text-black"
              onClick={() => {
                const blob = new Blob([deployedAuthKey!], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = codename+"-agent-token.txt"
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Download
            </Button>

            <Button
              variant="outline"
              className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
              onClick={() => setDeployedAuthKey(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </div>
  )
}
