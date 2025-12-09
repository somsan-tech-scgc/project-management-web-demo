import { fetchClient, UnauthorizedError } from "@/api/client";
import {
  ACCESS_TOKEN_EXPIRED_AT_KEY,
  ACCESS_TOKEN_KEY,
} from "@/constants/auth";
import { handleUnauthorizedError } from "@/lib/utils";

export type MeResponse = {
  readonly code: string;
  readonly description: string;
  readonly data: {
    readonly id: number;
    readonly title: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly isCommittee: boolean;
    readonly expiredAt: Date;
  };
};

export async function requiredAuthLoader() {
  // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  // const accessTokenExpiredAt = localStorage.getItem(
  //   ACCESS_TOKEN_EXPIRED_AT_KEY
  // );

  // if (!accessToken) {
  //   handleUnauthorizedError();
  // }

  // if (accessTokenExpiredAt && new Date(accessTokenExpiredAt) <= new Date()) {
  //   handleUnauthorizedError();
  // }

  // try {
  //   const res = await fetchClient.GET("/committee-workflow/authentication/me");

  //   return res.data as unknown as MeResponse;
  // } catch (error) {
  //   if (error instanceof UnauthorizedError) {
  //     return handleUnauthorizedError();
  //   }

  //   throw error;
  // }
}
