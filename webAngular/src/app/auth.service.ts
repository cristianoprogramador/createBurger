import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private authToken: string | null = null; // Adicione uma propriedade para armazenar o token

  login(token: string) {
    this.loggedIn = true;
    this.authToken = token; // Armazene o token recebido
  }

  logout() {
    this.loggedIn = false;
    this.authToken = null; // Remova o token ao fazer logout
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getLoggedInUser(): string | null {
    // Implemente a lógica para recuperar o usuário logado
    // Exemplo: return this.authService.getLoggedInUser();
    return 'Admin';
  }

  getAuthToken(): string | null {
    return this.authToken; // Retorne o token armazenado
  }
}
