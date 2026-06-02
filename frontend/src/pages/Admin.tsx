import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TabelaConvidados } from "../components/TabelaConvidados";
import { useAuth } from "../context/useAuth";

interface Convidado {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    mesa: number;
    status_checkin: boolean;
}

export function Admin() {
  const { usuario, signOut } = useAuth();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [busca, setBusca] = useState("");

  // Substitua o seu bloco antigo pelo bloco abaixo (Linhas 21 a 32):
    useEffect(() => {
    async function carregarConvidados() {
        try {
        const response = await api.get("/convidados");
        setConvidados(response.data);
        } catch (error) {
        console.error("Erro ao carregar os convidados:", error);
        }
    }

    carregarConvidados();
    }, []); // Array vazio garante que roda apenas uma vez ao montar a tela

  // Regras de negócio do Dashboard calculadas no Front-end com os dados da API
  const totalConvidados = convidados.length;
  const totalConfirmados = convidados.filter((c) => c.status_checkin === true).length;
  const totalPendentes = totalConvidados - totalConfirmados;

    async function handleCheckInAdmin(id: number) {
        // 1. Localiza o convidado pelo ID
        const convidadoIndex = convidados.findIndex(c => c.id === id);
        if (convidadoIndex === -1) return;

        const convidadoAtual = convidados[convidadoIndex];
        const novoStatus = !convidadoAtual.status_checkin;

        try {
            // 2. Avisa o Back-end
            await api.patch(`/convidados/${id}/checkin`, { status_checkin: novoStatus }); 
            
            // 3. ATUALIZAÇÃO FORÇADA DO ESTADO (Imutabilidade)
            const novosConvidados = [...convidados]; // Cria uma cópia real do array
            novosConvidados[convidadoIndex] = { 
            ...convidadoAtual, 
            status_checkin: novoStatus 
            };
            
            setConvidados(novosConvidados); // O React VÊ a mudança agora
            
        } catch (error) {
            console.error("Erro ao alternar check-in:", error);
            alert("Erro de sincronização. Tente novamente.");
        }
    }

  async function handleDeletarConvidado(id: number) {
    if (confirm("Tem certeza que deseja remover este convidado do evento?")) {
      try {
        await api.delete(`/convidados/${id}`);
        setConvidados((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error(error);
        alert("Erro ao deletar convidado.");
      }
    }
  }

  function handleEditarConvidado(id: number) {
    // Pronto para você integrar seu modal de edição ou redirecionamento futuramente
    alert(`Abrir edição do convidado ID: ${id}`);
  }

  const convidadosFiltrados = convidados.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.sobrenome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Topbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Painel Administrativo</h1>
            <p className="mt-2 text-sm text-slate-400">
                Operador(a): <span className="text-indigo-400 font-semibold">{usuario?.nome}</span> | Controle de entrada em tempo real.
            </p>
          </div>
          <button onClick={signOut} className="self-start sm:self-center px-4 py-2 text-xs font-semibold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition">
            Sair do Painel
          </button>
        </div>

        {/* CONTORNO DO DASHBOARD (MÉTRICAS OBRIGATÓRIAS) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-md">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total de Convidados</p>
            <p className="mt-2 text-3xl font-semibold text-white">{totalConvidados}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 shadow-md">
            <p className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Confirmados (Check-in)</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-400">{totalConfirmados}</p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 shadow-md">
            <p className="text-sm font-medium text-amber-400 uppercase tracking-wider">Pendentes</p>
            <p className="mt-2 text-3xl font-semibold text-amber-400">{totalPendentes}</p>
          </div>
        </div>

        {/* Filtro e Ações */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Filtrar na planilha gerencial..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button 
            onClick={() => alert("Abrir modal de Novo Cadastro")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-medium text-sm rounded-lg transition shadow active:scale-95 text-white"
          >
            + Cadastrar Convidado
          </button>
        </div>

        {/* Tabela Administrativa Ativada */}
        <TabelaConvidados 
          dados={convidadosFiltrados} 
          onCheckIn={handleCheckInAdmin}
          onDeletar={handleDeletarConvidado}
          onEditar={handleEditarConvidado}
          isAdmin={true} 
        />

      </div>
    </div>
  );
}