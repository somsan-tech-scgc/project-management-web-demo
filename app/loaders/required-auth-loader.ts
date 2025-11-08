import { UnauthorizedError } from "@/api/client";
import { toast } from "sonner";

export function requiredAuthLoader() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("Please login to continue");
    throw new UnauthorizedError("No access token found");
  }

  return null;
}
