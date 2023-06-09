import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  mobileMenuOpen: boolean = false; // Propriedade para controlar o estado do menu mobile

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getLoggedInUser(): string | null {
    return this.authService.getLoggedInUser();
  }

  logout(): void {
    this.authService.logout();
    // Redirecione para a página de login ou qualquer outra página desejada
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen; // Inverte o estado do menu mobile
  }
}
