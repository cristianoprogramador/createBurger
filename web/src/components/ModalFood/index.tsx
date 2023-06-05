import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  DescriptionContainer,
  FirstInsidePart,
  FirstPart,
  HeaderContainer,
  IconContainer,
  ImageIngredient,
  IngredientsContainer,
  Panel,
  Title,
} from "./styles";
import { CgCloseR } from "react-icons/cg";
import { IngredientsProps } from "../../types/Products";
import { api } from "../../utils/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
    zIndex: 9999,
    overflow: "auto",
    maxHeight: "calc(100vh - 250px)",
  },
};

interface ModalFoodProps {
  data: {
    id: string;
    name: string;
    value: string;
    type: string;
    description: string;
    image: string;
  };
  closeModal: () => void;
}

export function ModalFood({ data, closeModal }: ModalFoodProps) {
  console.log(data);
  const [ingredientsData, setIngredientsData] = useState<IngredientsProps[]>(
    []
  );

  async function fetchProducts() {
    try {
      const { data } = await api.get("/ingredients");
      setIngredientsData(data);
      console.log("ingredient", data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Panel>
        <HeaderContainer>
          <IconContainer onClick={closeModal}>
            <CgCloseR size={30} />
          </IconContainer>

          <Title>
            <h2>{data.name}</h2>
          </Title>
        </HeaderContainer>
        <img src={data.image} alt={data.name} />
        <p>{data.description}</p>
        <span style={{ marginTop: "10px", marginBottom: "10px" }}>
          R$
          {Number(data.value).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <div>
          {ingredientsData
            // .filter((product) => product.type === "food")
            .map((ingredient, index) => (
              <IngredientsContainer key={ingredient.id}>
                <FirstPart>
                  <ImageIngredient src={ingredient.image} alt="" />
                  <FirstInsidePart>
                    <p>{ingredient.name}</p>
                    <div>{ingredient.description}</div>
                    <div style={{ color: "darkred" }}>
                      + R$
                      {Number(ingredient.value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </FirstInsidePart>
                </FirstPart>
                <DescriptionContainer>
                  <input type="checkbox" />
                </DescriptionContainer>
              </IngredientsContainer>
            ))}
        </div>
      </Panel>
    </Modal>
  );
}
