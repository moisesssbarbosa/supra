import { useEffect, useState } from 'react';
import { FileDown, Search } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

// Importações baseadas na árvore de arquivos real do seu projeto (image_cf9e4f.png)
import { useConvidados } from '../hooks/useConvidados';
import { TabelaConvidados } from '../components/TabelaConvidados';

export function Recepcao() {
  // 1. Conexão real com a sua API através do seu hook customizado
  const { convidados, carregarConvidados, realizarCheckIn } = useConvidados();
  
  // Estados locais para controle de busca e operador
  const [pesquisa, setPesquisa] = useState("");

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

  // 2. Filtro dinâmico que alimenta a tabela e o relatório em tempo real
  const convidadosFiltrados = convidados?.filter(c  => 
    c.nome?.toLowerCase().includes(pesquisa.toLowerCase()) || 
    c.sobrenome?.toLowerCase().includes(pesquisa.toLowerCase())
  ) || [];

  const totalConfirmados = convidados?.filter(c  => c.status_checkin).length || 0;

  // 3. Sua função de exportação PDF corrigida e conectada com os dados da API
  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Senac Wedding - Lista de Presença", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
  
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 28);

    const colunas = ["Nome", "Sobrenome", "E-mail", "Telefone", "Mesa", "Status"];
    
    const linhas = convidadosFiltrados.map(c => [
      c.nome,
      c.sobrenome,
      c.email,
      c.telefone,
      c.mesa?.toString() || "N/A",
      c.status_checkin ? "Confirmado" : "Pendente"
    ]);

    autoTable(doc, {
      startY: 35,
      head: [colunas],
      body: linhas,
      styles: { font: "helvetica", fontSize: 9 },
      headStyles: { fillColor: [212, 175, 55] },
    });

    doc.save(`lista_presenca_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f4f1de] select-none flex fonte-corpo">
      
      {/* LINK DAS FONTES LUXO */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />

      <style>{`
        .fonte-titulo { font-family: 'Playfair Display', serif; }
        .fonte-corpo { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 🏛️ NOVA BARRA LATERAL NA RECEPÇÃO! */}
      <Sidebar />

      {/* CONTAINER DA DIREITA: Empilha Header + Conteúdo da Recepção */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER ISOLADO REUTILIZADO */}
        <Header />

        {/* CONTEÚDO */}
        <main className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto w-full overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            
            <div className="space-y-3 text-left">
              <div className="text-xs uppercase tracking-[0.5em] text-[#d4af37] font-bold">
                Recepção
              </div>
              <h1 className="fonte-titulo text-4xl sm:text-5xl text-white tracking-wide font-light">
                Lista de Convidados
              </h1>
              <p className="text-base text-stone-400 font-light tracking-wide mt-2">
                <span className="text-[#d4af37] font-semibold">{totalConfirmados}</span> de <span className="text-white font-semibold">{convidados?.length || 0}</span> presentes confirmados
              </p>
            </div>

            <button
              onClick={handleExportPdf}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] text-xs font-bold uppercase tracking-[0.35em] bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-black transition-colors duration-200 shadow-xl md:w-auto w-full"
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Gerar Relatório
            </button>
          </div>

          {/* Divisória */}
          <div className="h-0.5 bg-linear-to-r from-transparent via-[#d4af37]/60 to-transparent my-10 sm:my-12" />

          {/* BARRA DE PESQUISA */}
          <div className="mb-10 text-left">
            <div className="relative border-b-2 border-[#3d2f00] focus-within:border-[#d4af37] transition duration-200 max-w-xl pb-2">
              <Search className="absolute left-0 bottom-4 h-5 w-5 text-[#856600]" />
              <input
                type="text"
                placeholder="Buscar convidado por nome..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full bg-transparent border-0 pl-8 pr-4 text-white placeholder-stone-600 focus:outline-none focus:ring-0 h-12 text-lg font-light tracking-wide"
              />
            </div>
          </div>

          {/* COMPONENTE DA TABELA ISOLADO */}
          <div className="w-full text-left">
            <TabelaConvidados 
              dados={convidadosFiltrados} 
              isAdmin={false}
              onCheckIn={realizarCheckIn} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}