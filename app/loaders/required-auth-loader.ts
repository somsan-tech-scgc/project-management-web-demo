import { fetchClient, UnauthorizedError } from "@/api/client";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";
import { redirect } from "react-router";

function handleUnauthorizedError() {
  const url = new URL('/login', location.origin);
  url.searchParams.set("toastMessage", "Please login to continue");
  url.searchParams.set("toastType", "error");

  throw redirect(url.toString());
}

export async function requiredAuthLoader() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    handleUnauthorizedError();
  } 

  const res = await fetchClient.GET('/committee-workflow/authentication/me')
  
  if (res.error) {
    handleUnauthorizedError();
  }

  console.log('res', res)

  return res.data
}
