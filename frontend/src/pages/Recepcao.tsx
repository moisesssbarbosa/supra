import { useEffect, useState } from "react";
import { api } from "../services/api"; 
import { TabelaConvidados } from "../components/TabelaConvidados";
import { type Convidado } from "../components/ModalConvidado";
import { useAuth } from "../context/useAuth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Recepcao() {
  const { usuario, signOut } = useAuth(); // Corrigido: Chamando o hook corretamente como função
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarConvidados() {
      try {
        const response = await api.get("/convidados");
        setConvidados(response.data);
      } catch (error) {
        console.error("Erro ao carregar os convidados da API:", error);
      }
    }
    carregarConvidados();
  }, []);

    async function handleCheckIn(id: number) {
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

  const convidadosFiltrados = convidados.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) || 
    c.sobrenome.toLowerCase().includes(busca.toLowerCase())
  );

  function handleGerarPDF() {
  // 1. Cria a instância do documento PDF
  const doc = new jsPDF();

  // 2. Adiciona um título estilizado no topo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Senac Wedding - Lista de Presença", 14, 20);

  // Subtítulo com dados do operador
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  const operador = usuario?.nome || "Recepção";
  doc.text(`Gerado por: ${operador} | Data: ${new Date().toLocaleDateString()}`, 14, 28);

  // 3. Mapeia os convidados filtrados para o formato que a tabela do jsPDF aceita
  const colunas = ["Nome", "Sobrenome", "E-mail", "Telefone", "Mesa", "Status"];
  
  const linhas = convidadosFiltrados.map(c => [
    c.nome,
    c.sobrenome,
    c.email,
    c.telefone,
    c.mesa.toString(),
    c.status_checkin ? "Confirmado" : "Pendente"
  ]);

  // 4. Desenha a tabela automaticamente
  autoTable(doc, {
    startY: 35,
    head: [colunas],
    body: linhas,
    styles: { font: "helvetica", fontSize: 9 },
    headStyles: { fillColor: [79, 70, 229] }, // Cor Indigo igual ao seu tema do Tailwind
    alternateRowStyles: { fillColor: [245, 247, 250] } // Efeito zebra cinza claro
  });

  // 5. Faz o download direto do arquivo
  doc.save("lista-convidados-wedding.pdf");
}

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Portaria Geral</h1>
            <p className="mt-2 text-sm text-slate-400">
                Operador(a): <span className="text-indigo-400 font-semibold">{usuario?.nome}</span> | Controle de entrada em tempo real.
            </p>
          </div>
          <button 
            onClick={handleGerarPDF}
            className="px-4 py-2 text-xs font-semibold uppercase bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition shadow active:scale-95"
            >
            📄 Gerar Relatório PDF
            </button>
          <button onClick={signOut} className="self-start sm:self-center px-4 py-2 text-xs font-semibold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition">
            Sair
          </button>
        </div>

        <div className="w-full max-w-md">
          <label htmlFor="search" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
            Buscar Convidado
          </label>
          <input
            id="search"
            type="text"
            placeholder="Digite o nome para filtrar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Passando isAdmin como false explicitamente para ocultar botões de CRUD na Recepção */}
        <TabelaConvidados dados={convidadosFiltrados} onCheckIn={handleCheckIn} isAdmin={false} />

      </div>
    </div>
  );
}