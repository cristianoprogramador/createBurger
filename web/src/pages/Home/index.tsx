import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import hamburgerAnimation from "../../assets/lottieAnimations/burger.json";
import friesAnimation from "../../assets/lottieAnimations/frenchfries.json";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ModalMenu } from "../../components/ModalMenu";
import { ProductProp, ProductsProps } from "../../types/Products";
import { api } from "../../utils/api";
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

export function Home() {
  const [productsData, setProductsData] = useState<ProductsProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps | null>(
    null
  );
  const [searchResults, setSearchResults] = useState("");

  async function fetchProducts() {
    try {
      const { data } = await api.get("/products");
      setProductsData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenModal(product: ProductProp) {
    // console.log(product);
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
  }

  const BurgerChef = productsData.filter(
    (product) => product.type === "Burger Personalizado"
  );
  const FriesChef = productsData.filter(
    (product) => product.type === "Batata Personalizado"
  );

  const handleSearch = (term: string) => {
    setSearchResults(term);
  };

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchResults.toLowerCase()) ||
      product.description.toLowerCase().includes(searchResults.toLowerCase()) ||
      product.type.toLowerCase().includes(searchResults.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(searchResults === "");

  return (
    <Container>
      <Header onSearch={handleSearch} />

      {searchResults === "" && (
        <>
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
                Monte a melhor Batata Frita para você, aqui você é o chef!{" "}
                <br />
                Use a imaginação e crie um burger fantástico e delicioso.
              </CustomizeText>
            </CustomizeHamburger>
          </CustomizeContainer>
        </>
      )}

      <MenuContainer>Cardápio</MenuContainer>
      <ProductList>
        {filteredProducts
          .filter((product) => product.type === "Combo")
          .map((product) => (
            <ProductItem
              key={product.id}
              onClick={() => handleOpenModal(product)}
            >
              <ProductInfo>
                <ProductImage src={product.image} alt="" />
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
        {filteredProducts
          .filter((product) => product.type === "Lanche Individual")
          .map((product) => (
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
        {filteredProducts
          .filter((product) => product.type === "Porção")
          .map((product) => (
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
        {filteredProducts
          .filter((product) => product.type === "Bebida")
          .map((product) => (
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
        {filteredProducts
          .filter((product) => product.type === "Sobremesa")
          .map((product) => (
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
          type={selectedProduct.type}
        />
      )}

      <Footer />
    </Container>
  );
}
