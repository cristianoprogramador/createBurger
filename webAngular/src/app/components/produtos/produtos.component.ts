import { Component } from '@angular/core';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent {
  produtos: any[] = [];
  novoProduto: any = {};

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().then((produtos: any) => {
      this.produtos = produtos;
    });
  }

  inserirProduto() {
    this.produtoService
      .inserirProduto(this.novoProduto)
      .then(() => {
        // Limpar os campos de input
        this.novoProduto = {};

        // Recarregar a lista de produtos
        this.carregarProdutos();
        alert('Produto Inserido');
      })
      .catch((error: any) => {
        console.error('Erro ao inserir produto:', error);
      });
  }

  salvarProduto(produto: any) {
    this.produtoService
      .atualizarProduto(produto)
      .then(() => {
        // Recarregar a lista de produtos
        this.carregarProdutos();
        alert('Produto Salvo');
      })
      .catch((error: any) => {
        console.error('Erro ao atualizar produto:', error);
      });
  }

  deletarProduto(produtoId: number) {
    this.produtoService
      .deletarProduto(produtoId)
      .then(() => {
        // Recarregar a lista de produtos
        this.carregarProdutos();
        alert('Produto Deletado');
      })
      .catch((error: any) => {
        console.error('Erro ao deletar produto:', error);
      });
  }
}
