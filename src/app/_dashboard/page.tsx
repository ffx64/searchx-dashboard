"use client";

import { Navbar } from "@/components/layout/navbar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MotionLink } from "@/components/site/motion-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/site/section";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  MessageSquare,
  Globe,
} from "lucide-react";

type ToolsStatus = {
  combolistRows: number;
  discordMessages: number;
  dataleakRows: number;
  brazilianResearchRows: number;
  indianResearchRows: number;
};

const Dashboard = () => {
  const [status, setStatus] = useState<ToolsStatus | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus({
        combolistRows: 123456,
        discordMessages: 789,
        dataleakRows: 4567,
        brazilianResearchRows: 3210,
        indianResearchRows: 987,
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Section>
      <div className="relative min-h-screen bg-background text-white">
        <Navbar />

        <main className="relative z-10 p-12 max-w-7xl mx-auto min-h-screen">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {sessionStorage.getItem("username") || "Your Not Logged"}!
          </h1>
          <p className="text-sm text-gray-400 mb-12 max-w-7xl leading-relaxed">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="w-20">@SearchX</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.imgur.com/bMgR3ip.jpeg" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@ffx64</h4>
                    <p className="text-sm">
                      SearchX is a powerful platform for indexing and analyzing data extracted from different sources, such as combolists, Discord messages, and other networks.
                    </p>
                    <div className="text-muted-foreground text-xs">
                      Active since November 2024
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}
            is a modular suite focused on data leak research and correlation. Each module has a specific role within the ecosystem:

            <br />
            <br />

            <strong className="text-white">Main modules:</strong>
            <ul className="list-disc list-inside mt-2">
              <li><span className="text-white">searchx-api:</span> Java-based REST API responsible for providing access to indexed data, user management, dashboards, and public/private endpoints.</li>
              <li><span className="text-white">searchx-indexer:</span> Go service responsible for receiving real-time data from agents (via gRPC), indexing, checking for duplicates, applying rules, and classifying content.</li>
              <li><span className="text-white">searchx-migrations:</span> Database versioning module using Flyway. Ensures schema versioning and consistency across environments.</li>
            </ul>

            <br />
            <strong className="text-white">How to use:</strong>
            <ol className="list-decimal list-inside mt-2">
              <li>Go to the <MotionLink href="/agents" label="/agents" /> page in the navbar.</li>
              <li>Create a new agent and configure the authentication key.</li>
              <li>Once the agent starts sending data, the indexer will process it and you’ll be able to view the results in real-time modules.</li>
              <li>Use the <MotionLink href="/dashboard" label="/dashboard" /> page to monitor data collection and status.</li>
            </ol>

            <br />
            <span className="text-red-500 font-semibold">
              Warning: This tool is for educational purposes only. Any illegal use is entirely the user’s responsibility. Use it ethically.
            </span>          
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Combolist</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {status?.combolistRows?.toLocaleString() ?? "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">rows</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Discord</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {status?.discordMessages?.toLocaleString() ?? "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">messages</p>
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </Section>
  );
};

export default Dashboard;
