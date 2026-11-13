import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

/** Client-side navigation for internal paths, a plain anchor for external HTTPS links. */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

interface ButtonLinkProps extends SmartLinkProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
}

export function ButtonLink({ variant = "primary", size = "md", className = "", ...rest }: ButtonLinkProps) {
  return <SmartLink className={`btn btn--${variant} btn--${size} ${className}`.trim()} {...rest} />;
}
