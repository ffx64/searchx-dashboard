'use client';

import { toast } from "sonner";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { LogoutService } from "@/services/logout.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronUp, ChevronDown, Settings, LogOut, Box } from "lucide-react";
import { NavigationLink, NavigationRoot } from "@/components/site/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  useAuthGuard();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutService = useMemo(() => new LogoutService(), []);

  useEffect(() => {
    const userData = sessionStorage.getItem("username");
    if (!userData) return;
    
    setUser({
      username: userData,
      full_name: sessionStorage.getItem("full_name") || "",
      last_login: sessionStorage.getItem("last_login") || "",
    } as User);
  }, []);

  const handleLogout = useCallback(async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) return;

    try {
      await logoutService.logout(refreshToken);
      toast.success("Logged out successfully!");
      sessionStorage.clear();
      router.push("/");
    } catch {
      toast.error("Logout failed!");
    }
  }, [logoutService, router]);

  const renderAvatarFallback = useCallback(() => {
    if (!user) return "U";

    if (user.full_name) {
      return user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }

    return user.username?.[0]?.toUpperCase() || "U";
  }, [user]);

  return (
    <header className="flex h-16 items-center px-4 border-b justify-between">
      <div className="flex gap-4">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-[200px] justify-between items-center gap-2"
              aria-expanded={menuOpen}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="bg-gradient-to-tr from-blue-500 to-purple-600 text-white font-bold">
                    {renderAvatarFallback()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate max-w-[100px]">
                  {user?.full_name || user?.username || "Your Not Logged"}
                </span>
              </div>
              {menuOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/agents")}
            >
              <Box className="w-4 h-4" />
              <span>Agents</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 text-red-400 focus:text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <NavigationRoot>
          <NavigationLink active onClick={() => router.push("/")}>
            Overview
          </NavigationLink>
          <NavigationLink onClick={() => router.push("/combolist")}>Combolist</NavigationLink>
          <NavigationLink onClick={() => router.push("/")}>Discord</NavigationLink>
        </NavigationRoot>
      </div>

      <div className="flex items-center gap-4">
        {user?.last_login && (
          <span className="text-xs text-gray-400">
            Last login: {new Date(user.last_login).toLocaleString()}
          </span>
        )}
      </div>
    </header>
  );
};
