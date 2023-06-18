import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProdutos(): Promise<any[] | undefined> {
    return this.http.get<any[]>('http://localhost:3031/products').toPromise();
  }

  inserirProduto(produto: any): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .post<any>('http://localhost:3031/products', produto, { headers })
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
        .put<any>(`http://localhost:3031/products/${produto.id}`, produto, {
          headers,
        })
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
        .delete<any>(`http://localhost:3031/products/${produtoId}`, { headers })
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }
}
