import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  Button,
  ButtonSignUp,
  Container,
  EyeIcon,
  FormContainer,
  GroupInput,
  Input,
  InputContainer,
  ProfileContainer,
  ProfileImage,
} from "./styles";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottieAnimations/login-orange.json";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Context } from "../../contexts/Context";
import { useContext, useEffect } from "react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const response = await api.post("/user/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response);
      toast.success("Você está logado!");
      login(response.data.user);
      navigate("/");
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  console.log("SERA Q VEIO", user);

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <div style={{ width: 300, height: 300 }}>
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <GroupInput>
            <InputContainer>
              Email:
              <Input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <span>Email inválido</span>}
            </InputContainer>
            <InputContainer>
              Senha:
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              {errors.password && <span>Senha é obrigatória</span>}
              <EyeIcon
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </EyeIcon>
            </InputContainer>
          </GroupInput>
          <Button type="submit">Entrar</Button>
        </FormContainer>
        <ButtonSignUp onClick={() => navigate("/signup")}>
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
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
