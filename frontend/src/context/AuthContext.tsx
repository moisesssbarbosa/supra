import { createContext, useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";

type Usuario = {
    id: number;
    nome: string;
    cargo: boolean;
};

type AuthContextData = {
    usuario: Usuario | null;
    isAuthenticated: boolean;
    signIn: (email: string, senha: string) => Promise<Usuario>;
    signOut: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);        

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        try {
            const usuarioSalvo = localStorage.getItem("@WeddingPass:user");
            // Só tenta dar o Parse se o dado realmente existir
            return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
        } catch {
            // Se o dado no localStorage estiver quebrado ou corrompido, limpa tudo de segurança
            localStorage.removeItem("@WeddingPass:token");
            localStorage.removeItem("@WeddingPass:user");
            return null;
        }
    });

    useEffect(() => {
        function carregarDadosSalvos() {
            try {
                const tokenSalvo = localStorage.getItem('@WeddingPass:token');
                const usuarioSalvo = localStorage.getItem('@WeddingPass:user');

                if (tokenSalvo && usuarioSalvo) {
                    // Vincula o token automaticamente nas próximas requisições do Axios
            
                    api.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`;
                    
                    // Atualiza o estado de forma segura
                    setUsuario(JSON.parse(usuarioSalvo));
                }
            } catch (error) {
                console.error("Erro ao carregar dados locais:", error);
                localStorage.clear(); // Se tiver lixo no storage, limpa de vez
            }
        }

        carregarDadosSalvos();
    }, []); // 👈 Garanta que o array de dependências está vazio para rodar SÓ UMA VEZ!

    async function signIn(email: string, senha: string) {
        try {
            const resposta = await api.post('/auth/login', { email, senha });

            // Se o backend retorna o token direto (ex: resposta.data é uma string ou { token: string })
            const token = typeof resposta.data === 'string' ? resposta.data : resposta.data.token;

            // 🟢 Decodifica o token para pegar os dados do usuário salvos nele
            const dadosDecodificados = jwtDecode<{ id: number; nome: string; cargo: boolean }>(token);

            const user: Usuario = {
            id: dadosDecodificados.id,
            nome: dadosDecodificados.nome,
            cargo: dadosDecodificados.cargo
            };

            localStorage.setItem('@WeddingPass:token', token);
            localStorage.setItem('@WeddingPass:user', JSON.stringify(user));

            setUsuario(user);

            return user;
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