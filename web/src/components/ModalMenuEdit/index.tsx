import { useContext, useEffect, useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import Modal from "react-modal";
import { Context } from "../../contexts/Context";
import { IngredientsProps } from "../../types/Products";
import { api } from "../../utils/api";
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
    maxHeight: "calc(100vh - 180px)",
  },
};

interface ModalFoodProps {
  data?: {
    name_id: string;
    name: string;
    value: string;
    type: string;
    description: string;
    image: string;
    items: Array<any>;
  };
  closeModal: () => void;
  isBurger?: boolean;
  type?: string;
}

export function ModalMenuEdit({
  data,
  closeModal,
  isBurger,
  type,
}: ModalFoodProps) {
  const [ingredientsData, setIngredientsData] = useState<IngredientsProps[]>(
    []
  );

  const [selectedBread, setSelectedBread] = useState<{
    item_name: string;
    quantity: number;
    price: number;
  }>({ item_name: "", quantity: 0, price: 0 });

  const [selectedMeats, setSelectedMeats] = useState<{
    [key: string]: { item_name: string; quantity: number; price: number };
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

  async function fetchProducts() {
    try {
      const { data } = await api.get(`/ingredients/${type}`);
      setIngredientsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const total2 = Object.values(selectedMeats).reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.quantity) * Number(currentValue.price),
    0
  );

  const grandTotal =
    (selectedBread.price + total2 + Number(data?.value)) * count;

  function mergeObjects(
    selectedBread: { item_name: string; quantity: number; price: number },
    selectedMeats: {
      [key: string]: { item_name: string; quantity: number; price: number };
    }
  ) {
    const merged: {
      [key: string]: { item_name: string; quantity: number; price: number };
    } = {};

    if (selectedBread.item_name) {
      merged[selectedBread.item_name] = { ...selectedBread };
    }

    Object.entries(selectedMeats).forEach(([key, value]) => {
      merged[key] = { ...value };
    });

    return merged;
  }

  const mergedObj = mergeObjects(selectedBread, selectedMeats);

  if (data) {
    mergedObj[data.name] = {
      item_name: data.name ?? "",
      quantity: 1,
      price: parseFloat(data.value ?? "0"),
    };
  }

  const { addOrder, editOrder } = useContext(Context);

  console.log(data?.name_id);

  function AddToContext() {
    if (data) {
      editOrder(
        data?.name_id,
        data?.name,
        mergedObj,
        count,
        data?.image,
        data?.type,
        data?.value,
        data?.description
      );
      closeModal();
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (data?.items) {
      const filteredItems = Object.entries(data.items).reduce(
        (filteredObj: any, [itemName, itemData]) => {
          if (itemName !== data.name && !itemName.startsWith("Pão")) {
            filteredObj[itemName] = itemData;
          }
          return filteredObj;
        },
        {}
      );

      setSelectedMeats(filteredItems);
    }
  }, [data]);

  console.log(data);

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

        {ingredientsData.filter((product) => product.type === "Pão").length >
          0 && <IngredientTopic>Pão</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Pão")
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
                      selectedBread &&
                      selectedBread.item_name === ingredient.name
                    }
                    onChange={() => {
                      if (
                        selectedBread &&
                        selectedBread.item_name === ingredient.name
                      ) {
                        setSelectedBread({
                          item_name: "",
                          quantity: 0,
                          price: 0,
                        });
                      } else {
                        setSelectedBread({
                          item_name: ingredient.name,
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

        {ingredientsData.filter((product) => product.type === "Carne").length >
          0 && <IngredientTopic>Carne</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Carne")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
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

        {ingredientsData.filter((product) => product.type === "Molho").length >
          0 && <IngredientTopic>Molho</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Molho")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              item_name: ingredient.name,
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

        {ingredientsData.filter((product) => product.type === "Salada").length >
          0 && <IngredientTopic>Salada</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Salada")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              item_name: ingredient.name,
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

        {ingredientsData.filter((product) => product.type === "Recheio")
          .length > 0 && <IngredientTopic>Recheio</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Recheio")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
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

        {ingredientsData.filter((product) => product.type === "Adicionais")
          .length > 0 && <IngredientTopic>Adicionais</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Adicionais")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              item_name: ingredient.name,
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

        {ingredientsData.filter((product) => product.type === "Batata Frita")
          .length > 0 && <IngredientTopic>Porções Individuais</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Batata Frita")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats: any) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        if (currentQuantity > 1) {
                          return {
                            ...prevMeats,
                            [ingredient.name]: {
                              item_name: ingredient.name,
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

        {ingredientsData.filter((product) => product.type === "Bebida").length >
          0 && <IngredientTopic>Bebida</IngredientTopic>}
        <div style={{ width: "100%" }}>
          {ingredientsData
            .filter((product) => product.type === "Bebida")
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
                    size={20}
                    onClick={() => {
                      setSelectedMeats((prevMeats) => {
                        const currentQuantity =
                          prevMeats[ingredient.name]?.quantity || 0;
                        return {
                          ...prevMeats,
                          [ingredient.name]: {
                            item_name: ingredient.name,
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
                    size={20}
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
            {data?.type === "chefBurger" && selectedBread.price > 0 ? (
              <div onClick={AddToContext} style={{ cursor: "pointer" }}>
                Confirmar
              </div>
            ) : null}
            {data?.type !== "chefBurger" ? (
              <div onClick={AddToContext} style={{ cursor: "pointer" }}>
                Confirmar
              </div>
            ) : null}
          </ContainerTotal>
        </FooterContainer>
      </Panel>
    </Modal>
  );
}
