import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/api/client";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

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
        if (!data?.["data"]?.["accessToken"]) {
          throw new Error("No access token in response");
        }
        localStorage.setItem("accessToken", data["data"]["accessToken"]);
        toast.success("Login successful");
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        toast.error("Login failed");
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

        console.log("Form submitted:", Object.fromEntries(formData.entries()));

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
          <Input id="username" name="username" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        {import.meta.env.DEV ? (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              localStorage.setItem("accessToken", "skipped-dev-token");
              navigate("/");
            }}
          >
            Skip Login (Dev Mode)
          </Button>
        ) : null}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
