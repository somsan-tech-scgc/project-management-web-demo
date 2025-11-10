import { fetchClient, UnauthorizedError } from "@/api/client";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";

export async function requiredAuthLoader() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    // toast.error("Please login to continue");
    throw new UnauthorizedError("No access token found");
  } 

  await fetchClient.GET('/committee-workflow/authentication/me')
}
