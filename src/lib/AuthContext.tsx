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

  // Sincroniza sessão atual (usado no mount e ao voltar para a aba)
  const syncSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const userRole = await fetchRole(currentUser.id);
        setRole(userRole);
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error('Error syncing session:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchRole]);

  useEffect(() => {
    let active = true;

    // Busca a sessão inicial
    syncSession();

    // Ouve todas as mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) return;

      console.debug('[Auth] Event:', event);

      const currentUser = session?.user ?? null;

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setRole(null);
        setLoading(false);
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
          const userRole = await fetchRole(currentUser.id);
          if (active) setRole(userRole);
        } else {
          setRole(null);
        }
        if (active) setLoading(false);
        return;
      }

      // Qualquer outro evento — sincroniza normalmente
      setUser(currentUser);
      if (currentUser) {
        const userRole = await fetchRole(currentUser.id);
        if (active) setRole(userRole);
      } else {
        setRole(null);
      }
      if (active) setLoading(false);
    });

    // Re-verifica sessão quando o usuário volta à aba
    // Resolve o bug de botões que param de funcionar após longa inatividade
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncSession();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchRole, syncSession]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
