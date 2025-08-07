"use client"

import { useState } from "react"
import { ChevronRight, Monitor, Settings, Shield, Target, Users, Bell, RefreshCw, FileText, LogOut, DatabaseBackup, SearchCode, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommandCenterPage from "./../_command-center/page"
import AgentNetworkPage from "./../_agent-network/page"
import OperationsPage from "./../_operations/page"
import ReportPage from "./../_report/page"
import SystemsPage from "./../_systems/page"
import { AuthService } from "@/services/auth.service"
import { Label } from "@radix-ui/react-label"
import ModulesPage from "../_modules/page"

export default function SearchXDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const auth = new AuthService();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-70"} bg-muted border-r border-zinc-700/50 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full md:h-auto ${!sidebarCollapsed ? "md:block" : ""}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
              <h1 className="text-white font-bold text-lg tracking-wider">SEARCHX OPS</h1>
              <p className="text-gray-400 text-xs">v1.0.0 CLASSIFIED</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-muted-foreground hover:text-white hover:bg-background"
            >
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`}
              />
            </Button>
          </div>

          <nav className="space-y-3">
            {[
              { id: "overview", icon: Monitor, label: "COMMAND CENTER" },
              { id: "modules", icon: Search, label: "MODULES" },
              { id: "operations", icon: Target, label: "OPERATIONS" },
              { id: "report", icon: FileText, label: "REPORT" },
              { id: "agents", icon: Users, label: "AGENT NETWORK" },
              { id: "systems", icon: Settings, label: "SYSTEMS" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                  activeSection === item.id ? "bg-background text-white" : "text-muted-foreground hover:text-white hover:bg-background"
                }`}
              >
                <item.icon className="w-5 h-5 md:w-5 md:h-5 sm:w-6 sm:h-6" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {!sidebarCollapsed && (
            <div className="mt-8 p-4 bg-background border rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
                <span className="text-xs text-chart-2 font-medium">SYSTEM ONLINE</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <div>UPTIME: 72:14:33</div>
                <div>AGENTS: 847 ACTIVE</div>
                <div>MISSIONS: 23 ONGOING</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 bg-muted z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!sidebarCollapsed ? "md:ml-0" : ""}`}>
        {/* Top Toolbar */}
        <div className="h-16 bg-muted border-b border-zinc-700/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              SEARCHX COMMAND / <span className="text-white font-medium">OVERVIEW</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">LAST UPDATE: 23/07/2025 21:43 UTC</div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white bg-background border hover:border-muted-foreground">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white bg-background border hover:border-muted-foreground"
              onClick={() => window.location.reload()} >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500/80 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/60 hover:border-red-500"
              onClick={() => auth.logout()} >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto bg-background">
          {activeSection === "overview" && <CommandCenterPage />}
          {activeSection === "agents" && <AgentNetworkPage />}
          {activeSection === "operations" && <OperationsPage />}
          {activeSection === "modules" && <ModulesPage />}
          {activeSection === "report" && <ReportPage />}
          {activeSection === "systems" && <SystemsPage />}
        </div>
      </div>
    </div>
  )
}
