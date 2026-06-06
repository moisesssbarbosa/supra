import { useEffect, useState } from 'react';
import { LayoutDashboard, DoorOpen, Plus, Search } from 'lucide-react';
import { TabelaConvidados } from '../components/TabelaConvidados';
import { ModalConvidado } from '../components/ModalConvidado';
import { useConvidados } from '../hooks/useConvidados';
import { type Convidado } from '../@types';

export function Admin() {
  // Conexão nativa com suas funções da API
  const { convidados, carregarConvidados, salvarConvidado, realizarCheckIn, deletarConvidado } = useConvidados();
  
  // Estados de controle do Modal e Busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [convidadoSelecionado, setConvidadoSelecionado] = useState<Convidado | null>(null);
  const [pesquisa, setPesquisa] = useState('');

  // Sincronização com o Banco de Dados
  useEffect(() => {
    // 1. Carrega imediatamente quando a tela abre
    carregarConvidados();

    // 2. 🔥 Cria um cronômetro que puxa os dados do banco a cada 2 segundos (2000ms)
    const intervalo = setInterval(() => {
      carregarConvidados();
    }, 2000);

    // 3. Importante: Limpa o cronômetro se o usuário sair da tela (evita vazamento de memória)
    return () => clearInterval(intervalo);
  }, [carregarConvidados]);

  // Filtro inteligente
  const convidadosFiltrados = convidados.filter(c => 
    c.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
    (c.cpf && c.cpf.includes(pesquisa))
  );

  // Cálculos dinâmicos das métricas do Dashboard
  const totalConvidados = convidados.length;
  const confirmados = convidados.filter(c => c.status_checkin).length;
  const pendentes = totalConvidados - confirmados;

  const handleSalvar = async (dados: Convidado) => {
    const resultado = await salvarConvidado(dados);
    if (resultado.sucesso) {
      setIsModalOpen(false);
    } else {
      alert(resultado.erro);
    }
  };

  const handleAbrirCadastro = () => {
    setConvidadoSelecionado(null);
    setIsModalOpen(true);
  };

  const handleAbrirEdicao = (id: number) => {
    const convidado = convidados.find(c => c.id === id);
    if (convidado) {
      setConvidadoSelecionado(convidado);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f4f1de] select-none flex fonte-corpo">
      
      {/* 📥 INJEÇÃO DA IDENTIDADE TIPOGRÁFICA */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />

      <style>{`
        .fonte-titulo { font-family: 'Playfair Display', serif; }
        .fonte-corpo { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 🏛️ 1. BARRA LATERAL (SIDEBAR DE LUXO) */}
      <aside className="w-64 bg-[#0a0908] border-r border-[#d4af37]/20 p-6 flex-col justify-between hidden lg:flex">
        <div className="space-y-10">
          
          {/* Logo Corporativa no Estilo Maison */}
          <div className="flex items-center gap-4 py-2">
            <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-xs font-bold tracking-widest text-[#d4af37] bg-[#0f0e0c]">
              W
            </div>
            <div className="text-left">
              <h1 className="text-xs font-bold tracking-widest text-white uppercase">Wedding Pass</h1>
              <p className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-light">Administration</p>
            </div>
          </div>

          {/* Navegação Limpa */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.25em] text-[#d4af37] bg-[#d4af37]/5 font-bold border-l-2 border-[#d4af37] transition">
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Painel Geral</span>
            </a>
            <a href="/recepcao" className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.25em] text-stone-400 hover:text-white transition font-medium">
              <DoorOpen className="h-4 w-4 shrink-0" />
              <span>Recepção</span>
            </a>
          </nav>
        </div>

        <div className="border-t border-stone-900 pt-4 text-[10px] uppercase tracking-widest text-stone-600 font-light">
          Maison de Mariage v1.0
        </div>
      </aside>

      {/* 🏛️ 2. PAINEL DE CONTEÚDO PRINCIPAL REORGANIZADO */}
      <main className="flex-1 p-6 md:p-12 space-y-12 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* CABEÇALHO DA TELA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="text-xs uppercase tracking-[0.5em] text-[#d4af37] font-bold">
              Maison Dashboard
            </div>
            <h2 className="fonte-titulo text-3xl sm:text-4xl text-white tracking-wide font-light">
              Gerenciamento de Convidados
            </h2>
            <p className="text-sm text-stone-400 font-light tracking-wide">
              Controle de acessos, modificações de convites e monitoramento em tempo real.
            </p>
          </div>

          <button
            onClick={handleAbrirCadastro}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#d4af37] hover:bg-[#bfa032] text-black text-xs font-bold uppercase tracking-[0.3em] transition shadow-xl"
          >
            <Plus className="h-4 w-4" />
            Novo Convidado
          </button>
        </div>

        {/* 📊 3. CARDS DE METRICAS SLIM LUXURY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="border border-stone-900 bg-[#0e0d0b] p-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 h-0.5 w-12 bg-stone-700" />
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.25em]">Total de Convites</p>
            <p className="text-4xl font-light mt-3 text-white tracking-tight">{totalConvidados}</p>
          </div>

          <div className="border border-[#d4af37]/30 bg-[#d4af37]/5 p-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 h-0.5 w-12 bg-[#d4af37]" />
            <p className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.25em]">Presenças Confirmadas</p>
            <p className="text-4xl font-light mt-3 text-[#d4af37] tracking-tight">{confirmados}</p>
          </div>

          <div className="border border-stone-900 bg-[#0e0d0b] p-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 h-0.5 w-12 bg-amber-700/40" />
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.25em]">Acessos Pendentes</p>
            <p className="text-4xl font-light mt-3 text-amber-500 tracking-tight">{pendentes}</p>
          </div>

        </div>

        {/* 🔍 4. FILTRO DE BUSCA MINIMALISTA */}
        <div className="text-left">
          <div className="relative border-b-2 border-[#3d2f00] focus-within:border-[#d4af37] transition duration-200 max-w-xl pb-2">
            <Search className="absolute left-0 bottom-4 h-5 w-5 text-[#856600]" />
            <input
              type="text"
              placeholder="Buscar por nome ou documento..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-full bg-transparent border-0 pl-8 pr-4 text-white placeholder-stone-600 focus:outline-none focus:ring-0 h-12 text-lg font-light tracking-wide"
            />
          </div>
        </div>

        {/* 🏛️ 5. ENVELOPE DA TABELA INTEGRADA */}
        <div className="space-y-4 text-left">
          <div className="border-b border-stone-900 pb-4">
            <h3 className="text-xs uppercase tracking-[0.35em] text-stone-400 font-bold">Registros de Convites Ativos</h3>
          </div>
          
          {/* Sua tabela customizada linda e responsiva */}
          <TabelaConvidados 
            dados={convidadosFiltrados} 
            isAdmin={true} 
            onEditar={handleAbrirEdicao}
            onCheckIn={realizarCheckIn}  
            onDeletar={deletarConvidado}
          />
        </div>
      </main>

      {/* MODAL GLOBAL DE CADASTRO / EDIÇÃO */}
      <ModalConvidado 
        isOpen={isModalOpen} 
        convidado={convidadoSelecionado} 
        onClose={() => setIsModalOpen(false)} 
        onSalvar={handleSalvar}
      />
    </div>
  );
}