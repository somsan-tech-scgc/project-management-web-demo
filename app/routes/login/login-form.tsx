import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/api/client";
import { useNavigate } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const loginMutation = $api.useMutation(
    "post",
    "/committee-workflow/authentication/login",
    {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        if (!data?.["data"]?.["accessToken"]) {
          throw new Error("No access token in response");
        }
        localStorage.setItem("accessToken", data["data"]["accessToken"]);
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        // Handle login error, e.g., show error message
      },
    }
  );

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("username") as string;
        const password = formData.get("password") as string;

        await loginMutation.mutateAsync({
          body: {
            username: email,
            password,
          },
        });
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label>Username</Label>
          <Input id="username" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
