import React, { useContext } from 'react';
import { LayoutDashboard, DoorOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho conforme suas pastas

export function Sidebar() {
  // 🔐 1. PUXA OS DADOS DO USUÁRIO LOGADO DIRETO DO CONTEXTO GLOBAL
  const { usuario } = useContext(AuthContext);

  // 🧭 2. IDENTIFICA A PÁGINA ATUAL PELA URL DO NAVEGADOR
  const pathname = window.location.pathname;
  
  // Se a rota for /dashboard ou a raiz de controle, ativa o Painel Geral
  const isDashboardPage = pathname.includes('dashboard') || pathname === '#';
  const isRecepcaoPage = pathname.includes('recepcao');

  const handleNavegarDashboard = (e: React.MouseEvent) => {
    // Regra de Negócio: Se cargo for false (Recepcionista), bloqueia o acesso
    if (usuario && usuario.cargo === false) {
      e.preventDefault(); // Trava a navegação do link <a>
      alert("⚠️ Acesso Restrito: Apenas usuários com cargo Administrativo podem acessar o Dashboard.");
    }
  };

  return (
    <aside className="w-64 bg-[#0a0908] border-r border-[#d4af37]/20 p-6 flex-col justify-between hidden lg:flex h-screen sticky top-0">
      <div className="space-y-10">
        
        {/* Logo Corporativa no Estilo Maison */}
        <div className="flex items-center gap-4 py-2">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-xs font-bold tracking-widest text-[#d4af37] bg-[#0f0e0c]">
            W
          </div>
          <div className="text-left">
            <h1 className="text-xs font-bold tracking-widest text-white uppercase">Wedding Pass</h1>
            <p className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-light">
              {usuario?.cargo ? "Maison Admin" : "Maison Staff"}
            </p>
          </div>
        </div>

        {/* Navegação Dinâmica Baseada em Rotas e Permissões */}
        <nav className="space-y-2 text-left">
          
          {/* LINK: PAINEL GERAL (DASHBOARD) */}
          <a 
            href="/dashboard" 
            onClick={handleNavegarDashboard}
            className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.25em] transition border-l-2 ${
              isDashboardPage 
                ? "text-[#d4af37] bg-[#d4af37]/5 font-bold border-[#d4af37]" 
                : "text-stone-400 hover:text-white border-transparent font-medium"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Painel Geral</span>
          </a>

          {/* LINK: RECEPÇÃO */}
          <a 
            href="/recepcao" 
            className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.25em] transition border-l-2 ${
              isRecepcaoPage 
                ? "text-[#d4af37] bg-[#d4af37]/5 font-bold border-[#d4af37]" 
                : "text-stone-400 hover:text-white border-transparent font-medium"
            }`}
          >
            <DoorOpen className="h-4 w-4 shrink-0" />
            <span>Recepção</span>
          </a>

        </nav>
      </div>

      {/* Identificação sutil do usuário conectado no rodapé da Sidebar */}
      <div className="border-t border-stone-900 pt-4 text-left space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-white font-medium truncate">
          {usuario?.nome || "Maison Guest"}
        </p>
        <p className="text-[9px] tracking-wider text-stone-600 uppercase font-light">
          Maison de Mariage v1.0
        </p>
      </div>
    </aside>
  );
}