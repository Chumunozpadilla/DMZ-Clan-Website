import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ children, href, variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href.startsWith('http')) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} to={href} {...props}>
      {children}
    </Link>
  );
}
