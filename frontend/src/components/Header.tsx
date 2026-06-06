import { LogOut } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-[#d4af37]/20 bg-[#0a0908] w-full">
      <div className="px-6 sm:px-10 py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full border border-[#d4af37] flex items-center justify-center text-xs font-medium tracking-widest text-[#d4af37] bg-[#0f0e0c]">
            W
          </div>
          <div className="text-left hidden sm:block">
            <h1 className="text-xs font-bold tracking-widest text-white uppercase">Wedding Pass</h1>
            <p className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-light">Maison de Mariage</p>
          </div>
        </div>

        {/* Use <a> ou <Link> dependendo do seu roteador */}
        <a
          href="/"
          className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-stone-400 hover:text-[#d4af37] transition duration-200 font-semibold"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </a>
      </div>
    </header>
  );
}