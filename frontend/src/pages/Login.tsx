import { useState, useContext, type FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";

export function Login() {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        try {
            await signIn(email, senha);
            alert("Logado com sucesso! Redirecionando...");
        } catch (error) {
            alert("Usuário ou senha incorretos.");
        }
    }

    return (
        <form onSubmit={handleLogin} style={{ padding: "20px" }}>
            <h2>Login - Wedding Pass</h2>
            <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
            <button type="submit">Entrar</button>
        </form>
    );
}