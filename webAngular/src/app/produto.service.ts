import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  getProdutos(): Promise<any[] | undefined> {
    return this.http.get<any[]>('http://localhost:3031/products').toPromise();
  }

  inserirProduto(produto: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3031/products', produto)
      .toPromise();
  }

  atualizarProduto(produto: any): Promise<any> {
    return this.http
      .put<any>(`http://localhost:3031/products/${produto.id}`, produto)
      .toPromise();
  }

  deletarProduto(produtoId: number): Promise<any> {
    return this.http
      .delete<any>(`http://localhost:3031/products/${produtoId}`)
      .toPromise();
  }
}
