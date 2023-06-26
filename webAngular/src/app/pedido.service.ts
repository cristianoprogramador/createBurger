import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from 'src/interface/pedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPedidos(): Promise<Pedido[] | undefined> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .get<any>('http://localhost:3031/orders', { headers }) // Adicione os headers à requisição
        .toPromise()
        .then((response: any) => {
          if (response && response.orderId instanceof Array) {
            return response.orderId as Pedido[];
          } else {
            return undefined;
          }
        })
        .catch((error) => {
          console.error('Erro ao obter os pedidos:', error);
          return undefined;
        });
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }

  atualizarStatus(orderid: any, status: string): Promise<any> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${authToken}`
      );
      return this.http
        .put<any>(
          `http://localhost:3031/order/${orderid}/${status}`,
          {},
          { headers }
        ) // Passar os headers corretamente
        .toPromise();
    } else {
      // Trate o caso em que o token não está disponível
      return Promise.reject('Token não disponível');
    }
  }
}
