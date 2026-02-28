export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  access_token: string;
}