'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  role: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

// Cache da role em sessionStorage: resolve instantâneo em visitas repetidas
const roleCache = {
  get(userId: string): string | null | undefined {
    try {
      const val = sessionStorage.getItem(`funsa_role_${userId}`);
      return val === null ? undefined : (val === '' ? null : val);
    } catch { return undefined; }
  },
  set(userId: string, role: string | null) {
    try { sessionStorage.setItem(`funsa_role_${userId}`, role ?? ''); } catch {}
  },
  clear() {
    try {
      Object.keys(sessionStorage)
        .filter(k => k.startsWith('funsa_role_'))
        .forEach(k => sessionStorage.removeItem(k));
    } catch {}
  },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = useCallback(async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('funsa_site_users')
        .select('funcao')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Error fetching user role:', error.message ?? error);
        }
        return null;
      }
      return data?.funcao ?? null;
    } catch (err) {
      console.error('Error in fetchRole:', err);
      return null;
    }
  }, []);

  // Resolve role: usa cache para resultado imediato, valida no background
  const resolveRole = useCallback(async (
    userId: string,
    done: (v: boolean) => void,
    isActive: () => boolean,
  ) => {
    const cached = roleCache.get(userId);

    if (cached !== undefined) {
      // Resultado imediato do cache
      if (isActive()) setRole(cached);
      done(false);
      // Valida silenciosamente em background
      fetchRole(userId).then(fresh => {
        if (!isActive()) return;
        setRole(fresh);
        roleCache.set(userId, fresh);
      }).catch(() => {});
      return;
    }

    // Primeira visita: busca no banco
    const fresh = await fetchRole(userId);
    if (isActive()) {
      setRole(fresh);
      roleCache.set(userId, fresh);
    }
    done(false);
  }, [fetchRole]);

  const syncSession = useCallback(async (isActive: () => boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      if (isActive()) setUser(currentUser);

      if (!currentUser) {
        if (isActive()) { setRole(null); setLoading(false); }
        roleCache.clear();
        return;
      }

      await resolveRole(currentUser.id, (v) => { if (isActive()) setLoading(v); }, isActive);
    } catch (err) {
      console.error('Error syncing session:', err);
      if (isActive()) setLoading(false);
    }
  }, [resolveRole]);

  useEffect(() => {
    let alive = true;
    const isActive = () => alive;

    syncSession(isActive);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!alive) return;
      console.debug('[Auth] Event:', event);
      const currentUser = session?.user ?? null;

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setRole(null);
        setLoading(false);
        roleCache.clear();
        return;
      }

      if (
        event === 'TOKEN_REFRESHED' ||
        event === 'SIGNED_IN' ||
        event === 'USER_UPDATED' ||
        event === 'INITIAL_SESSION'
      ) {
        setUser(currentUser);
        if (currentUser) {
          await resolveRole(currentUser.id, (v) => { if (alive) setLoading(v); }, isActive);
        } else {
          setRole(null);
          if (alive) setLoading(false);
        }
        return;
      }

      // Qualquer outro evento
      setUser(currentUser);
      if (currentUser) {
        await resolveRole(currentUser.id, (v) => { if (alive) setLoading(v); }, isActive);
      } else {
        setRole(null);
        if (alive) setLoading(false);
      }
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncSession(isActive);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      alive = false;
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [syncSession, resolveRole]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
