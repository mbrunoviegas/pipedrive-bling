export type IRequestOrderPayload = {
  pedido: OrderPayload;
};

export type OrderPayload = {
  cliente: OrderClient;
  itens: OrderItem;
};

export type OrderClient = {
  name: string;
};

export type OrderItem = {
  item: ItemContent[];
};

export type ItemContent = {
  codigo: string;
  descricao: string;
  un: string;
  qtde: number;
  vlr_unit: number;
};
