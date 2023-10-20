"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { trpc } from "@/app/_trpc/client";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
  });

  return (
    <div>{isLoading ? "Loading..." : data?.success ? "true" : "false"}</div>
  );
}
