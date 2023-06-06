import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import {
  AddButton,
  ContainerTotal,
  DescriptionAddContainer,
  DescriptionContainer,
  FirstInsidePart,
  FirstPart,
  FooterContainer,
  HeaderContainer,
  IconContainer,
  IconContainerTotal,
  ImageIngredient,
  IngredientTopic,
  IngredientsContainer,
  Panel,
  Title,
} from "./styles";
import { CgCloseR } from "react-icons/cg";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IngredientsProps, ProductsProps } from "../../types/Products";
import { api } from "../../utils/api";
import chef from "../../assets/images/chef.png";
import { Context } from "../../contexts/Context";

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
    maxHeight: "calc(100vh - 160px)",
  },
};

interface ModalFoodProps {
  data?: {
    id: string;
    name: string;
    value: string;
    type: string;
    description: string;
    image: string;
  };
  closeModal: () => void;
  allProducts: ProductsProps[];
  isBurger?: boolean;
  type?: string;
}

export function ModalFood({
  data,
  closeModal,
  allProducts,
  isBurger,
  type,
}: ModalFoodProps) {
  const [ingredientsData, setIngredientsData] = useState<IngredientsProps[]>(
    []
  );

  const [selectedBread, setSelectedBread] = useState<{
    name: string;
    quantity: number;
    price: number;
  }>({ name: "", quantity: 0, price: 0 });

  const [selectedMeats, setSelectedMeats] = useState<{
    [key: string]: { name: string; quantity: number; price: number };
  }>({});

  const [count, setCount] = useState(1);

  function addCount() {
    setCount(count + 1);
  }

  function minusCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  console.log(count);

  async function fetchProducts() {
    try {
      const { data } = await api.get("/ingredients");
      setIngredientsData(data);
      // console.log("ingredient", data);
    } catch (error) {
      console.error(error);
    }
  }

  const total2 = Object.values(selectedMeats).reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.quantity) * Number(currentValue.price),
    0
  );

  const grandTotal = (selectedBread.price + total2) * count;
  // console.log(grandTotal);

  function mergeObjects(
    selectedBread: { name: string; quantity: number; price: number },
    selectedMeats: {
      [key: string]: { name: string; quantity: number; price: number };
    }
  ) {
    const merged: {
      [key: string]: { name: string; quantity: number; price: number };
    } = {};

    if (selectedBread.name) {
      merged[selectedBread.name] = { ...selectedBread };
    }

    Object.entries(selectedMeats).forEach(([key, value]) => {
      merged[key] = { ...value };
    });

    return merged;
  }

  const mergedObj = mergeObjects(selectedBread, selectedMeats);

  const { addOrder } = useContext(Context);

  function AddToContext() {
    addOrder("Montando o Burger", mergedObj, count);
    closeModal();
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

          {isBurger ? (
            <Title>
              <h2>Seja seu próprio Chef!</h2>
            </Title>
          ) : (
            <Title>
              <h2>{data?.name}</h2>
            </Title>
          )}
        </HeaderContainer>

        {isBurger ? (
          <>
            <img src={chef} alt="Imagem Personalizada de um Chef" />
            <p style={{ marginTop: 10, maxWidth: 400 }}>
              Escolha os itens de acordo com a sua fome e a sua vontade, aqui
              você é o CHEF! Use a imaginação e crie um combo fantastico e
              delicioso!
            </p>
          </>
        ) : (
          <>
            <img src={data?.image} alt={data?.name} />
            <p>{data?.description}</p>
            <span style={{ marginTop: "10px", marginBottom: "10px" }}>
              R$
              {Number(data?.value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </>
        )}

        <IngredientTopic>Pão</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "bread")
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
                  <input
                    type="checkbox"
                    checked={
                      selectedBread && selectedBread.name === ingredient.name
                    }
                    onChange={() => {
                      if (
                        selectedBread &&
                        selectedBread.name === ingredient.name
                      ) {
                        setSelectedBread({ name: "", quantity: 0, price: 0 });
                      } else {
                        setSelectedBread({
                          name: ingredient.name,
                          quantity: 1,
                          price: Number(ingredient.value),
                        });
                      }
                    }}
                  />
                </DescriptionContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Carne</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "meat")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Molho</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "sauce")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Salada</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "salad")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Recheio</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "cheese")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Adicionais</IngredientTopic>
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "additions")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Batata Frita</IngredientTopic>
        <div style={{ width: "100%" }}>
          {allProducts
            .filter((product) => product.type === "fries")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <IngredientTopic>Bebida</IngredientTopic>
        <div style={{ width: "100%" }}>
          {allProducts
            .filter((product) => product.type === "drink")
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
                <DescriptionAddContainer>
                  <AiOutlinePlusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            name: ingredient.name,
                            quantity: currentQuantity + 1,
                            price: Number(ingredient.value),
                          },
                        };
                      });
                    }}
                  >
                    +
                  </AiOutlinePlusCircle>
                  <span>{selectedMeats[ingredient.name]?.quantity || 0}</span>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              name: ingredient.name,
                              quantity: currentQuantity - 1,
                            },
                          };
                        } else {
                          const updatedMeats = { ...prevMeats };
                          delete updatedMeats[ingredient.name];
                          return updatedMeats;
                        }
                      });
                    }}
                  >
                    -
                  </AiOutlineMinusCircle>
                </DescriptionAddContainer>
              </IngredientsContainer>
            ))}
        </div>

        <FooterContainer>
          <IconContainerTotal>
            <AiOutlineArrowDown
              size={25}
              style={{ cursor: "pointer" }}
              onClick={minusCount}
            />
            {count}
            <AiOutlineArrowUp
              size={25}
              style={{ cursor: "pointer" }}
              onClick={addCount}
            />
          </IconContainerTotal>
          <ContainerTotal>
            <AddButton>
              <div>Total:</div>
              <div>
                R$:
                {Number(grandTotal).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </AddButton>
            {selectedBread.price > 0 && (
              <div onClick={AddToContext}>Confirmar</div>
            )}
          </ContainerTotal>
        </FooterContainer>
      </Panel>
    </Modal>
  );
}
