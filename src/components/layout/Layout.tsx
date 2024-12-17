import { ReactNode } from 'react';
import { Container } from './Container';
import { Logo } from './Logo';
import { ThemeToggle } from '../ThemeToggle';
import { BottomNav } from '../navigation/BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <ThemeToggle />
      <Logo />
      {children}
      <BottomNav />
    </Container>
  );
}