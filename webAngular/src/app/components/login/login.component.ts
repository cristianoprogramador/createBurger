import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  login() {
    // Aqui você pode adicionar a lógica de autenticação do usuário
    // Verificar as credenciais, fazer uma chamada ao serviço de autenticação, etc.
    // Exemplo básico:
    if (this.username === 'admin' && this.password === '12345') {
      // Login bem-sucedido, redirecionar para a página principal
      // Você pode usar o router do Angular para isso
      // Exemplo: this.router.navigate(['/produtos']);
    } else {
      // Login falhou, exibir mensagem de erro ou tomar outras ações
      alert('Login inválido. Verifique suas credenciais.');
    }
  }
}
