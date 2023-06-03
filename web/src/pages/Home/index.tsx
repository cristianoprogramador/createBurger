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
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { ModalFood } from "../../components/ModalFood";

export function Home() {
  const [productsData, setProductsData] = useState<ProductsProps[]>([]);
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
    console.log("cade");
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Header />
      <TitleContainer>Personalize seu Burger</TitleContainer>

      <CustomizeContainer>
        <CustomizeHamburger>
          <Lottie animationData={hamburgerAnimation} loop={true} />
          <CustomizeText>
            Monte o melhor Burger para você, aqui você é o chef! <br />
            Use a imaginação e crie um burger fantástico e delicioso.
          </CustomizeText>
        </CustomizeHamburger>
        <CustomizeHamburger>
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
          .sort((a, b) => b.type.localeCompare(a.type))
          .map((product, index) => (
            <ProductItem
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              {/* <ModalFood data={product} /> */}
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
        <ModalFood data={selectedProduct} closeModal={handleCloseModal} />
      )}

      <Footer />
    </Container>
  );
}
