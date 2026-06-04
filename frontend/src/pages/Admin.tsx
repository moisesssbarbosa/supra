import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TabelaConvidados } from "../components/TabelaConvidados";
import { ModalConvidado, type Convidado } from "../components/ModalConvidado";
import { useAuth } from "../context/useAuth";

export function Admin() {
  const { usuario, signOut } = useAuth();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [busca, setBusca] = useState("");

  const carregarConvidados = async () => {
    try {
      const response = await api.get("/convidados");
      setConvidados(response.data);
    } catch (error) {
      console.error("Erro ao carregar os convidados:", error);
    }
  }

  // Substitua o seu bloco antigo pelo bloco abaixo (Linhas 21 a 32):
    useEffect(() => {
      // 🔥 Função autoinvocável isola o escopo assíncrono para o linter ficar feliz
      const buscarDados = async () => {
        await carregarConvidados();
      };
      buscarDados(); 
    }, []); // Array vazio garante que roda apenas uma vez ao montar a tela

  // Regras de negócio do Dashboard calculadas no Front-end com os dados da API
  const totalConvidados = convidados.length;
  const totalConfirmados = convidados.filter((c) => c.status_checkin === true).length;
  const totalPendentes = totalConvidados - totalConfirmados;

    async function handleCheckInAdmin(id: number) {
      const convidadoAtual = convidados.find(c => c.id === id);
      if (!convidadoAtual) return;

      const novoStatus = !convidadoAtual.status_checkin;

      try {
        await api.patch(`/convidados/${id}/checkin`, { status_checkin: novoStatus });
        // 🔥 PADRÃO DE MERCADO: Força a busca dos dados limpos da API imediatamente
        await carregarConvidados(); 
      } catch (error) {
        console.error("Erro no check-in do Admin:", error);
        alert("Erro ao alterar o status.");
      }
    }

  async function handleDeletarConvidado(id: number) {
    if (confirm("Tem certeza que deseja remover este convidado do evento?")) {
      try {
        await api.delete(`/convidados/${id}`);
        // 🔥 PADRÃO DE MERCADO: Puxa a lista nova sem o deletado e recalcula o dashboard na hora
        await carregarConvidados(); 
      } catch (error) {
        console.error("Erro ao deletar convidado:", error);
        alert("Erro ao tentar remover o convidado.");
      }
    }
  }

  const convidadosFiltrados = convidados.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.sobrenome.toLowerCase().includes(busca.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [convidadoParaEditar, setConvidadoParaEditar] = useState<Convidado | null>(null);

  function handleAbrirCadastro() {
    setConvidadoParaEditar(null); // Limpa o estado para indicar Novo Convidado
    setIsModalOpen(true);
  }

  // 2. Função para abrir o modal
  function handleAbrirEdicao(id: number) {
    const convidado = convidados.find(c => c.id === id);
    if (convidado) {
      setConvidadoParaEditar(convidado);
      setIsModalOpen(true);
    }
  }

  async function handleSalvarConvidado(dados: Convidado) {
    try {
      if (dados.id) {
        // 📝 Se tem ID, significa que estamos EDITANDO (PUT)
        await api.put(`/convidados/${dados.id}`, dados);
        alert("Convidado atualizado com sucesso!");
      } else {
        // ➕ Se NÃO tem ID, significa que estamos CRIANDO (POST)
        await api.post('/convidados', dados);
        alert("Convidado cadastrado com sucesso!");
      }
      
      setIsModalOpen(false); // Fecha o modal
      await carregarConvidados(); // 🔥 Faz o refetch e atualiza a tabela e dashboard na hora!
      
    } catch (error: unknown) { // ⚠️ Trocado de 'any' para 'unknown'
      console.error("Erro na operação:", error);
      
      // 🔥 Criamos uma constante tipando o erro temporariamente para extrair a resposta da API
      const err = error as { response?: { data?: { error?: string } } };
      
      const mensagemDoBack = err.response?.data?.error || "Erro de conexão.";
      alert(`Erro: ${mensagemDoBack}`);
    }
  }

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
            onClick={handleAbrirCadastro}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            + Adicionar Convidado
          </button>
        </div>

        {/* Tabela Administrativa Ativada */}
        <TabelaConvidados 
          dados={convidadosFiltrados} 
          onCheckIn={handleCheckInAdmin}
          onDeletar={handleDeletarConvidado}
          onEditar={handleAbrirEdicao}
          isAdmin={true} 
        />

        <ModalConvidado
          isOpen={isModalOpen} 
          convidado={convidadoParaEditar} 
          onClose={() => setIsModalOpen(false)} 
          onSalvar={handleSalvarConvidado}
        />
      </div>
    </div>
  );
}