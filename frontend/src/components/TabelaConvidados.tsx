import { type Convidado } from "./ModalConvidado";

interface TabelaConvidadosProps {
  dados: Convidado[];
  onCheckIn?: (id: number) => void;
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
    <div className="w-full space-y-6">
      
      {/* 💻 VERSÃO DESKTOP / TABLET (Tabela Imponente) */}
      <div className="hidden md:block w-full overflow-hidden border border-stone-900 bg-[#0e0d0b] shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#d4af37]/20 bg-[#0a0908] text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-bold">
              <th className="px-6 py-5">NOME</th>
              <th className="px-6 py-5">SOBRENOME</th>
              <th className="px-6 py-5">EMAIL</th>
              <th className="px-6 py-5">TELEFONE</th>
              <th className="px-6 py-5 text-center">MESA</th>
              <th className="px-6 py-5 text-center">STATUS</th>
              {isAdmin && <th className="px-6 py-5 text-right">AÇÕES</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-900 text-stone-300 font-light tracking-wide text-sm">
            {dados.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} className="px-6 py-12 text-center text-stone-500 uppercase tracking-widest text-xs">
                  Nenhum convidado encontrado...
                </td>
              </tr>
            ) : (
              dados.map((convidado) => (
                <tr key={convidado.id} className="hover:bg-white/1 transition-colors duration-150">
                  <td className="px-6 py-5 font-medium text-white">{convidado.nome}</td>
                  <td className="px-6 py-5 text-stone-300">{convidado.sobrenome}</td>
                  <td className="px-6 py-5 text-stone-400 font-normal">{convidado.email}</td>
                  <td className="px-6 py-5 text-stone-400 font-mono text-xs">{convidado.telefone}</td>
                  <td className="px-6 py-5 text-center font-mono text-base text-[#d4af37]">{convidado.mesa}</td>
                  
                  {/* Coluna Check-in com o seu Toggle Customizado */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onCheckIn?.(convidado.id!)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          convidado.status_checkin ? "bg-[#d4af37]" : "bg-stone-800" 
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                            convidado.status_checkin ? "translate-x-5" : "translate-x-0" 
                          }`}
                        />
                      </button>
                      <span className={`text-[11px] uppercase tracking-wider font-bold min-w-18.75 text-left ${
                        convidado.status_checkin ? "text-[#d4af37]" : "text-stone-500"
                      }`}>
                        {convidado.status_checkin ? "Confirmado" : "Pendente"}
                      </span>
                    </div>
                  </td>

                  {/* Ações Administrativas */}
                  {isAdmin && (
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditar?.(convidado.id!);
                          }}
                          className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-black transition duration-150 active:scale-95"
                          title="Editar Convidado"
                        >
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletar?.(convidado.id!);
                          }}
                          className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold text-stone-400 border border-stone-800 hover:border-red-900 hover:text-red-400 bg-stone-900/20 transition duration-150 active:scale-95"
                          title="Excluir Convidado"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 VERSÃO MOBILE (Cards de Luxo Adaptivos) */}
      <div className="md:hidden space-y-4">
        {dados.length === 0 ? (
          <div className="py-12 text-center text-xs uppercase tracking-widest text-stone-500 border border-stone-900 bg-[#0e0d0b]">
            Nenhum convidado encontrado...
          </div>
        ) : (
          dados.map((convidado) => (
            <div key={convidado.id} className="border border-stone-900 bg-[#0e0d0b] p-5 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 text-left">
                  <h3 className="text-lg font-medium text-white tracking-wide truncate">
                    {convidado.nome} {convidado.sobrenome}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">{convidado.telefone}</p>
                  <p className="text-xs text-stone-400 truncate mt-0.5">{convidado.email}</p>
                </div>
                <div className="flex flex-col items-center shrink-0 border border-[#d4af37]/20 bg-[#0a0908] px-3 py-1.5 min-w-13.75">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/70 font-bold">Mesa</span>
                  <span className="text-lg font-mono font-bold text-white mt-0.5">{convidado.mesa}</span>
                </div>
              </div>

              {/* Linha Inferior com Controle de Status Interno */}
              <div className="flex items-center justify-between border-t border-stone-900 pt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onCheckIn?.(convidado.id!)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      convidado.status_checkin ? "bg-[#d4af37]" : "bg-stone-800" 
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        convidado.status_checkin ? "translate-x-5" : "translate-x-0" 
                      }`}
                    />
                  </button>
                  <span className={`text-[11px] uppercase tracking-wider font-bold ${
                    convidado.status_checkin ? "text-[#d4af37]" : "text-stone-500"
                  }`}>
                    {convidado.status_checkin ? "Confirmado" : "Pendente"}
                  </span>
                </div>

                {/* Botões Admin no rodapé do Card Mobile */}
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditar?.(convidado.id!);
                      }}
                      className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold text-[#d4af37] border border-[#d4af37]/30"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletar?.(convidado.id!);
                      }}
                      className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold text-stone-400 border border-stone-800"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}