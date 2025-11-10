import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import type { Route } from "./+types/root";
import "./app.css";
import { UnauthorizedError } from "./api/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { ACCESS_TOKEN_KEY } from "./constants/auth";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // throwOnError: true,
      retry: 3,
      'experimental_prefetchInRender': true
    },
  },
});

export default function App() {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {import.meta.env.DEV ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
    console.log('a')
  } else if (error instanceof UnauthorizedError) {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    // return navigate("/login", { replace: true });
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = 'Wildcard error'
    details = error.message;
    stack = error.stack;
    console.log('b')
  } else {
    message = 'Unknown error'
  }

  console.log('e b', error)

  useEffect(() => {
    if (error instanceof UnauthorizedError) {

      // console.log('cc')
      // Redirect to login page on UnauthorizedError
      navigate("/login", { replace: true });
      toast.error("Please login to continue");

    }
    // console.error(error);
  }, [error, navigate, toast]);

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
