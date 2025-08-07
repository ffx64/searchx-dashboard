"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function OperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState(null)

  const operations = [
    {
      id: "OP-OMEGA-001",
      name: "SHADOW PROTOCOL",
      status: "active",
      priority: "critical",
      location: "Eastern Europe",
      agents: 5,
      progress: 75,
      startDate: "2025-06-15",
      estimatedCompletion: "2025-06-30",
      description: "Track high-value target in Eastern Europe",
      objectives: ["Locate target", "Establish surveillance", "Extract intelligence"],
    },
    {
      id: "OP-DELTA-002",
      name: "GHOST FIRE",
      status: "planning",
      priority: "high",
      location: "Seoul",
      agents: 3,
      progress: 25,
      startDate: "2025-06-20",
      estimatedCompletion: "2025-07-05",
      description: "Infiltrate cybercrime network in Seoul",
      objectives: ["Penetrate network", "Gather evidence", "Identify key players"],
    },
    {
      id: "OP-SIERRA-003",
      name: "NIGHT STALKER",
      status: "completed",
      priority: "medium",
      location: "Berlin",
      agents: 2,
      progress: 100,
      startDate: "2025-05-28",
      estimatedCompletion: "2025-06-12",
      description: "Monitor rogue agent communications in Berlin",
      objectives: ["Intercept communications", "Decode messages", "Report findings"],
    },
    {
      id: "OP-ALPHA-004",
      name: "CRIMSON TIDE",
      status: "active",
      priority: "high",
      location: "Cairo",
      agents: 4,
      progress: 60,
      startDate: "2025-06-10",
      estimatedCompletion: "2025-06-25",
      description: "Support covert extraction in South America",
      objectives: ["Secure extraction point", "Neutralize threats", "Extract asset"],
    },
    {
      id: "OP-BRAVO-005",
      name: "SILENT BLADE",
      status: "compromised",
      priority: "critical",
      location: "Moscow",
      agents: 6,
      progress: 40,
      startDate: "2025-06-05",
      estimatedCompletion: "2025-06-20",
      description: "Monitor rogue agent communications in Berlin",
      objectives: ["Assess compromise", "Extract personnel", "Damage control"],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-900/50 text-green-400"
      case "planning":
        return "bg-purple-900/50 text-purple-400"
      case "completed":
        return "bg-gray-800 text-gray-300"
      case "compromised":
        return "bg-red-900/50 text-red-400"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-900/50 text-red-400"
      case "high":
        return "bg-purple-900/50 text-purple-400"
      case "medium":
        return "bg-gray-800 text-gray-300"
      case "low":
        return "bg-green-900/50 text-green-400"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Target className="w-4 h-4" />
      case "planning":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "compromised":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">OPERATIONS CENTER</h1>
          <p className="text-sm text-gray-400">Mission planning and execution oversight</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
            New Operation
          </Button>
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
            Mission Brief
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 tracking-wider">ACTIVE OPS</p>
                <p className="text-2xl font-bold text-white font-mono">23</p>
              </div>
              <Target className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 tracking-wider">COMPLETED</p>
                <p className="text-2xl font-bold text-white font-mono">156</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 tracking-wider">COMPROMISED</p>
                <p className="text-2xl font-bold text-red-400 font-mono">2</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 tracking-wider">SUCCESS RATE</p>
                <p className="text-2xl font-bold text-white font-mono">94%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {operations.map((operation) => (
          <Dialog key={operation.id}>
            <DialogTrigger asChild>
              <Card
                className="bg-muted hover:border-white/30 transition-colors cursor-pointer"
                onClick={() => setSelectedOperation(operation)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm font-bold text-white tracking-wider">{operation.name}</CardTitle>
                      <p className="text-xs text-muted-foreground font-mono">{operation.id}</p>
                    </div>
                    <div className="flex items-center gap-2">{getStatusIcon(operation.status)}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(operation.status)}>{operation.status.toUpperCase()}</Badge>
                    <Badge className={getPriorityColor(operation.priority)}>{operation.priority.toUpperCase()}</Badge>
                  </div>

                  <p className="text-sm text-gray-300">{operation.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{operation.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{operation.agents} agents assigned</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Est. completion: {operation.estimatedCompletion}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-mono">{operation.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${operation.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl w-full bg-muted text-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold tracking-wider">
                  {operation.name}
                </DialogTitle>
                <p className="text-sm text-gray-400 font-mono">{operation.id}</p>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">OPERATION STATUS</h3>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status.toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(operation.priority)}>
                        {operation.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">MISSION DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{operation.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Agents:</span>
                        <span className="text-white font-mono">{operation.agents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white font-mono">{operation.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Est. Completion:</span>
                        <span className="text-white font-mono">{operation.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">PROGRESS</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Completion</span>
                        <span className="text-white font-mono">{operation.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${operation.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">OBJECTIVES</h3>
                    <div className="space-y-2">
                      {operation.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">DESCRIPTION</h3>
                <p className="text-sm text-gray-300">{operation.description}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-700 mt-4">
                <Button className="bg-white text-black">Update Status</Button>
                <Button
                  variant="outline"
                  className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                >
                  View Reports
                </Button>
                <Button
                  variant="outline"
                  className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                >
                  Assign Agents
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
