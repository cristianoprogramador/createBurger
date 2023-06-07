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
import signup from "../../assets/lottieAnimations/signup.json";
import { FcGoogle } from "react-icons/fc";

export function SignUp() {
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
          <Lottie animationData={signup} loop={true} />
        </div>
        <div>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <GroupInput>
              <InputContainer>
                Nome:
                <Input type="text" {...register("name")} />
              </InputContainer>
              <InputContainer>
                E-mail:
                <Input type="text" {...register("email")} />
              </InputContainer>
              <InputContainer>
                Senha:
                <Input type="password" {...register("password")} />
              </InputContainer>
            </GroupInput>
            <ButtonSignUp type="submit">Cadastrar-se</ButtonSignUp>
          </FormContainer>
        </div>
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
