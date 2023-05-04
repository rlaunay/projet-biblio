import { z } from "zod";
import http from "@/services/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queries/client";
import { isMessageError, isValidationError } from "@/queries/error";

export type RegisterPayload = {
  email: string;
  password: string;
  password_confirmation: string;
};

const AuthSchema = z.object({
  user: z.object({
    id: z.number().int(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  token: z.string(),
});

async function register(payload: RegisterPayload) {
  const res = await http.post("/auth/register", payload);
  return AuthSchema.parse(res);
}

export function useRegister() {
  const { mutate, error, isLoading } = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      queryClient.setQueryData(["user"], () => res.user);
    },
  });

  let err: string | null = !!error ? "Une erreur est survenue" : null;

  if (error && isMessageError(error)) {
    err = error.message;
  }

  if (error && isValidationError(error)) {
    err = error.errors[0].message || "Champ(s) invalid";
  }

  return { register: mutate, error: err, isLoading };
}
