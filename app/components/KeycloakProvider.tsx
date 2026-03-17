"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import keycloak from "../lib/keycloak";
import { useCVStore } from "../lib/store";

interface KeycloakContextValue {
  authenticated: boolean;
  token: string | undefined;
  initialized: boolean;
  login: () => void;
  logout: () => Promise<void>;
  userName: string | undefined;
}

const KeycloakContext = createContext<KeycloakContextValue>({
  authenticated: false,
  token: undefined,
  initialized: false,
  login: () => {},
  logout: async () => {},
  userName: undefined,
});

export const useKeycloak = () => useContext(KeycloakContext);

export default function KeycloakProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [initialized, setInitialized] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const didInit = useRef(false);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const syncAuthState = useCallback(() => {
    setAuthenticated(!!keycloak.authenticated);
    setToken(keycloak.token);
    setUserName(
      keycloak.tokenParsed?.preferred_username ?? keycloak.tokenParsed?.name,
    );
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    keycloak.onAuthSuccess = syncAuthState;
    keycloak.onAuthRefreshSuccess = syncAuthState;
    keycloak.onAuthLogout = () => {
      setAuthenticated(false);
      setToken(undefined);
      setUserName(undefined);
    };
    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(60)
        .then(syncAuthState)
        .catch(() => {
          setAuthenticated(false);
          setToken(undefined);
          setUserName(undefined);
        });
    };

    keycloak
      .init({ onLoad: "check-sso", checkLoginIframe: false })
      .then(async (auth) => {
        if (auth) {
          try {
            await keycloak.updateToken(0);
          } catch {
            // If refresh fails right after init, keep the current token state.
          }
        }

        syncAuthState();
        setInitialized(true);

        // Refresh token every 30s, 60s before expiry
        refreshIntervalRef.current = setInterval(() => {
          if (!keycloak.authenticated) return;

          keycloak
            .updateToken(60)
            .then((refreshed) => {
              if (refreshed) {
                syncAuthState();
              }
            })
            .catch(() => {
              setAuthenticated(false);
              setToken(undefined);
              setUserName(undefined);
            });
        }, 30_000);
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
        setInitialized(true);
      });

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = undefined;
      }
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthRefreshSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, [syncAuthState]);

  const resetStore = useCVStore((s) => s.resetStore);

  const login = useCallback(
    () => keycloak.login({ redirectUri: window.location.href }),
    [],
  );
  const logout = useCallback(async () => {
    setAuthenticated(false);
    setToken(undefined);
    setUserName(undefined);
    resetStore();

    try {
      await keycloak.logout({ redirectUri: window.location.origin });
    } catch (error) {
      console.error("Keycloak logout error:", error);
      keycloak.clearToken();
      window.location.href = window.location.origin;
    }
  }, [resetStore]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Connexion en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <KeycloakContext.Provider
      value={{ authenticated, token, initialized, login, logout, userName }}
    >
      {children}
    </KeycloakContext.Provider>
  );
}
