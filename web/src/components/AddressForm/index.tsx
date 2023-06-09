import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/api";
import {
  Button,
  FormContainer,
  GroupInput,
  Input,
  InputContainer,
  InputMask,
} from "./styles";

export function AddressForm() {
  const navigate = useNavigate();
  const { logout, user, updateUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
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
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
    </FormContainer>
  );
}
