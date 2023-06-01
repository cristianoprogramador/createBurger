import { Container, IconView, InputBar } from "./styles";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm === "") {
      return null;
    } else if (event.key === "Enter") {
      console.log(searchTerm);
    }
  };
  const handleSearchByClick = () => {
    if (searchTerm === "") {
      console.log(searchTerm);
    } else {
      console.log(searchTerm);
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
