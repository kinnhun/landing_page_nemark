import { useRouter } from "next/router";
import "../i18n";
import { useEffect } from "react";
// pages/index.tsx
export default function Home() {
  const router = useRouter();
  //   const role =
  //     typeof window !== "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    //     if (role) router.replace("/home");
    router.replace("/home");
  }, []);

  return <div>index Page</div>;
}
