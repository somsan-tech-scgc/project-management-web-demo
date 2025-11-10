import { Bell, Calendar, LayoutDashboard, User } from "lucide-react";
import type { ComponentProps } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UnauthorizedError } from "@/api/client";
import type { Route } from "../+types/root";
import { useLogout } from "@/hooks/use-logout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";
export type LayoutRootProps = ComponentProps<"main">;

// export const clientLoader = requiredAuthLoader;

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function LayoutRoot({ children, ...rest }: LayoutRootProps) {
  const { logout } = useLogout();
  return (
    <>
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
                    <Button variant="ghost">
                      <LayoutDashboard width={16} height={16} />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/calendar" className="text-sm font-medium">
                    <Button variant="ghost">
                      <Calendar width={16} height={16} />
                      Calendar
                    </Button>
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/notifications">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Avatar className="cursor-pointer" onClick={() => {}}>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </AlertDialogTrigger>
                  <LogoutDialog />
                </AlertDialog>
              </div>
            </div>
          </div>
        </header>
        <Outlet />;
      </main>
    </>
  );
}

export function LogoutDialog() {
  const { logout } = useLogout();
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
