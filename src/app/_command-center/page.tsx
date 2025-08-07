"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AgentsService } from "@/services/agents.service"
import { AgentResponseType } from "@/types/agents.type"
import { useEffect, useState } from "react"

export default function CommandCenterPage() {
  const agentService = new AgentsService()

  const [agents, setAgents] = useState<AgentResponseType[]>([])
  
  useEffect(() => {
    const fetchAgents = async () => {
      const data = await agentService.getAll()
      setAgents(data)
    }

    fetchAgents()
  }, [])
  
  const agentsActiveCount = agents.filter(a => a.agent_status === "active").length
  const agentsPausedCount = agents.filter(a => a.agent_status === "paused").length
  const agentsCompromisedCount = agents.filter(a => a.agent_status === "compromised").length

  const recentAgents = [...agents]
    .filter(a => a.last_activity_at)
    .sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())
    .slice(0, 4)

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Status Overview */}
        <Card className="bg-muted lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 tracking-wider">AGENT ALLOCATION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{agentsActiveCount}</div>
                <div className="text-xs text-gray-400">Active Field</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{agentsPausedCount}</div>
                <div className="text-xs text-gray-400">Paused</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{agentsCompromisedCount}</div>
                <div className="text-xs text-gray-400">Compromised</div>
              </div>
            </div>

            <div className="space-y-2">
              {recentAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-2 bg-background rounded border hover:border-white/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        agent.agent_status === "active"
                          ? "bg-chart-2"
                          : agent.agent_status === "paused"
                            ? "bg-chart-3"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className="text-xs text-white font-mono">{agent.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{agent.id}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="bg-muted lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 tracking-wider">ACTIVITY LOG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  time: "25/06/2025 09:29",
                  agent: "gh0st_Fire",
                  action: "completed mission in",
                  location: "Berlin",
                  target: "zer0_Nigh",
                },
                {
                  time: "25/06/2025 08:12",
                  agent: "dr4g0n_V3in",
                  action: "extracted high-value target in",
                  location: "Cairo",
                  target: null,
                },
                {
                  time: "24/06/2025 22:55",
                  agent: "sn4ke_Sh4de",
                  action: "lost communication in",
                  location: "Havana",
                  target: null,
                },
                {
                  time: "24/06/2025 21:33",
                  agent: "ph4nt0m_R4ven",
                  action: "initiated surveillance in",
                  location: "Tokyo",
                  target: null,
                },
                {
                  time: "24/06/2025 19:45",
                  agent: "v0id_Walk3r",
                  action: "compromised security in",
                  location: "Moscow",
                  target: "d4rk_M4trix",
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="text-xs border-l border-chart-1 pl-3 hover:bg-background p-2 rounded transition-colors"
                >
                  <div className="text-muted-foreground font-mono">{log.time}</div>
                  <div className="text-white">
                    Agent <span className="text-sky-500 font-mono">{log.agent}</span> {log.action}{" "}
                    <span className="text-white font-mono">{log.location}</span>
                    {log.target && (
                      <span>
                        {" "}
                        with agent <span className="text-sky-500 font-mono">{log.target}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Encrypted Chat Activity */}
        <Card className="bg-muted lg:col-span-4 ">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 tracking-wider">ENCRYPTED CHAT ACTIVITY</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Wireframe Sphere */}
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 border-2 border-gray-600 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-2 border border-gray-600 rounded-full opacity-40"></div>
              <div className="absolute inset-4 border border-gray-600 rounded-full opacity-20"></div>
              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gray-600 opacity-30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-gray-600 opacity-30"></div>
              </div>
            </div>

            <div className="text-xs text-gray-400 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span># 2025-06-17 14:23 UTC</span>
              </div>
              <div className="text-white">{"> [AGT:gh0stfire] ::: INIT >> ^^^ loading secure channel"}</div>
              <div className="text-purple-400">{"> CH#2 | 1231.9082464.500...xR3"}</div>
              <div className="text-white">{"> KEY LOCKED"}</div>
              <div className="text-gray-300">
                {'> MSG >> "...mission override initiated... awaiting delta node clearance"'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Activity Chart */}
        <Card className="bg-muted lg:col-span-8 ">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 tracking-wider">
              MISSION ACTIVITY OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-700"></div>
                ))}
              </div>

              {/* Chart Line */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#468be5ff"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-5 font-mono">
                <span>500</span>
                <span>400</span>
                <span>300</span>
                <span>200</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 -mb-6 font-mono">
                <span>Jan 28, 2025</span>
                <span>Feb 28, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Information */}
        <Card className="bg-muted lg:col-span-4 ">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 tracking-wider">MISSION INFORMATION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-white font-medium">Successful Missions</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">High Risk Mission</span>
                    <span className="text-white font-bold font-mono">190</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Medium Risk Mission</span>
                    <span className="text-white font-bold font-mono">426</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Low Risk Mission</span>
                    <span className="text-white font-bold font-mono">920</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-red-400 font-medium">Failed Missions</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">High Risk Mission</span>
                    <span className="text-white font-bold font-mono">190</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Medium Risk Mission</span>
                    <span className="text-white font-bold font-mono">426</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Low Risk Mission</span>
                    <span className="text-white font-bold font-mono">920</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
