import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import type { Route } from "./+types/root";
import "./app.css";
import { UnauthorizedError } from "./api/client";
import { toast } from "sonner";
import { useEffect } from "react";
import type { ToastType } from "./lib/utils";
import { handleUnauthorizedError } from "./lib/utils";

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
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof UnauthorizedError && typeof window !== 'undefined') {
        handleUnauthorizedError();
      }
    },
  }),
  defaultOptions: {
    queries: {
      // throwOnError: true,
      retry: 3,
      experimental_prefetchInRender: true,
    },
  },
});

export default function App() {
  const location = useLocation();
  
  const toastMessage = location.state?.toastMessage;
  const toastType = location.state?.toastType;

  console.log(location.state)
  useEffect(() => {
    // console.log({toastMessage, toastType})
    if (!toastMessage) {
      return
    }

    const parsedToastType: ToastType = toastType ?? 'info'

    toast[parsedToastType](toastMessage, {
      dismissible: true,
      onAutoClose() {
        delete location.state?.toastMessage;
        delete location.state?.toastType;
      },
    });
  }, [toastMessage, toastType]);

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

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error instanceof UnauthorizedError) {
    message = "Unauthorized";
    details = "You are not authorized to access this page.";
    console.log(error)
    // throw redirect('/login');
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = "Wildcard error";
    details = error.message;
    stack = error.stack;
  } else {
    message = "Unknown error";
  }

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
