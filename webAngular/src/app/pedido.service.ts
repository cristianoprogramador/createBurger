import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Pedido } from 'src/interface/pedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPedidos(): Promise<Pedido[] | undefined> {
    return this.http
      .get<any>('http://localhost:3031/orders') // Use 'any' como tipo genérico para receber a resposta
      .toPromise()
      .then((response: any) => {
        if (response && response.orderId instanceof Array) {
          // Verifique se a resposta contém uma propriedade 'orderId' que é uma matriz
          return response.orderId as Pedido[]; // Faça o cast da matriz para o tipo 'Pedido[]'
        } else {
          return undefined; // Caso a resposta não esteja no formato esperado, retorne 'undefined'
        }
      })
      .catch((error) => {
        console.error('Erro ao obter os pedidos:', error);
        return undefined; // Trate o erro adequadamente e retorne 'undefined' em caso de falha
      });
  }
}
