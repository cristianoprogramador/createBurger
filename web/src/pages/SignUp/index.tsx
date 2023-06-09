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
import { api } from "../../utils/api";
import { toast } from "react-toastify";

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // console.log(data);
    try {
      const response = await api.post("/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response);
      toast.success("Usuario criado com sucesso!");
      navigate("/login");
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
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
