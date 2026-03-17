"use client";

import { useEffect, useRef } from "react";
import { apiGet } from "../lib/backend-api";
import { useCVStore } from "../lib/store";

export default function BackendHydrator() {
  const { sharedBackendData, hydrateFromBackendData } = useCVStore();
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) {
      return;
    }

    const hydrate = async () => {
      try {
        const result = await apiGet<unknown>("/jsonresume");
        const payload = Array.isArray(result) ? result[0] : result;
        if (payload) {
          hydrateFromBackendData(payload);
          hasHydrated.current = true;
        }
      } catch (error) {
        console.error("Erreur hydratation backend globale:", error);
      }
    };

    if (sharedBackendData) {
      hydrateFromBackendData(sharedBackendData);
      hasHydrated.current = true;
      return;
    }

    hydrate();
  }, [sharedBackendData, hydrateFromBackendData]);

  return null;
}
