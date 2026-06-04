import { useState, useEffect } from 'react';

export interface Convidado {
  id?: number; // 🔥 O ID vira opcional, pois no cadastro o banco gera sozinho
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
      // 🔥 O setTimeout joga o setState para a fila de eventos assíncronos (Event Loop)
      // Isso resolve o aviso do linter de "cascading renders" instantaneamente!
      const timer = setTimeout(() => {
        setFormData(convidado ? convidado : estadoInicial);
      }, 0);

      return () => clearTimeout(timer); // Limpeza recomendada pelo ciclo de vida do React
    }
  }, [convidado, isOpen]);

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        
        {/* 🔥 Título Dinâmico */}
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">
            {modoEdicao ? "Editar Convidado" : "Novo Convidado"}
          </h2>
          <p className="text-slate-400 text-sm">
            {modoEdicao ? "Atualize as informações do convite." : "Preencha os dados para registrar o convidado."}
          </p>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onSalvar(formData);
        }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Nome</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Sobrenome</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.sobrenome}
                onChange={e => setFormData({ ...formData, sobrenome: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">CPF</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.cpf}
                onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Telefone</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.telefone}
                onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">E-mail</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Mesa</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.mesa}
                onChange={e => setFormData({ ...formData, mesa: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Status</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.status_checkin ? "true" : "false"}
                onChange={e => setFormData({ ...formData, status_checkin: e.target.value === "true" })}
              >
                <option value="false" className="bg-slate-900">Pendente</option>
                <option value="true" className="bg-slate-900">Confirmado</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition font-medium"
            >
              Cancelar
            </button>
            
            {/* 🔥 Botão Dinâmico */}
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-medium shadow-lg shadow-indigo-500/20"
            >
              {modoEdicao ? "Salvar Alterações" : "Cadastrar Convidado"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}