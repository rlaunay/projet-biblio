type ValidationError = {
  errors: {
    rule: string;
    field: string;
    message: string;
  };
};

export function isValidationError(obj: any): obj is ValidationError {
  return "errors" in obj && Array.isArray(obj.errors);
}

type MessageError = {
  message: string;
};

export function isMessageError(obj: any): obj is MessageError {
  return "message" in obj && typeof obj.message === "string";
}
