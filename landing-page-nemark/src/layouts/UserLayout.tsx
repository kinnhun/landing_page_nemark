import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  // Show loading skeleton on server-side
  if (!mounted) {
    return (
      <div
        style={{ minHeight: "100vh", background: "var(--brand-background)" }}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <Header />
      <main
        className="main"
        style={{
          background: "var(--brand-background)",
          color: "var(--brand-text)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
