import { createContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../services/api";

type Usuario = {
    id: string;
    nome: string;
    email: string;
    cargo: boolean;
};

type AuthContextData = {
    usuario: Usuario | null;
    isAuthenticated: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);        

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const usuarioSalvo = localStorage.getItem('@WeddingPass:user');
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    });

    useEffect(() => {
        const tokenSalvo = localStorage.getItem('@WeddingPass:token');
        if (!tokenSalvo) {
            throw new Error("Token não fornecido ou expirado.");
        }
    }, []);

    async function signIn(email: string, senha: string) {
        try {
            const resposta = await api.post('/usuarios', { email, senha });

            const { token, usuario } = resposta.data;

            localStorage.setItem('@WeddingPass:token', token);
            localStorage.setItem('@WeddingPass:user', JSON.stringify(usuario));

            setUsuario(usuario);
        } catch (error) {
            console.error("Erro no login:", error);
            throw new Error("Crendeciais inválidas", { cause: error });
        }
    }

    function signOut() {
        localStorage.removeItem('@WeddingPass:token');
        localStorage.removeItem('@WeddingPass:user');
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}