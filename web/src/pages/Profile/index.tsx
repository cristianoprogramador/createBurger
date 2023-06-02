import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  Button,
  Container,
  FormContainer,
  GroupInput,
  Input,
  InputContainer,
  ProfileContainer,
  ProfileImage,
} from "./styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const userProfile = {
  name: "Cristiano Pereira da Silva",
  email: "cristiano@gmail.com",
  zipcode: "14051210",
  address: "Aquidauana",
  number: "983",
  district: "Monte Alegre",
  city: "Ribeirão Preto",
  state: "SP",
};

export function Profile() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [address, setAddress] = useState({
    city: "",
    district: "",
    address: "",
    state: "",
  });

  const onSubmit = (data: any) => {
    // Aqui você pode implementar a lógica para salvar as alterações no perfil do usuário
    // Por exemplo, fazer uma requisição para uma API
    // Após salvar, você pode redirecionar o usuário para outra página usando navigate()
    console.log(data);
    navigate("/profile");
  };

  const handleCepSearch = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace("-", "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setValue("city", data.localidade || "");
        setValue("district", data.bairro || "");
        setValue("address", data.logradouro || "");
        setValue("state", data.uf || "");
        setAddress({
          city: data.localidade,
          district: data.bairro,
          address: data.logradouro,
          state: data.uf,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div>
          <ProfileImage
            src={"https://avatars.githubusercontent.com/u/102186472?v=4"}
            alt=""
          />
        </div>
        <div>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <GroupInput>
              <InputContainer>
                Nome:
                <Input
                  type="text"
                  defaultValue={userProfile.name}
                  {...register("name")}
                />
              </InputContainer>
              <InputContainer>
                E-mail
                <Input
                  type="text"
                  defaultValue={userProfile.email}
                  {...register("email")}
                  disabled
                />
              </InputContainer>
            </GroupInput>
            <GroupInput>
              <InputContainer>
                CEP
                <Input
                  type="text"
                  defaultValue={userProfile.zipcode}
                  {...register("zipcode")}
                  onBlur={handleCepSearch}
                />
              </InputContainer>
              <InputContainer>
                Rua
                <Input
                  type="text"
                  defaultValue={userProfile.address}
                  {...register("address")}
                />
              </InputContainer>
              <InputContainer>
                Número do Local
                <Input
                  type="text"
                  defaultValue={userProfile.number}
                  {...register("number")}
                />
              </InputContainer>
            </GroupInput>
            <GroupInput>
              <InputContainer>
                Bairro
                <Input
                  type="text"
                  defaultValue={userProfile.district}
                  {...register("district")}
                />
              </InputContainer>
              <InputContainer>
                Cidade
                <Input
                  type="text"
                  defaultValue={userProfile.city}
                  {...register("city")}
                />
              </InputContainer>
              <InputContainer>
                UF
                <Input
                  type="text"
                  defaultValue={userProfile.state}
                  {...register("state")}
                />
              </InputContainer>
            </GroupInput>
            <Button type="submit">Salvar</Button>
          </FormContainer>
        </div>
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
