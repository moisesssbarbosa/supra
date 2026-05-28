import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importe o hook de navegação
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
      if (user && user.cargo) {
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
    <form onSubmit={handleLogin} style={{ padding: "20px" }}>
      <h2>Login - Wedding Pass</h2>
      <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}