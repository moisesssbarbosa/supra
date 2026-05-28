import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin"
import { Recepcao } from "./pages/Recepcao";

// 1. Componente de Proteção de Rotas (Guarda de Rota)
type PrivateRouteProps = {
  children: ReactNode;
  requireAdmin?: boolean;
};

function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
  const { usuario, isAuthenticated } = useContext(AuthContext);

  // Se não estiver logado, manda direto para a tela de Login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se a rota exigir ser Admin e o usuário for Staff (cargo === false), barra o acesso
  if (requireAdmin && usuario?.cargo === false) {
    return <Navigate to="/recepcao" replace />;
  }

  // Se passou nos testes, renderiza a página protegida
  return <>{children}</>;
}

// 2. Componente Principal com o Roteamento Geral
export default function App() {
  return (
    <BrowserRouter>
      {/* Envolvemos toda a aplicação com o nosso Provedor de Autenticação */}
      <AuthProvider>
        <Routes>
          {/* Rota Pública: Login */}
          <Route path="/" element={<Login />} />

          {/* Rota Protegida: Dashboard (Apenas Admin - cargo true) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requireAdmin>
                <Admin />
              </PrivateRoute>
            }
          />

          {/* Rota Protegida: Recepção (Admin ou Staff podem acessar) */}
          <Route
            path="/recepcao"
            element={
              <PrivateRoute>
                <Recepcao />
              </PrivateRoute>
            }
          />

          {/* Rota de escape: Qualquer endereço estranho manda pro Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}