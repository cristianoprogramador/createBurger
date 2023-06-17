import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (this.showPassword) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  login(): void {
    // Faça uma chamada HTTP POST para a rota /user/admin com as credenciais do usuário
    this.http
      .post('http://localhost:3031/user/admin', {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        () => {
          console.log('Acesso concedido');
          this.authService.login();
          this.router.navigate(['/produtos']);
        },
        (error) => {
          // Se houver um erro na autenticação, você pode exibir uma mensagem de erro adequada para o usuário
          alert('Usuário ou Senha incorreta');
          console.error('Erro de autenticação:', error);
        }
      );
  }
}
