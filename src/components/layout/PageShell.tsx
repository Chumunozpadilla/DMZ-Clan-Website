import type { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="background-grid" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
