import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  CheckoutButton,
  Container,
  OrderContainer,
  OrderContainerInfo,
  OrderImage,
  OrderInfo,
  OrderInfoNameQuantity,
  OrderItem,
  OrderName,
  OrderSubTotal,
  OrderTotal,
  ProfileContainer,
} from "./styles";
import { Context } from "../../contexts/Context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import remove from "../../assets/images/remove.svg";
import edit from "../../assets/images/edit.svg";
import { ModalMenuEdit } from "../../components/ModalMenuEdit";

export function Cart() {
  const navigate = useNavigate();
  const { orders, removeOrder, user } = useContext(Context);

  const sumOrderPrice = (order: any) => {
    const items = Object.values(order.items);
    const totalPrice = items.reduce(
      (sum: any, item: any) => sum + item.quantity * item.price,
      0
    );
    return totalPrice;
  };

  const totalPrices = orders.map((order) => sumOrderPrice(order));

  const totalPrice = totalPrices.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  const handleCheckout = () => {
    if (orders.length > 0) {
      if (!user) {
        navigate("/login");
      } else {
        navigate("/checkout");
      }
    } else {
      toast.error("Carrinho Vazio");
    }
  };

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<any>();

  const handleRemoveOrder = (orderNameId: any) => {
    removeOrder(orderNameId);
  };

  const handleEdit = (order: any) => {
    console.log(order);
    setOpenModalEdit(true);
    setDataToEdit(order);
  };

  function handleCloseModal() {
    setOpenModalEdit(false);
  }

  // console.log(orders);

  return (
    <Container>
      <Header />
      <ProfileContainer>
        {orders.map((order, index) => (
          <OrderContainer key={index}>
            <OrderContainerInfo>
              <OrderImage src={order.image} alt={order.name} />
              <OrderInfo>
                <OrderName>{order.name}</OrderName>

                {Object.values(order.items).map((item, index) => (
                  <OrderItem key={index}>
                    <OrderInfoNameQuantity>
                      <div>{item.item_name}</div>

                      <div style={{ minWidth: 112 }}>
                        Quantidade: {item.quantity}
                      </div>
                    </OrderInfoNameQuantity>
                    Preço: R$:
                    {Number(item.price).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </OrderItem>
                ))}
              </OrderInfo>
            </OrderContainerInfo>
            <OrderSubTotal>
              Subtotal: R$:
              {Number(sumOrderPrice(order)).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <img
                src={remove}
                alt=""
                style={{ height: 30, width: 30, cursor: "pointer" }}
                onClick={() => handleRemoveOrder(order.name_id)}
              />
              <img
                src={edit}
                alt=""
                style={{ height: 30, width: 30, cursor: "pointer" }}
                onClick={() => handleEdit(order)}
              />
            </OrderSubTotal>
          </OrderContainer>
        ))}

        <OrderTotal>
          Total do Pedido: R$:
          {Number(totalPrice).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </OrderTotal>
        <CheckoutButton onClick={handleCheckout}>
          Finalizar Pedido
        </CheckoutButton>
      </ProfileContainer>

      {openModalEdit && (
        <ModalMenuEdit
          data={dataToEdit}
          closeModal={handleCloseModal}
          type={dataToEdit?.type}
        />
      )}
      <Footer no_repeat />
    </Container>
  );
}
