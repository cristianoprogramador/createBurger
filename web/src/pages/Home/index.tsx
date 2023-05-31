import { useState } from "react";
import { Container } from "./styles";

export function Home() {
  const [count, setCount] = useState(0);

  return <Container>count {count}</Container>;
}
