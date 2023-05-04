import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import http from "@/services/http";

const UserSchema = z.object({
  user: z
    .object({
      id: z.number().int(),
      email: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
    .nullable(),
});

async function getUser() {
  const res = await http.get("/auth/me");
  const { user } = UserSchema.parse(res);
  return user;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });
}
