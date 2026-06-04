import { type Convidado } from "./ModalConvidado";

interface TabelaConvidadosProps {
    dados: Convidado[];
    onCheckIn?: (id: number) => void; // Ajustado para bater com o handleCheckIn da Recepção
    onEditar?: (id: number) => void;
    onDeletar?: (id: number) => void;
    isAdmin: boolean;
}

export function TabelaConvidados({
    dados, 
    onCheckIn, 
    onEditar,
    onDeletar,
    isAdmin
}: TabelaConvidadosProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/10 text-xs font-semibold uppercase tracking-wider text-slate-200">
            <th className="px-6 py-4">NOME</th>
            <th className="px-6 py-4">SOBRENOME</th>
            <th className="px-6 py-4">EMAIL</th>
            <th className="px-6 py-4">TELEFONE</th>
            <th className="px-6 py-4">MESA</th>
            <th className="px-6 py-4 text-center">STATUS</th>
            {isAdmin && <th className="px-6 py-4 text-right">AÇÕES</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {dados.length === 0 ? (
            <tr>
              {/* O colSpan agora cobre dinamicamente todas as colunas para não quebrar o layout */}
              <td colSpan={isAdmin ? 7 : 6} className="px-6 py-8 text-center text-slate-400 italic">
                Nenhum convidado encontrado...
              </td>
            </tr>
          ) : (
            dados.map((convidado) => (
              <tr key={convidado.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-white">{convidado.nome}</td>
                <td className="px-6 py-4 font-medium text-white">{convidado.sobrenome}</td>
                <td className="px-6 py-4 font-medium text-white">{convidado.email}</td>
                <td className="px-6 py-4 font-medium text-white">{convidado.telefone}</td>
                <td className="px-6 py-4 font-medium text-white">{convidado.mesa}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => onCheckIn?.(convidado.id!)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            // 🔥 CORREÇÃO: Garante que o fundo do botão muda de cor na hora
                            convidado.status_checkin ? "bg-emerald-500" : "bg-slate-700" 
                        }`}
                        >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            // 🔥 CORREÇÃO: Garante que a bolinha corre para a direita ou esquerda na hora
                            convidado.status_checkin ? "translate-x-5" : "translate-x-0" 
                            }`}
                        />
                    </button>

                        {/* 🔥 CORREÇÃO: O texto muda na mesma hora */}
                    <span className="text-xs">
                        {convidado.status_checkin ? "Confirmado" : "Pendente"}
                    </span>
                  </div>
                </td>

                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // ⚠️ PROTEÇÃO EXTRA
                          onEditar?.(convidado.id!);
                        }}
                        className="rounded bg-amber-500/10 p-1.5 text-xs font-medium text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition active:scale-95"
                        title="Editar Convidado"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // ⚠️ ISSO AQUI EVITA O VAZAMENTO DO CLIQUE E O ERRO 403
                          onDeletar?.(convidado.id!);
                        }}
                        className="rounded bg-rose-500/10 p-1.5 text-xs font-medium text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition active:scale-95"
                        title="Excluir Convidado"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}