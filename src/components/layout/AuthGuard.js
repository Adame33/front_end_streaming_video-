"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FullscreenSpinner from "../common/FullscreenSpinner";
import { isLoggedIn } from "../../utils/auth";

const AUTH_ROUTES = new Set(["/login", "/register"]);

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const logged = isLoggedIn();

    if (AUTH_ROUTES.has(pathname)) {
      if (logged) {
        setAuthorized(false);
        router.replace("/");
      } else {
        setAuthorized(true);
      }
      return;
    }

    if (!logged) {
      setAuthorized(false);
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (authorized === null) {
    return <FullscreenSpinner />;
  }

  if (!authorized) {
    return <FullscreenSpinner message="Redirigiendo al inicio de sesión" />;
  }

  return children;
}
