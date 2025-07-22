"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import Dashboard from "./_dashboard/page";
import Login from "./_login/page";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-white">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            filter: [
              "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
              "drop-shadow(0 0 8px rgba(0,212,255,0.8))",
              "drop-shadow(0 0 4px rgba(255,255,255,0.3))"
            ]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 1.5,
          }}
        >
          <LoaderCircle className="w-12 h-12 text-white" />
        </motion.div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
};

export default Page;
