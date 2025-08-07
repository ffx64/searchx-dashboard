"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Cpu, XCircle } from "lucide-react"
import CombolistPage from "./_combolist/page"

interface Module {
  id: string
  name: string
  status: "active" | "maintenance" | "offline"
  category: string
  description: string
  page: () => JSX.Element
  tags: string[]
}

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  const modules: Module[] = [
    {
      id: "MOD-001",
      name: "COMBOLIST",
      status: "active",
      category: "data",
      description: "Module specialized in researching and analyzing leaked credentials, including emails, passwords, and usernames, with a focus on intelligence and incident tracking.",
      page: CombolistPage,
      tags: ["dataleak", "e-mail", "password"],
    }
  ]

  const getStatusColor = (status: Module["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-900/50 text-green-400"
      case "maintenance":
        return "bg-yellow-900/50 text-yellow-400"
      case "offline":
        return "bg-red-900/50 text-red-400"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getStatusIcon = (status: Module["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "offline":
        return <XCircle className="w-4 h-4" />
      default:
        return <Cpu className="w-4 h-4" />
    }
  }

  const handleBack = () => setSelectedModule(null)

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            {selectedModule ? selectedModule.name.toUpperCase() : "MODULES CENTER"}
          </h1>
          <p className="text-sm text-gray-400">
            {selectedModule
              ? `Viewing module ${selectedModule.id}`
              : "Interface for using and managing internal modules, with access to tools and execution of specialized queries."}
          </p>
        </div>
        <div className="flex gap-2">
          {selectedModule ? (
            <Button
              onClick={handleBack}
              className="bg-background border text-muted-foreground hover:text-white"
            >
              Back
            </Button>
          ) : (
            <Button disabled className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
              New Module
            </Button>
          )}
        </div>
      </div>

      {!selectedModule ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Card
              key={mod.id}
              className="bg-muted hover:border-white/30 transition-colors cursor-pointer"
              onClick={() => setSelectedModule(mod)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold text-white tracking-wider">
                      {mod.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{mod.id}</p>
                  </div>
                  <div className="flex items-center gap-2">{getStatusIcon(mod.status)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge className={getStatusColor(mod.status)}>{mod.status.toUpperCase()}</Badge>
                <p className="text-sm text-gray-300">{mod.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mod.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-gray-700 text-white text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          {selectedModule.page && <selectedModule.page />}
        </div>
      )}
    </div>
  )
}
