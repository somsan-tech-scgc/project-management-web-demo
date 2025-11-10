import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths, components } from "./types";
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
    if (!token) {
      return;
    }

    options.request.headers.append("Authorization", `bearer ${token}`);
  },
  async onResponse({ response }) {
    const res = await response.json();

    console.log(res.code, res.code === "S01");
    if (res.code === "S01") {
      console.log("Unauthorized");
      throw new UnauthorizedError("Unauthorized", { cause: res });
    }

    return new Response(JSON.stringify(res));
  },
  onError({ error }) {
    console.log('onError', error);
    
  },
});
export const $api = createClient(fetchClient);

export type Schema = components["schemas"];
