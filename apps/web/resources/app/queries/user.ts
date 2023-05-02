import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";
import http from "../services/http";
import { z } from "zod";

const userSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  rememberMe: z.boolean().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

async function getUser() {
  const res = await http.get("/auth/me");
  return userSchema.parse(res);
}

async function login(payload: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  const res = await http.post("/auth/login", { isMobile: false, ...payload });
  return userSchema.parse(res);
}

export function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      queryClient.setQueriesData(["user"], () => result);
    },
  });
}
