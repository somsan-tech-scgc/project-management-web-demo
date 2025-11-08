import { $api } from "@/api/client";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogout() {
  const navigate = useNavigate();

  const logoutMutation = $api.useMutation(
    "post",
    "/committee-workflow/authentication/logout",
    {
      onSuccess: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        toast.error("Logout failed");
      },
    }
  );
  return {
    logout: () => {
      return logoutMutation.mutateAsync({});
    },
  };
}
