import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredienteService } from 'src/app/ingrediente.service';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
})
export class IngredientesComponent {
  produtos: any[] = [];
  ingredientes: any[] = [];
  novoIngrediente = {
    name: '',
    description: '',
    image: '',
    value: 0,
    type: '',
    is_chef: '',
  };
  tipoSelecionado: string | undefined;
  tipos: string[] = [];
  ingredientesFiltrados!: any[];
  isChefs: string[] = [];
  isTypes: string[] = [];

  formSubmitted = false;

  constructor(
    private ingredienteService: IngredienteService,
    private produtoService: ProdutoService
  ) {}

  async ngOnInit() {
    await Promise.all([this.carregarIngredientes(), this.carregarProdutos()]);
    this.ingredientesFiltrados = this.ingredientes;
    this.getUniqueTypesAndIsChefs();
  }

  carregarIngredientes() {
    this.ingredienteService.getIngredientes().then((ingredientes: any) => {
      console.log(ingredientes);
      this.ingredientes = ingredientes;
      this.tipos = this.getUniqueTypes(ingredientes);
      this.getUniqueTypesAndIsChefs();
      this.filtrarIngredientes();
    });
  }

  carregarProdutos() {
    this.produtoService.getProdutos().then((produtos: any) => {
      this.produtos = produtos;
      // console.log('Aqui ta aparecendo', this.produtos);
      this.getUniqueTypesAndIsChefs();
    });
  }

  getUniqueTypes(ingredientes: any[]): string[] {
    const tipos = ingredientes.map((ingrediente) => ingrediente.type);
    return [...new Set(tipos)];
  }

  getUniqueIsChefs(ingredientes: any[]): string[] {
    const isChefs = ingredientes.map((ingrediente) => ingrediente.is_chef);
    return [...new Set(isChefs)];
  }

  getUniqueTypesFromProducts(produtos: any[]): string[] {
    // console.log('nada aqui', this.produtos);
    const isTypes = this.produtos.map((produto) => produto.type);
    return [...new Set(isTypes)];
  }

  getUniqueTypesAndIsChefs() {
    this.tipos = this.getUniqueTypes(this.ingredientes);
    this.isChefs = this.getUniqueIsChefs(this.ingredientes);
    this.isTypes = this.getUniqueTypesFromProducts(this.produtos);
  }

  clonarIngrediente(ingrediente: any) {
    this.novoIngrediente = { ...ingrediente };

    const formulario = document.querySelector('.ingrediente-add');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  }

  filtrarIngredientes() {
    if (this.tipoSelecionado) {
      this.ingredientesFiltrados = this.ingredientes.filter(
        (ingrediente) => ingrediente.type === this.tipoSelecionado
      );
    } else {
      this.ingredientesFiltrados = this.ingredientes;
    }

    this.ingredientesFiltrados.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  inserirIngrediente(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      return; // Impede o envio do formulário se houver campos inválidos
    }

    const novoIngrediente = form.value; // Obter os valores do formulário

    this.ingredienteService
      .inserirIngrediente(novoIngrediente)
      .then(() => {
        // Limpar os campos de input
        form.resetForm();

        // Recarregar a lista de ingredientes
        this.carregarIngredientes();
        alert('Ingrediente Inserido');
      })
      .catch((error: any) => {
        console.error('Erro ao inserir ingrediente:', error);
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
