import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./types";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";

export const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export class UnauthorizedError extends Error {
  constructor(...args: Parameters<ErrorConstructor>) {
    super(...args);
    this.name = "UnauthorizedError";
  }
}

fetchClient.use({
  onRequest(options) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      options.request.headers.append("Authorization", `bearer ${token}`);
    }
  },
  async onResponse(options) {
    const res = await options.response.json();

    if (res.code === "S01") {
      throw new UnauthorizedError("Unauthorized", { cause: res });
    }

    return new Response(JSON.stringify(res));
  },
});
export const $api = createClient(fetchClient);
