"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Eye,
  Download,
  Filter,
  Globe,
  Shield,
  AlertTriangle,
} from "lucide-react"

export default function ReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState(null)

  const reports = [
    {
      id: "INT-2025-001",
      title: "CYBERCRIME NETWORK ANALYSIS",
      classification: "TOP SECRET",
      source: "SIGINT",
      location: "Eastern Europe",
      date: "2025-06-17",
      status: "verified",
      threat: "high",
      summary:
        "Detailed analysis of emerging cybercrime syndicate operating across multiple jurisdictions",
      tags: ["cybercrime", "international", "financial"],
    },
    {
      id: "INT-2025-002",
      title: "ROGUE AGENT COMMUNICATIONS",
      classification: "SECRET",
      source: "HUMINT",
      location: "Berlin",
      date: "2025-06-16",
      status: "pending",
      threat: "critical",
      summary:
        "Intercepted communications suggesting potential security breach in European operations",
      tags: ["internal", "security", "communications"],
    },
    {
      id: "INT-2025-003",
      title: "ARMS TRAFFICKING ROUTES",
      classification: "CONFIDENTIAL",
      source: "OSINT",
      location: "Middle East",
      date: "2025-06-15",
      status: "verified",
      threat: "medium",
      summary:
        "Updated intelligence on weapons smuggling corridors through Mediterranean region",
      tags: ["trafficking", "weapons", "maritime"],
    },
    {
      id: "INT-2025-004",
      title: "TERRORIST CELL SURVEILLANCE",
      classification: "TOP SECRET",
      source: "HUMINT",
      location: "North Africa",
      date: "2025-06-14",
      status: "active",
      threat: "critical",
      summary:
        "Ongoing surveillance of suspected terrorist cell planning coordinated attacks",
      tags: ["terrorism", "surveillance", "coordinated"],
    },
    {
      id: "INT-2025-005",
      title: "DIPLOMATIC REPORT BRIEF",
      classification: "SECRET",
      source: "DIPLOMATIC",
      location: "Asia Pacific",
      date: "2025-06-13",
      status: "verified",
      threat: "low",
      summary:
        "Political developments affecting regional security and operational considerations",
      tags: ["diplomatic", "political", "regional"],
    },
  ]

  const getClassificationColor = (classification) => {
    switch (classification) {
      case "TOP SECRET":
        return "bg-chart-5/10 text-red-500"
      case "SECRET":
        return "bg-chart-3/10 text-orange-500"
      case "CONFIDENTIAL":
        return "bg-gray-800 text-gray-300"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getThreatColor = (threat) => {
    switch (threat) {
      case "critical":
        return "bg-chart-5/10 text-red-500"
      case "high":
        return "bg-chart-4/10 text-purple-400"
      case "medium":
        return "bg-chart-1/10 text-sky-300"
      case "low":
        return "bg-chart-2/10 text-green-400"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-900/50 text-green-400"
      case "pending":
        return "bg-purple-900/50 text-purple-400"
      case "active":
        return "bg-blue-900/50 text-blue-400"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            REPORT CENTER
          </h1>
          <p className="text-sm text-muted-foreground">
            Classified reports and threat analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
            New Report
          </Button>
          <Button className="bg-background hover:bg-secondary border hover:border-muted-foreground text-muted-foreground hover:text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="bg-muted rounded-lg lg:col-span-2 p-4 border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search intelligence reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background text-white placeholder-muted-foreground"
            />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider">
                TOTAL REPORTS
              </p>
              <p className="text-2xl font-bold text-white font-mono">1,247</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider">
                CRITICAL THREATS
              </p>
              <p className="text-2xl font-bold text-chart-5 font-mono">12</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-chart-5" />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground tracking-wider">
                ACTIVE SOURCES
              </p>
              <p className="text-2xl font-bold text-chart-2 font-mono">89</p>
            </div>
            <Globe className="w-8 h-8 text-chart-2" />
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg border">
        <div className="p-4 border-b border-white/10">
          <p className="text-sm font-medium text-muted-foreground tracking-wider">
            REPORTS
          </p>
        </div>
        <div className="p-4 space-y-4">
          {filteredReports.map((report) => (
            <Dialog key={report.id}>
              <DialogTrigger asChild>
                <div
                  className="hover:border-white/30 border rounded p-4 hover:bg-background transition-colors cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-white tracking-wider">
                            {report.title}
                          </h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {report.id}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 ml-8">
                        {report.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 ml-8">
                        {report.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          className={getClassificationColor(
                            report.classification,
                          )}
                        >
                          {report.classification}
                        </Badge>
                        <Badge className={getThreatColor(report.threat)}>
                          {report.threat.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-3 h-3" />
                          <span>{report.source}</span>
                        </div>
                        <div className="font-mono">{report.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader className="flex flex-row items-center justify-between">
                  <div>
                    <DialogTitle className="text-xl font-bold text-white tracking-wider">
                      {report.title}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground font-mono">
                      {report.id}
                    </p>
                  </div>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">
                          CLASSIFICATION
                        </h3>
                        <div className="flex gap-2">
                          <Badge
                            className={getClassificationColor(
                              report.classification,
                            )}
                          >
                            {report.classification}
                          </Badge>
                          <Badge className={getThreatColor(report.threat)}>
                            THREAT: {report.threat.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">
                          SOURCE DETAILS
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Source Type:</span>
                            <span className="text-white font-mono">
                              {report.source}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location:</span>
                            <span className="text-white">{report.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white font-mono">
                              {report.date}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">
                          TAGS
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {report.tags.map((tag) => (
                            <Badge key={tag} className="bg-secondary text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">
                          THREAT ASSESSMENT
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Threat Level</span>
                            <Badge className={getThreatColor(report.threat)}>
                              {report.threat.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                report.threat === "critical"
                                  ? "bg-red-500 w-full"
                                  : report.threat === "high"
                                  ? "bg-purple-500 w-3/4"
                                  : report.threat === "medium"
                                  ? "bg-sky-500 w-1/2"
                                  : "bg-green-500 w-1/4"
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 tracking-wider mb-2">
                      EXECUTIVE SUMMARY
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {report.summary}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="bg-white text-black">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                    <Button
                      variant="outline"
                      className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="border hover:border-muted-foreground text-muted-foreground hover:text-white"
                    >
                      Share Intel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  )
}
