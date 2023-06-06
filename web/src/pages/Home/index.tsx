import { useEffect, useState } from "react";
import {
  Container,
  CustomizeContainer,
  CustomizeHamburger,
  CustomizeText,
  MenuContainer,
  ProductDescription,
  ProductImage,
  ProductInfo,
  ProductItem,
  ProductList,
  ProductName,
  ProductPrice,
  TitleContainer,
} from "./styles";
import { Header } from "../../components/Header";
import Lottie from "lottie-react";
import hamburgerAnimation from "../../assets/lottieAnimations/burger.json";
import friesAnimation from "../../assets/lottieAnimations/frenchfries.json";
import { api } from "../../utils/api";
import { ProductProp, ProductsProps } from "../../types/Products";
import { Footer } from "../../components/Footer";
import { ModalBurger } from "../../components/ModalBurger";
import { ModalFries } from "../../components/ModalFries";
import { ModalMenu } from "../../components/ModalMenu";

export function Home() {
  const [productsData, setProductsData] = useState<ProductsProps[]>([]);
  const [personalize, setPersonalize] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps | null>(
    null
  );

  async function fetchProducts() {
    try {
      const { data } = await api.get("/products");
      setProductsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenModal(product: ProductProp) {
    console.log(product);
    setSelectedProduct(product);
    setPersonalize(product.type);
  }

  function handleOpenModalPersonalize(item: string) {
    setPersonalize(item);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
    setPersonalize("");
  }

  function handleCloseModalPersonalize() {
    setPersonalize("");
  }

  const BurgerChef = productsData.filter(
    (product) => product.type === "chefBurger"
  );
  const FriesChef = productsData.filter(
    (product) => product.type === "chefFries"
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Header />
      <TitleContainer>Personalize seu Burger</TitleContainer>

      <CustomizeContainer>
        <CustomizeHamburger onClick={() => handleOpenModal(BurgerChef[0])}>
          <Lottie animationData={hamburgerAnimation} loop={true} />
          <CustomizeText>
            Monte o melhor Burger para você, aqui você é o chef! <br />
            Use a imaginação e crie um burger fantástico e delicioso.
          </CustomizeText>
        </CustomizeHamburger>
        <CustomizeHamburger onClick={() => handleOpenModal(FriesChef[0])}>
          <Lottie animationData={friesAnimation} loop={true} />
          <CustomizeText>
            Monte a melhor Batata Frita para você, aqui você é o chef! <br />
            Use a imaginação e crie um burger fantástico e delicioso.
          </CustomizeText>
        </CustomizeHamburger>
      </CustomizeContainer>

      <MenuContainer>Cardápio</MenuContainer>
      <ProductList>
        {productsData
          .filter((product) => product.type === "food")
          .map((product, index) => (
            <ProductItem
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              <ProductImage src={product.image} alt="" />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  R$
                  {Number(product.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ProductPrice>
              </ProductInfo>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductItem>
          ))}
        {productsData
          .filter((product) => product.type === "fries")
          .map((product, index) => (
            <ProductItem
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              <ProductImage src={product.image} alt="" />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  R$
                  {Number(product.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ProductPrice>
              </ProductInfo>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductItem>
          ))}
        {productsData
          .filter((product) => product.type === "desert")
          .map((product, index) => (
            <ProductItem
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              <ProductImage src={product.image} alt="" />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  R$
                  {Number(product.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </ProductPrice>
              </ProductInfo>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductItem>
          ))}
      </ProductList>

      {selectedProduct && (
        <ModalMenu
          data={selectedProduct}
          closeModal={handleCloseModal}
          allProducts={productsData}
          type={selectedProduct.type}
        />
      )}

      {personalize === "burger" && (
        <ModalBurger
          type={personalize}
          closeModal={handleCloseModalPersonalize}
          allProducts={productsData}
          isBurger={true}
        />
      )}

      {personalize === "fries" && (
        <ModalFries
          type={personalize}
          closeModal={handleCloseModalPersonalize}
          allProducts={productsData}
          isBurger={true}
        />
      )}

      <Footer />
    </Container>
  );
}
