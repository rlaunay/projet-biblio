import { z } from "zod";
import http from "@/services/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queries/client";
import { isMessageError, isValidationError } from "@/queries/error";

export type LoginPayload = {
  email: string;
  password: string;
};

const AuthSchema = z.object({
  user: z.object({
    id: z.number().int(),
    email: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  token: z.string(),
});

async function login(payload: LoginPayload) {
  const res = await http.post("/auth/login", payload);
  return AuthSchema.parse(res);
}

export function useLogin() {
  const { mutate, error, isLoading } = useMutation({
    mutationFn: login,
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
    err = "Email ou mot de passe invalid";
  }

  return { login: mutate, error: err, isLoading };
}
