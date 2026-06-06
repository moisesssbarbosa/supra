import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { type Convidado } from '../@types';

export function useConvidados() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Carregar
  const carregarConvidados = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/convidados");
      setConvidados(response.data);
    } catch (error) {
      console.error("Erro ao carregar convidados:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Salvar (Criar ou Editar)
  const salvarConvidado = async (dados: Convidado) => {
    try {
      if (dados.id) {
        await api.put(`/convidados/${dados.id}`, dados);
      } else {
        await api.post('/convidados', dados);
      }
      await carregarConvidados(); // Auto-update
      return { sucesso: true };
      
    } catch (error: unknown) {
      // Mapeando a estrutura exata que vimos no console da sua imagem
      const err = error as { 
        response?: { 
          data?: { 
            error?: string; 
            detalhes?: string[]; 
          } 
        } 
      };

      // 1. Se existir a lista de "detalhes" e ela tiver pelo menos um erro dentro
      if (err.response?.data?.detalhes && err.response.data.detalhes.length > 0) {
        // Pegamos a primeira mensagem específica do Zod (ex: "O nome deve ter no mínimo 3 letras.")
        return { sucesso: false, erro: err.response.data.detalhes[0] };
      }

      // 2. Fallback caso seja outro tipo de erro que não seja validação de campos
      const mensagemErro = err.response?.data?.error || "Erro na operação.";
      return { sucesso: false, erro: mensagemErro };
    }
  }

  // 3. Deletar
  const deletarConvidado = async (id: number) => {
    try {
      const convidado = convidados.find(c => c.id === id);
      const confirmou = window.confirm(`Tem certeza que deseja apagar o convidado ${convidado?.nome}? Esta ação não pode ser desfeita.`);
      
      if (confirmou) {
        await api.delete(`/convidados/${id}`);
        await carregarConvidados(); // Auto-update
        return { sucesso: true };
      }
    } catch {
      return { sucesso: false, erro: "Erro ao deletar convidado." };
    }
  };

  // 4. Check-in rápido (Usado na Portaria/Recepção)
  // 🔥 Deixamos apenas o (id: number), removendo o statusAtual
  const realizarCheckIn = async (id: number) => {
    try {
      const convidado = convidados.find(c => c.id === id);
      if (convidado) {
        // Usamos o status que já encontramos dentro do objeto do convidado
        await api.patch(`/convidados/${id}/checkin`, { status_checkin: !convidado.status_checkin });
        await carregarConvidados();
        return { sucesso: true };
      }
      return { sucesso: false, erro: "Convidado não encontrado." };
    } catch { 
      return { sucesso: false, erro: "Erro ao atualizar check-in." };
    }
  };

  return {
    convidados,
    loading,
    carregarConvidados,
    salvarConvidado,
    deletarConvidado,
    realizarCheckIn
  };
}