import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function PUT(request: NextRequest) {
  try {
    const { id, nome, email, funcao, status, senha } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório.' }, { status: 400 });
    }

    // 1. Atualizar dados no Auth (e-mail e opcionalmente senha)
    const authUpdatePayload: any = {
      email,
      user_metadata: { nome, funcao },
    };
    if (senha && senha.length >= 6) {
      authUpdatePayload.password = senha;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      authUpdatePayload
    );

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Atualizar metadados na tabela funsa_site_users
    const { error: dbError } = await supabaseAdmin
      .from('funsa_site_users')
      .update({ nome, email, funcao, status })
      .eq('id', id);

    if (dbError) {
      return NextResponse.json(
        { error: 'Erro ao atualizar dados: ' + dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Usuário atualizado com sucesso!' });
  } catch (err: any) {
    console.error('[update-user] Erro inesperado:', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
