import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredienteService } from 'src/app/ingrediente.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
})
export class IngredientesComponent {
  ingredientes: any[] = [];
  novoIngrediente = {
    name: '',
    description: '',
    image: '',
    value: 0,
    type: '',
    is_chef: '',
  };

  formSubmitted = false;

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit() {
    this.carregarIngredientes();
  }

  carregarIngredientes() {
    this.ingredienteService.getIngredientes().then((ingredientes: any) => {
      this.ingredientes = ingredientes;
    });
  }

  inserirIngrediente(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return; // Impede o envio do formulário se houver campos inválidos
    }

    this.ingredienteService
      .inserirIngrediente(this.novoIngrediente)
      .then(() => {
        // Limpar os campos de input
        this.novoIngrediente = {
          name: '',
          description: '',
          image: '',
          value: 0,
          type: '',
          is_chef: '',
        };

        // Recarregar a lista de ingredientes
        this.carregarIngredientes();
        alert('Ingrediente Inserido');
      })
      .catch((error: any) => {
        console.error('Erro ao inserir produto:', error);
      });
  }

  salvarIngrediente(ingrediente: any) {
    this.ingredienteService
      .atualizarIngrediente(ingrediente)
      .then(() => {
        // Recarregar a lista de ingredientes
        this.carregarIngredientes();
        alert('Ingrediente Salvo');
      })
      .catch((error: any) => {
        console.error('Erro ao atualizar ingrediente:', error);
      });
  }

  deletarIngrediente(ingredienteId: number) {
    this.ingredienteService
      .deletarIngrediente(ingredienteId)
      .then(() => {
        // Recarregar a lista de ingredientes
        this.carregarIngredientes();
        alert('Ingrediente Deletado');
      })
      .catch((error: any) => {
        console.error('Erro ao deletar ingrediente:', error);
      });
  }
}
