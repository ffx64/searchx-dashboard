"use client";

import { useEffect, useState } from "react";
import SearchXDashboard from "./_dashboard/page";
import Login from "./_login/page";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return (
    <div className="flex min-h-screen items-center justify-center">
      <img src="/logo.svg" alt="SearchX" width={320} height={320} />
    </div>
    );
  }

  return isAuthenticated ? <SearchXDashboard /> : <Login />;
};

export default Page;