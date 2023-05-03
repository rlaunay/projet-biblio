import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PropsWithChildren } from "react";

type LinkProps = PropsWithChildren<{
  to: string;
}>;

export function Link({ children, to }: LinkProps) {
  return (
    <MuiLink component={RouterLink} to={to}>
      {children}
    </MuiLink>
  );
}
