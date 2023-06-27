import { Component } from '@angular/core';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/interface/pedidos';
import { GroupByPipe } from '../../utils/pipes/group-by.pipe';

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
        this.pedidos = this.agruparPedidos(pedidos);
        console.log(this.pedidos);
      }
    });
  }

  agruparPedidos(pedidos: Pedido[]): Pedido[][] {
    const pedidosAgrupados: Pedido[][] = [];
    const pedidoIds: number[] = [];

    for (const pedido of pedidos) {
      const pedidoIndex = pedidoIds.indexOf(pedido.pedido_id);

      if (pedidoIndex !== -1) {
        pedidosAgrupados[pedidoIndex].push(pedido);
      } else {
        pedidoIds.push(pedido.pedido_id);
        pedidosAgrupados.push([pedido]);
      }
    }

    return pedidosAgrupados;
  }

  expandirPedido(pedido: Pedido) {
    pedido.expanded = !pedido.expanded;
  }

  agruparProdutosPorNameId(pedidos: Pedido[][]): Pedido[][] {
    const pedidosAgrupados: Pedido[][] = [];

    pedidos.forEach((grupo: Pedido[]) => {
      const grupoAgrupado: Pedido[] = [];
      const nameIds: string[] = [];

      grupo.forEach((pedido: Pedido) => {
        const nameId = pedido.name_id;

        if (!nameIds.includes(nameId)) {
          nameIds.push(nameId);
          grupoAgrupado.push(pedido);
        }
      });

      pedidosAgrupados.push(grupoAgrupado);
    });

    return pedidosAgrupados;
  }

  atualizarStatus(orderId: any, status: string, email: string) {
    this.pedidoService
      .atualizarStatus(orderId, status, email)
      .then(() => {
        // Atualização bem-sucedida, faça qualquer ação adicional necessária
        alert('Status Alterado');
      })
      .catch((error) => {
        console.error('Erro ao atualizar o status:', error);
        // Trate o erro adequadamente
      });
  }
}
