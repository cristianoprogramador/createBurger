export interface ProductsProps {
  id: string;
  name: string;
  value: string;
  type: string;
  description: string;
  image: string;
}
[];

export interface ProductProp {
  id: string;
  name: string;
  value: string;
  type: string;
  description: string;
  image: string;
}

export interface ModalFoodProps {
  data: {
    id: number;
    name: string;
    image: string;
    value: number;
    description: string;
  };
  closeModal: () => void;
}
