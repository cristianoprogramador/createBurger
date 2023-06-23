import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProdutos(): Promise<any[] | undefined> {
    return this.http
      .get<any[]>('https://api.createburger.com.br/products')
      .toPromise();
  }

  inserirProduto(produto: any): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .post<any>('https://api.createburger.com.br/products', produto, {
          headers,
        })
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }

  atualizarProduto(produto: any): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .put<any>(
          `https://api.createburger.com.br/products/${produto.id}`,
          produto,
          {
            headers,
          }
        )
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }

  deletarProduto(produtoId: number): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .delete<any>(`https://api.createburger.com.br/products/${produtoId}`, {
          headers,
        })
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }
}
