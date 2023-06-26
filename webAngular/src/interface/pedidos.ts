export interface Pedido {
  id: number;
  email: string;
  data_hora: string;
  status: string;
  expanded: boolean;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  paymentMethod: string;
  paymentTime: string;
  pedido_id: number;
  name_id: string;
  name: string;
  item_name: string;
  quantity: number;
  price: string;
}
