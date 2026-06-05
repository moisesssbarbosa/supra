export interface Convidado {
  id?: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  mesa: number;
  status_checkin: boolean;
}