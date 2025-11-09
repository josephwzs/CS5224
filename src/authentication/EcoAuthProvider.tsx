import { type ReactNode, useEffect, useState } from "react";
import { useAuth as useOidcAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getApiBaseUrl } from "../api/base-url";
import type { User } from "../types/data-types";
import { EcoAuthContext } from "./EcoAuthContext";

export const EcoAuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const oidc = useOidcAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [roles, setRoles] = useState<string[]>([]);
  const [isRestored, setIsRestored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE = getApiBaseUrl();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);

        if (!res.ok) {
          const error = await res.text();
          throw new Error(`API Error ${res.status}: ${error}`);
        }

        const users = await res.json();
        setUsers(users);
      } catch (e) {
        console.error("Unable to fetch users", e);
      }
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("oidc.user");
    if (!raw) return;

    const session = JSON.parse(raw);
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = session.expires_at ?? now + 3600;
    const refreshIn = Math.max(0, expiresAt - now - 60);

    const refreshTimeout = setTimeout(() => {
      refreshToken?.();
    }, refreshIn * 1000);

    return () => {
      clearTimeout(refreshTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    const raw = sessionStorage.getItem("oidc.user");
    if (!raw) {
      setIsRestored(true);
      return;
    }

    const session = JSON.parse(raw);
    const now = Math.floor(Date.now() / 1000);
    const buffer = 30;

    if (session.expires_at < now + buffer) {
      sessionStorage.removeItem("oidc.user");
      setIsRestored(true);
      return;
    }

    setAccessToken(session.access_token);
    setUser(session.profile?.sub);
    setUserName(session.profile?.name);
    setRoles(session.profile?.roles ?? []);
    setIsRestored(true);
  }, []);

  const login = async (username: string) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ user: username });
      const url = `${API_BASE}/proxy/jwt?${query}`;
      const response = await fetch(url);
      const { token: access_token, id_token, userName } = await response.json();

      const decoded = JSON.parse(atob(access_token.split(".")[1]));
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      const profile = {
        sub: decoded.sub,
        email: decoded.email,
        roles: decoded.roles ?? [],
        name: userName,
      };

      const oidcSession = {
        access_token,
        id_token: id_token || "",
        token_type: "Bearer",
        expires_at: expiry,
        profile,
      };

      sessionStorage.setItem("oidc.user", JSON.stringify(oidcSession));

      setUser(profile.sub);
      setAccessToken(access_token);
      setRoles(profile.roles);
      setUserName(profile.name);
      setIsRestored(true);
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error("Login error", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("oidc.user");
    setUser(undefined);
    setAccessToken(undefined);
    setUserName(undefined);
    setRoles([]);
    setIsRestored(false);
    window.location.href = "/";
  };

  const refreshToken = async () => {
    const user = sessionStorage.getItem("oidc.user");
    if (!user) {
      logout?.();
      return;
    }

    try {
      const session = JSON.parse(user);
      const userId = session?.profile?.sub;

      if (!userId) {
        logout?.();
        return;
      }

      const query = new URLSearchParams({ user: userId });
      const url = `${API_BASE}/proxy/jwt?${query}`;
      const response = await fetch(url);
      const { token: access_token, id_token, userName } = await response.json();

      const decoded = JSON.parse(atob(access_token.split(".")[1]));
      const exp = Math.floor(Date.now() / 1000) + 3600;

      const profile = {
        sub: decoded.sub,
        email: decoded.email,
        roles: decoded.roles ?? [],
        name: userName,
      };

      const oidcSession = {
        access_token,
        id_token: id_token || "",
        token_type: "Bearer",
        expires_at: exp,
        profile,
      };

      sessionStorage.setItem("oidc.user", JSON.stringify(oidcSession));

      setUser(profile.sub);
      setAccessToken(access_token);
      setRoles(profile.roles);
      setUserName(profile.name);
      setIsRestored(true);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout?.();
    }
  };

  return (
    <EcoAuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        isLoading: isLoading,
        isRestored: isRestored,
        login,
        logout,
        refreshToken,
        user,
        userName,
        accessToken,
        roles,
        users,
      }}
    >
      {children}
    </EcoAuthContext.Provider>
  );
};
