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

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.usuarioService.getAllUsers().then((usuarios: any) => {
      this.usuarios = usuarios;
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
}
