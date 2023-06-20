import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  usuarios: any[] = [];
  searchTerm: string = '';
  filteredUsuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.usuarioService.getAllUsers().then((usuarios: any) => {
      this.usuarios = usuarios;
      this.filteredUsuarios = this.usuarios; // Exibe todos os usuários inicialmente
    });
  }

  deletarUsuario(userId: number) {
    this.usuarioService
      .deletarUsuario(userId)
      .then(() => {
        // Recarregar a lista de ingredientes
        this.carregarProdutos();
        alert('Usuario Deletado');
      })
      .catch((error: any) => {
        console.error('Erro ao deletar usuario:', error);
      });
  }

  filterUsers() {
    if (this.searchTerm) {
      this.filteredUsuarios = this.usuarios.filter((usuario) => {
        const searchTermLower = this.searchTerm.toLowerCase();
        return (
          usuario.name.toLowerCase().includes(searchTermLower) ||
          usuario.email.toLowerCase().includes(searchTermLower)
        );
      });
    } else {
      this.filteredUsuarios = this.usuarios;
    }
  }

  searchUsers() {
    if (this.searchTerm.trim() === '') {
      // Se o campo de busca estiver vazio, recarrega todos os usuários
      this.carregarProdutos();
    } else {
      // Filtra os usuários com base no termo de busca
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.usuarios = this.usuarios.filter(
        (usuario: any) =>
          usuario.name.toLowerCase().includes(searchTermLowerCase) ||
          usuario.email.toLowerCase().includes(searchTermLowerCase)
      );
    }
  }
}
