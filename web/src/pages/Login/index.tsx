import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginAnimation from "../../assets/lottieAnimations/login-orange.json";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
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
} from "./styles";

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
      const token = response.data.token;
      // Armazene o token no localStorage
      localStorage.setItem("tokenBurger", token);

      toast.success("Você está logado!");
      login(response.data.user, token);
      navigate("/");
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const GoogleData = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        // console.log(response.access_token);
        // console.log(GoogleData.data);
        // console.log(GoogleData);

        const data = await api.post("/user/loginGoogle", {
          token: response.access_token,
        });
        // console.log(data);

        const userData = {
          name: GoogleData.data.given_name,
          email: GoogleData.data.email,
          id: 0,
          // Adicione outras propriedades personalizadas aqui, se necessário
        };

        localStorage.setItem("tokenBurger", data.data.token);
        login(userData, data.data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

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
            cursor: "pointer",
          }}
          onClick={() => loginWithGoogle()}
        >
          Entrar com: <FcGoogle size={35} />
        </div>
      </ProfileContainer>
      <Footer />
    </Container>
  );
}
