import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { worker_url } from "./constant.js";

export function useSyncClerkUser() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`${worker_url}/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id, // Puedes cambiar esto si tienes un id interno distinto
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });
    }
  }, [user]);
}
