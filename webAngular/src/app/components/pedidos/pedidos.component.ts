import { Component } from '@angular/core';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/interface/pedidos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent {
  pedidos: Pedido[][] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.pedidoService.getPedidos().then((pedidos: Pedido[] | undefined) => {
      if (pedidos) {
        const pedidosAgrupados: { [key: string]: Pedido[] } = {};

        // Agrupar os produtos por pedido.name
        pedidos.forEach((pedido: Pedido) => {
          if (!pedidosAgrupados[pedido.name]) {
            pedidosAgrupados[pedido.name] = [];
          }
          pedido.expanded = false; // Inicializa a propriedade expanded como false
          pedidosAgrupados[pedido.name].push(pedido);
        });
        console.log(pedidos);

        // Converter o objeto de pedidos agrupados em um array de arrays
        this.pedidos = Object.values(pedidosAgrupados);
      }
    });
  }

  agruparPedidos(pedidos: Pedido[]): { [pedidoId: string]: Pedido[] } {
    const pedidosAgrupados: { [pedidoId: string]: Pedido[] } = {};

    for (const pedido of pedidos) {
      if (pedido.pedido_id in pedidosAgrupados) {
        pedidosAgrupados[pedido.pedido_id].push(pedido);
      } else {
        pedidosAgrupados[pedido.pedido_id] = [pedido];
      }
    }

    return pedidosAgrupados;
  }

  expandirPedido(pedido: Pedido) {
    pedido.expanded = !pedido.expanded;
  }
}
