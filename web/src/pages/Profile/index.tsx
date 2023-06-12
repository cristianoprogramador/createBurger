import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  Button,
  ButtonLogout,
  Container,
  FormContainer,
  GroupInput,
  Input,
  InputContainer,
  InputMask,
  ProfileContainer,
  ProfileImage,
} from "./styles";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import formAnimation from "../../assets/lottieAnimations/form.json";

export function Profile() {
  const navigate = useNavigate();
  const { logout, user, updateUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [address, setAddress] = useState({
    cidade: "",
    bairro: "",
    rua: "",
    uf: "",
  });

  const onSubmit = async (data: any) => {
    // console.log(data);
    try {
      const response = await api.put(`/user/login/${user?.id}`, data);
      // console.log(response);
      toast.success("Dados salvo com sucesso!");
      updateUser(response.data);
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleCepSearch = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace("-", "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setValue("cidade", data.localidade || "");
        setValue("bairro", data.bairro || "");
        setValue("rua", data.logradouro || "");
        setValue("uf", data.uf || "");
        setAddress({
          cidade: data.localidade,
          bairro: data.bairro,
          rua: data.logradouro,
          uf: data.uf,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function logoutHandle() {
    logout();
    navigate("/");
  }

  const userProfile = {
    name: user?.name || "",
    email: user?.email || "",
    cep: user?.cep || "",
    rua: user?.rua || "",
    numero: user?.numero || "",
    bairro: user?.bairro || "",
    cidade: user?.cidade || "",
    uf: user?.uf || "",
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div style={{ width: 200, height: 200 }}>
          <Lottie animationData={formAnimation} loop={true} />
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
                <Input type="text" defaultValue={user?.email} disabled />
              </InputContainer>
            </GroupInput>
            <GroupInput>
              <InputContainer>
                CEP
                <InputMask
                  mask="99999-999"
                  maskChar=""
                  type="text"
                  defaultValue={userProfile.cep}
                  {...register("cep")}
                  onBlur={handleCepSearch}
                />
              </InputContainer>
              <InputContainer>
                Rua
                <Input
                  type="text"
                  defaultValue={userProfile.rua}
                  {...register("rua")}
                />
              </InputContainer>
              <InputContainer>
                Número
                <Input
                  type="text"
                  defaultValue={userProfile.numero}
                  {...register("numero")}
                />
              </InputContainer>
            </GroupInput>
            <GroupInput>
              <InputContainer>
                Bairro
                <Input
                  type="text"
                  defaultValue={userProfile.bairro}
                  {...register("bairro")}
                />
              </InputContainer>
              <InputContainer>
                Cidade
                <Input
                  type="text"
                  defaultValue={userProfile.cidade}
                  {...register("cidade")}
                />
              </InputContainer>
              <InputContainer>
                UF
                <Input
                  type="text"
                  defaultValue={userProfile.uf}
                  {...register("uf")}
                />
              </InputContainer>
            </GroupInput>
            <Button type="submit">Salvar</Button>
            <ButtonLogout onClick={() => logoutHandle()}>
              Sair da Conta
            </ButtonLogout>
          </FormContainer>
        </div>
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
