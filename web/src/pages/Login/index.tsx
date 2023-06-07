import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  Button,
  ButtonSignUp,
  Container,
  FormContainer,
  GroupInput,
  Input,
  InputContainer,
  ProfileContainer,
  ProfileImage,
} from "./styles";
import Lottie from "lottie-react";
import login from "../../assets/lottieAnimations/login-orange.json";
import { FcGoogle } from "react-icons/fc";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div style={{ width: 300, height: 300 }}>
          <Lottie animationData={login} loop={true} />
        </div>
        <div>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <GroupInput>
              <InputContainer>
                Email:
                <Input type="text" {...register("email")} />
              </InputContainer>
              <InputContainer>
                Senha:
                <Input type="password" {...register("password")} />
              </InputContainer>
            </GroupInput>
            <Button type="submit">Entrar</Button>
            <ButtonSignUp type="submit" onClick={() => navigate("/signup")}>
              Cadastrar-se
            </ButtonSignUp>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              Entrar com: <FcGoogle size={35} />
            </div>
          </FormContainer>
        </div>
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
