import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/api/client";
import { Link, useNavigate } from "react-router";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const registerMutation = $api.useMutation(
    "post",
    "/committee-workflow/user",
    {
      
      onSuccess: (data) => {
        console.log("Register successful:", data);
        toast.success("Register successful");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Register failed:", error);
        toast.error("Register failed");
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
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const title = formData.get("title") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const department = formData.get("department") as string;
        const isCommittee = formData.get("isCommittee") === "true";

        await registerMutation.mutateAsync({
          // @ts-ignore
          body: {
            username: username,
            password: password,
            title: title,
            firstName: firstName,
            lastName: lastName,
            department: department,
            isCommittee: isCommittee, 
          },
        });
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
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
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <div className="flex gap-x-3">
            <Select name="title" required>
              <SelectTrigger>
                <SelectValue placeholder="Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="grid gap-3"></div>{" "}
        <div className="grid gap-3">
          <div className="grid gap-3">
            <Input
              id="department"
              name="department"
              placeholder="Department"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox id="isCommittee" name="isCommittee" />
          <Label htmlFor="isCommittee">I am a committee member</Label>
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
