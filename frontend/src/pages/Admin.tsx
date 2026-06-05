import { useEffect, useState } from 'react';
import { TabelaConvidados } from '../components/TabelaConvidados';
import { ModalConvidado } from '../components/ModalConvidado';
import { useConvidados } from '../hooks/useConvidados';
import { type Convidado } from '../@types';

export function Admin() {
  // Puxando todas as funções que criamos no hook centralizado
  const { convidados, carregarConvidados, salvarConvidado, realizarCheckIn, deletarConvidado } = useConvidados();
  
  // Estados para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [convidadoSelecionado, setConvidadoSelecionado] = useState<Convidado | null>(null);

  // Estado para a barra de pesquisa por nome ou CPF
  const [pesquisa, setPesquisa] = useState('');

  // Carrega a lista assim que o Admin entra na tela
  useEffect(() => {
    carregarConvidados();
  }, [carregarConvidados]);

  // Filtra os convidados em tempo real baseado no input de pesquisa
  const convidadosFiltrados = convidados.filter(c => 
    c.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
    c.cpf.includes(pesquisa)
  );

  // Calcula os números para o Dashboard automaticamente
  const totalConvidados = convidados.length;
  const confirmados = convidados.filter(c => c.status_checkin).length;
  const pendentes = totalConvidados - confirmados;

  // Função disparada ao clicar no botão "Salvar" dentro do Modal
  const handleSalvar = async (dados: Convidado) => {
    const resultado = await salvarConvidado(dados);
    if (resultado.sucesso) {
      setIsModalOpen(false); // Fecha o modal se deu tudo certo
    } else {
      alert(resultado.erro); // Avisa se o Zod ou o banco barrou algo
    }
  };

  // Abre o modal limpo para cadastrar
  const handleAbrirCadastro = () => {
    setConvidadoSelecionado(null);
    setIsModalOpen(true);
  };

  // Abre o modal preenchido com o convidado selecionado para editar
  const handleAbrirEdicao = (id: number) => {
    const convidado = convidados.find(c => c.id === id);
    if (convidado) {
      setConvidadoSelecionado(convidado);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      
      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 p-6 flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">P</div>
            <h1 className="text-xl font-bold tracking-wider">PORTARIA</h1>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600/10 text-indigo-400 font-medium">
              📊 Painel Geral
            </a>
            <a href="/recepcao" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition">
              🚪 Recepção / Check-in
            </a>
          </nav>
        </div>
        <div className="border-t border-white/5 pt-4 text-xs text-slate-500">
          Painel Administrativo v1.0
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Convidados</h2>
            <p className="text-slate-400 mt-1">Monitore, edite e adicione pessoas ao evento em tempo real.</p>
          </div>
          <button
            onClick={handleAbrirCadastro}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition shadow-lg shadow-indigo-600/20 text-center"
          >
            + Novo Convidado
          </button>
        </div>

        {/* CARDS DE ESTATÍSTICA (DASHBOARD) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-sm">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total de Convidados</p>
            <p className="text-4xl font-extrabold mt-2 text-white">{totalConvidados}</p>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-sm">
            <p className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Confirmados (Check-in)</p>
            <p className="text-4xl font-extrabold mt-2 text-emerald-400">{confirmados}</p>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-sm">
            <p className="text-sm font-medium text-amber-400 uppercase tracking-wider">Pendentes</p>
            <p className="text-4xl font-extrabold mt-2 text-amber-400">{pendentes}</p>
          </div>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center">
          <input
            type="text"
            placeholder="🔍 Digite o nome ou CPF para buscar..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        {/* SEÇÃO DA TABELA */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-bold">Lista de Convites</h3>
          </div>
          
          <TabelaConvidados 
            dados={convidadosFiltrados} 
            isAdmin={true} 
            onEditar={handleAbrirEdicao}
            onCheckIn={realizarCheckIn}  
            onDeletar={deletarConvidado}
          />
        </div>
      </main>

      {/* MODAL GLOBAL (SERVE PARA CRIAR E EDITAR) */}
      <ModalConvidado 
        isOpen={isModalOpen} 
        convidado={convidadoSelecionado} 
        onClose={() => setIsModalOpen(false)} 
        onSalvar={handleSalvar}
      />
    </div>
  );
}