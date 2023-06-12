import { Container, IconView, InputBar } from "./styles";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsProps } from "../../types/Products";

export function SearchBar({ onSearch }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isHome) {
      if (searchTerm.trim() === "") {
        onSearch(searchTerm);
      } else if (event.key === "Enter") {
        onSearch(searchTerm); // Chame a prop onSearch com o searchTerm como argumento
      }
    } else {
      navigate("/");
    }
  };

  const handleSearchByClick = () => {
    if (isHome) {
      if (searchTerm.trim() === "") {
        onSearch(searchTerm);
      } else {
        onSearch(searchTerm); // Chame a prop onSearch com o searchTerm como argumento
      }
    } else {
      navigate("/");
    }
  };

  return (
    <Container>
      <IconView>
        <FaSearch
          style={{ cursor: "pointer" }}
          size={26}
          onClick={handleSearchByClick}
        />
      </IconView>
      <InputBar
        placeholder="Pesquisar por qualquer coisa..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={handleSearch}
      />
    </Container>
  );
}
