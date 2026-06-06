import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDown, LogOut, Search } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    <div className="min-h-screen bg-[#0a0908] text-[#f4f1de] select-none fonte-corpo">
      
      {/* LINK DAS FONTES LUXO */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet" />

      <style>{`
        .fonte-titulo { font-family: 'Playfair Display', serif; }
        .fonte-corpo { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* HEADER REESTRUTURADO */}
      <header className="border-b border-[#d4af37]/20 bg-[#0a0908]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border border-[#d4af37] flex items-center justify-center text-xs font-medium tracking-widest text-[#d4af37] bg-[#0f0e0c]">
              W
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-xs font-bold tracking-widest text-white uppercase">Wedding Pass</h1>
              <p className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-light">Maison de Mariage</p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-stone-400 hover:text-[#d4af37] transition duration-200 font-semibold"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
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

        {/* COMPONENTE DA TABELA ISOLADO (Evita poluição de código e erros) */}
        <div className="w-full">
            <TabelaConvidados 
              dados={convidadosFiltrados} 
              isAdmin={false}
              onCheckIn={realizarCheckIn} 
            />
        </div>

      </main>
    </div>
  );
}