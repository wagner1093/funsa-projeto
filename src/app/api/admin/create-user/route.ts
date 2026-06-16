import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Esta rota usa a SERVICE ROLE KEY para criar usuários no Supabase Auth
// A chave de serviço NUNCA deve ser exposta no cliente
const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => fn(),
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const { nome, email, senha, funcao, status } = await request.json();

    if (!email || !senha || !nome) {
      return NextResponse.json(
        { error: 'Nome, e-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres.' },
        { status: 400 }
      );
    }

    // 1. Criar o usuário no Supabase Auth com e-mail e senha
    const supabaseAdmin = getSupabaseAdmin();
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true, // Confirma o e-mail automaticamente
      user_metadata: {
        nome,
        funcao: funcao || 'admin',
      },
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        return NextResponse.json(
          { error: 'Este e-mail já está cadastrado no sistema.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Salvar metadados na tabela funsa_site_users
    const { error: dbError } = await supabaseAdmin
      .from('funsa_site_users')
      .insert({
        id: authData.user.id, // Usar o mesmo ID do auth para vincular
        site_id: '18a32bda-97fc-4dc6-b438-8d0988207f84',
        nome,
        email,
        funcao: funcao || 'admin',
        status: status || 'ativo',
      });

    if (dbError) {
      // Se falhou ao salvar no banco, remover o usuário do auth para não ficar órfão
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Erro ao salvar dados do usuário: ' + dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso!',
      userId: authData.user.id,
    });
  } catch (err: any) {
    console.error('[create-user] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
