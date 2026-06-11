'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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

  const fetchRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('funsa_site_users')
        .select('funcao')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        // Ignore "no rows" error (PGRST116) - user may not have a DB record yet
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
  };

  useEffect(() => {
    let active = true;

    // Busca a sessão atual ao iniciar
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        const userRole = await fetchRole(currentUser.id);
        if (active) {
          setRole(userRole);
          setLoading(false);
        }
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    // Ouve alterações (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        // Não recoloca loading=true se o usuário já estava autenticado
        // (evita flash branco ao trocar de aba)
        const userRole = await fetchRole(currentUser.id);
        if (active) {
          setRole(userRole);
          setLoading(false);
        }
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

