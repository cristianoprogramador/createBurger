export interface ProductsProps {
  id: string;
  name: string;
  value: string;
  type: string;
  description: string;
  image: string;
}
[];

export interface IngredientsProps {
  id: string;
  name: string;
  value: string;
  type: string;
  description: string;
  image: string;
  is_chef: string;
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
