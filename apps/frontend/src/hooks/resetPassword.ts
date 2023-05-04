import { useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import http from "@/services/http";

export type ResetPasswordPayload = {
  password: string;
  password_confirmation: string;
};

export function useResetPassword() {
  const { encryptEmail } = useParams();
  const [searchParams] = useSearchParams();

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    http
      .get(
        `/auth/reset/password/${encryptEmail}?signature=${searchParams.get(
          "signature"
        )}`
      )
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, []);

  const resetPassword = useCallback((payload: ResetPasswordPayload) => {
    setSuccess(false);
    setError(false);
    setIsLoading(true);
    http
      .post(
        `/auth/reset/password/${encryptEmail}?signature=${searchParams.get(
          "signature"
        )}`,
        payload
      )
      .then(() => setSuccess(true))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isValid, isLoading, success, error, resetPassword };
}
