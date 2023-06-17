import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getLoggedInUser(): string | null {
    // Implemente a lógica para recuperar o usuário logado
    // Exemplo: return this.authService.getLoggedInUser();
    return 'Admin';
  }
}
