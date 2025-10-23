import { Bell, User } from "lucide-react";
import type { ComponentProps } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UnauthorizedError } from "@/api/client";
import type { Route } from "../+types/root";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";

export type LayoutRootProps = ComponentProps<"main">;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new UnauthorizedError("No access token found");
  }

  return null;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function LayoutRoot({ children, ...rest }: LayoutRootProps) {
  const navigate = useNavigate();
  return (
    <main {...rest} className="min-h-screen bg-slate-50">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    PF
                  </span>
                </div>
                <Link to="/">
                  <span className="font-semibold text-lg">
                    Project Gate Review
                  </span>
                </Link>
              </div>
              <nav className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link to="/calendar" className="text-sm font-medium">
                  Calendar
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar
                className="cursor-pointer"
                onClick={() => {
                  if (confirm("Are you sure you want to log out?")) {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    navigate("/login", { replace: true });
                  }
                }}
              >
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      <Outlet />;
    </main>
  );
}
