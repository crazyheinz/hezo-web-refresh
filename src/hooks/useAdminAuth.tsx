import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type AdminAuthState =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "no-admin"; session: Session }
  | { status: "admin"; session: Session };

/**
 * Tracks the Supabase auth session and whether the user has the 'admin' role.
 * Use the returned `state` to gate admin UI.
 */
export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    const evaluate = async (session: Session | null) => {
      if (!session) {
        if (active) setState({ status: "anonymous" });
        return;
      }
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        if (!active) return;
        if (error) {
          console.error("has_role check failed", error);
          setState({ status: "no-admin", session });
          return;
        }
        setState({ status: data ? "admin" : "no-admin", session });
      } catch (err) {
        console.error("has_role exception", err);
        if (active) setState({ status: "no-admin", session });
      }
    };

    // Set up listener FIRST, then fetch initial session
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer to avoid deadlocks
      setTimeout(() => evaluate(session), 0);
    });

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = () => supabase.auth.signOut();

  return { state, signOut };
};
