"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Section } from "@/components/site/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MouseMoveEffect from "@/components/site/mouse-move-effect";

import { LoginService } from "@/services/login.service";
import { sanitize } from "@/lib/utils";

const loginService = new LoginService();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    if (username.length < 3 || username.length > 30) {
      toast.error("Username must be between 3 and 30 characters.");
      return;
    }

    if (password.length < 6 || password.length > 64) {
      toast.error("Password must be between 6 and 64 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("Username can only contain letters, numbers, and underscores.");
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_+]+$/.test(password)) {
      toast.error("Password can only contain letters, numbers, and special characters.");
      return;
    }

    if (loading) return; // Prevent multiple submissions

    setLoading(true);

    try {
      await loginService.login({ username, password });
      toast.success("Login successful. Welcome aboard.");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error(err?.message || "An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-white">
      <MouseMoveEffect />

      {/* Sexy fancy background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:80px_80px] opacity-20" />
      </div>

      <div className="relative z-10">
        <Section>
          <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern bg-grid-size" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 w-full max-w-sm"
            >
              <Card className="rounded-2xl shadow-xl border border-border bg-background/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-center text-white">Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="username" className="text-white/80">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      required
                      autoComplete="off"
                      maxLength={30}
                      inputMode="text"
                      onChange={(e) => setUsername(sanitize(e.target.value))}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="password" className="text-white/80">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      required
                      autoComplete="off"
                      maxLength={64}
                      onChange={(e) => setPassword(sanitize(e.target.value))}
                      onKeyDown={handleKeyDown}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      className="w-full mt-4"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        </Section>
      </div>
    </div>
  );
};

export default Login;