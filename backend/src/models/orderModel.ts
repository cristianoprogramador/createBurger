export interface Order {
  id?: number;
  email: string;
  data_hora?: Date;
  status?: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  paymentMethod: string;
  paymentTime: string;
}

export interface OrderDetail {
  id?: number;
  pedido_id?: number;
  name_id?: string;
  name: string;
  item_name: string;
  quantity: number;
  price: number;
}
