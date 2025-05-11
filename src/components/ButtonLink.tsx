import { PropsWithChildren } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import Button from "./Button";

interface Props extends PropsWithChildren<Omit<RouterLinkProps, 'to'>> {
  href: string;
  className?: string;
}

const ButtonLink = ({ children, href, className, ...props }: Props) => {
  return (
    <RouterLink to={href} {...props}>
      <Button className={className}>{children}</Button>
    </RouterLink>
  );
};

export default ButtonLink;