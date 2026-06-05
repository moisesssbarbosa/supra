import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // 👈 Importe o hook de navegação
import { AuthContext } from "../context/AuthContext";

export function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate(); // 👈 Instancie o navegador
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.SubmitEvent) {
  e.preventDefault();
  
  try {
      // 1. Aguarda o login acontecer e recebe os dados do usuário direto da função
      const user = await signIn(email, senha);
      
      // 2. Se o usuário existir, decide a rota com base no cargo
      if (user !== undefined && user !== null) {
        if (user.cargo === true) { // Ajuste aqui para a string exata do seu cargo admin
          navigate("/dashboard");
        } else {
          navigate("/recepcao");
        }
      } else {
        // Caso o login funcione mas o objeto venha sem cargo ou malformado
        throw new Error("Dados de usuário inválidos");
      }

    } catch (error) {
      console.error(error);
      alert("Usuário ou senha incorretos.");
    }
  }

return (
    // Grid dividido igualmente que consome toda a tela
    <div className="min-h-screen bg-[#0a0908] text-[#f4f1de] grid lg:grid-cols-2 select-none">
      
      {/* 📥 INJEÇÃO DE FONTES SOFISTICADAS E ARREDONDADAS DIRETO NO COMPONENTE */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />

      {/* APLICANDO AS CLASSES DE FONTE CUSTOMIZADAS inline */}
      <style>{`
        .fonte-titulo { font-family: 'Playfair Display', serif; }
        .fonte-corpo { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* 🏛️ PAINEL DA ESQUERDA (Ornamental e Perfeito) */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden border-r border-[#d4af37]/20 bg-[#0a0908] p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.22_0.02_85/0.5),transparent_60%)]" />
        
        <div className="relative text-center w-full max-w-xl z-10 space-y-12">
          <div className="mx-auto h-px w-36 bg-[#d4af37]/60" />
          
          <h1 className="fonte-titulo text-6xl xl:text-7xl text-white leading-tight tracking-wide">
            Uma celebração<br />
            <em className="text-[#d4af37] font-normal italic block mt-4 text-7xl xl:text-8xl">memorável</em>
          </h1>
          
          <p className="fonte-corpo max-w-md mx-auto text-base text-stone-400 font-light leading-relaxed tracking-wide">
            Receba seus convidados com a elegância que esta noite merece. Wedding Pass cuida de cada detalhe com precisão e sofisticação.
          </p>
          
          <div className="mx-auto h-px w-36 bg-[#d4af37]/60" />
          
          <div className="fonte-corpo text-xs tracking-[0.6em] uppercase text-[#d4af37]/70 font-light">
            Est. MMXXVI
          </div>
        </div>
      </div>

      {/* 🔐 PAINEL DA DIREITA (Aumentado, Robusto e com Letras Maiores) */}
      <div className="flex items-center justify-center p-10 sm:p-20 lg:p-28 bg-[#0a0908]">
        {/* max-w-xl deixa o formulário expandir mais horizontalmente nos monitores */}
        <div className="w-full max-w-xl space-y-14">
          
          {/* LOGO AMPLIADO */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex items-center gap-5">
              <div className="fonte-corpo w-14 h-14 rounded-full border-2 border-[#d4af37] flex items-center justify-center text-base font-medium tracking-widest text-[#d4af37] bg-[#0f0e0c] shadow-md">
                W
              </div>
              <div className="fonte-corpo text-left">
                <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase">Wedding Pass</h1>
                <p className="text-[11px] tracking-[0.25em] text-[#d4af37] uppercase font-light mt-0.5">Maison de Mariage</p>
              </div>
            </div>
          </div>

          {/* TEXTO DE BOAS-VINDAS AMPLIFICA */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="fonte-titulo text-5xl text-white tracking-wide">Bem-vindo</h2>
            <p className="fonte-corpo text-lg text-stone-400 font-light tracking-wide">Acesse sua conta para continuar.</p>
          </div>
          
          {/* Divisória dourada com degradê amplo */}
          <div className="h-0.5 bg-linear-to-r from-transparent via-[#d4af37]/60 to-transparent" />

          {/* FORMULÁRIO COM LETRAS E CAMPOS GRANDES */}
          <form onSubmit={handleLogin} className="fonte-corpo space-y-10">
            
            {/* CAMPO EMAIL */}
            <div className="space-y-4 text-left">
              <label className="text-xs uppercase tracking-[0.35em] text-[#d4af37]/90 font-bold block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                className="w-full h-16 bg-transparent rounded-none border-0 border-b-2 border-[#d4af37]/30 px-0 text-white placeholder-stone-700 focus:outline-none focus:ring-0 focus:border-[#d4af37] text-lg font-light transition-colors duration-200 tracking-wide"
              />
            </div>

            {/* CAMPO SENHA */}
            <div className="space-y-4 text-left">
              <label className="text-xs uppercase tracking-[0.35em] text-[#d4af37]/90 font-bold block">
                Senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full h-16 bg-transparent rounded-none border-0 border-b-2 border-[#d4af37]/30 px-0 text-white placeholder-stone-800 focus:outline-none focus:ring-0 focus:border-[#d4af37] text-lg font-light tracking-[0.4em] transition-colors duration-200"
              />
            </div>

            {/* BOTÃO ENTRAR IMPONENTE E LARGO */}
            <button
              type="submit"
              className="w-full mt-6 py-5 bg-[#d4af37] hover:bg-[#bfa032] active:bg-[#aa8e2c] text-black text-xs font-extrabold tracking-[0.45em] uppercase transition-colors duration-150 shadow-2xl"
            >
              Entrar
            </button>
          </form>

          {/* FOOTER DA TELA */}
          <p className="fonte-corpo mt-14 text-center lg:text-left text-xs tracking-[0.35em] text-stone-500 font-light">
            <Link to="/recepcao" className="hover:text-[#d4af37] transition">Demo Recepção</Link>
            <span className="mx-5 text-[#d4af37]/40">·</span>
            <Link to="/admin" className="hover:text-[#d4af37] transition">Demo Admin</Link>
          </p>
          
        </div>
      </div>
    </div>
  );
}