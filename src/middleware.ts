import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware de sessão — roda em toda requisição para rotas /admin.
 *
 * Responsabilidades:
 * 1. Lê a sessão do cookie e renova o JWT automaticamente antes de expirar.
 *    Isso resolve o bug de "botões que param de funcionar" no Vercel —
 *    causado por JWT expirado sem renovação automática em produção.
 * 2. Escreve o token renovado de volta nos cookies da resposta.
 * 3. Redireciona para /admin/login se não houver sessão válida.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Renova a sessão e persiste nos cookies da resposta
  const { data: { session } } = await supabase.auth.getSession();

  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  // Sem sessão → redireciona para login
  if (!session && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Já logado tentando acessar /admin/login → redireciona para o painel
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  // Aplica apenas nas rotas do painel admin
  matcher: ['/admin/:path*'],
};
