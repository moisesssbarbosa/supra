import { useState, useEffect } from 'react';

export interface Convidado {
  id?: number; // O ID vira opcional, pois no cadastro o banco gera sozinho
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  mesa: number;
  status_checkin: boolean;
}

interface ModalProps {
  convidado: Convidado | null; // Se for null, o modo é "Criar"
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (dados: Convidado) => void;
}

// Objeto em branco para resetar o formulário no cadastro
const estadoInicial: Convidado = {
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  telefone: '',
  mesa: 1,
  status_checkin: false
};

export function ModalConvidado({ convidado, isOpen, onClose, onSalvar }: ModalProps) {
  const [formData, setFormData] = useState<Convidado>(estadoInicial);

  // Define se o modal está editando ou criando
  const modoEdicao = !!convidado;

  useEffect(() => {
    if (isOpen) {
      // Mantendo sua excelente sacada assíncrona para o Event Loop contra cascading renders
      const timer = setTimeout(() => {
        setFormData(convidado ? convidado : estadoInicial);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [convidado, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* Container Principal do Modal com Design de Luxo */}
      <div className="bg-[#0e0d0b] border border-[#d4af37]/20 w-full max-w-md shadow-2xl text-left">
        
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b border-stone-900">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold block mb-1">
            {modoEdicao ? "Maison Registry / Update" : "Maison Registry / New Entry"}
          </span>
          <h2 className="fonte-titulo text-2xl text-white font-light tracking-wide">
            {modoEdicao ? "Editar Convidado" : "Novo Convidado"}
          </h2>
          <p className="text-stone-400 text-xs font-light mt-1 tracking-wide">
            {modoEdicao ? "Atualize as credenciais e dados do convite." : "Preencha os campos para gerar um novo convite."}
          </p>
        </div>

        {/* Formulário com Inputs Slim */}
        <form className="p-6 space-y-5" onSubmit={(e) => {
          e.preventDefault();
          onSalvar(formData);
        }}>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Nome</label>
              <input
                type="text"
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 font-light tracking-wide"
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Sobrenome</label>
              <input
                type="text"
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 font-light tracking-wide"
                value={formData.sobrenome}
                onChange={e => setFormData({ ...formData, sobrenome: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">CPF</label>
              <input
                type="text"
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 font-light tracking-wide font-mono"
                value={formData.cpf}
                onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Telefone</label>
              <input
                type="text"
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 font-light tracking-wide font-mono"
                value={formData.telefone}
                onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">E-mail</label>
            <input
              type="email"
              className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 font-light tracking-wide"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Mesa</label>
              <input
                type="number"
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition duration-150 font-mono text-center text-[#d4af37]"
                value={formData.mesa}
                onChange={e => setFormData({ ...formData, mesa: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Status</label>
              <select
                className="w-full bg-[#0a0908] border border-stone-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition duration-150 tracking-wide appearance-none cursor-pointer"
                value={formData.status_checkin ? "true" : "false"}
                onChange={e => setFormData({ ...formData, status_checkin: e.target.value === "true" })}
              >
                <option value="false" className="bg-[#0e0d0b] text-stone-400">Pendente</option>
                <option value="true" className="bg-[#0e0d0b] text-[#d4af37]">Confirmado</option>
              </select>
            </div>
          </div>

          {/* Botões de Ação Minimalistas e Retos */}
          <div className="flex gap-3 pt-4 border-t border-stone-900">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 border border-stone-800 text-stone-400 text-xs font-bold uppercase tracking-[0.2em] bg-transparent hover:bg-white/2 hover:text-white transition duration-150"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="flex-1 px-4 py-3.5 bg-[#d4af37] hover:bg-[#bfa032] text-black text-xs font-bold uppercase tracking-[0.2em] transition shadow-xl"
            >
              {modoEdicao ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}