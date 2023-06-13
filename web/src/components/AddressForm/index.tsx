import { useContext, useState, useEffect } from "react";
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
  Title,
} from "./styles";

export function AddressForm({ onAddressChange }: any) {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await api.post(`/address/${user?.email}`, data);
      // console.log(response);
      toast.success("Dados salvo com sucesso!");
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
        setaddressData((prevState: any) => ({
          ...prevState,
          cidade: data.localidade || "",
          bairro: data.bairro || "",
          rua: data.logradouro || "",
          uf: data.uf || "",
        }));
        setValue("cidade", data.localidade || "");
        setValue("bairro", data.bairro || "");
        setValue("rua", data.logradouro || "");
        setValue("uf", data.uf || "");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [addressData, setaddressData] = useState<any>({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    email: user?.email,
    paymentMethod: "",
    paymentTime: "",
  });
  const [loading, setLoading] = useState(true);

  console.log(addressData);

  async function fetchAddress() {
    try {
      const { data } = await api.get(`/address/${user?.email}`);
      setaddressData(data.address.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    onAddressChange(addressData);
  }, [addressData, onAddressChange]);

  if (loading) {
    return <div>Carregando</div>;
  }

  return (
    <FormContainer>
      <Title>Endereço de Entrega:</Title>
      <GroupInput>
        <InputContainer>
          CEP
          <InputMask
            mask="99999-999"
            maskChar=""
            type="text"
            defaultValue={addressData.cep}
            {...register("cep")}
            onBlur={handleCepSearch}
            onChange={(e) =>
              setaddressData({ ...addressData, cep: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          Rua
          <Input
            type="text"
            defaultValue={addressData.rua}
            {...register("rua")}
            onChange={(e) =>
              setaddressData({ ...addressData, rua: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          Número
          <Input
            type="text"
            defaultValue={addressData.numero}
            {...register("numero")}
            onChange={(e) =>
              setaddressData({ ...addressData, numero: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          Bairro
          <Input
            type="text"
            defaultValue={addressData.bairro}
            {...register("bairro")}
            onChange={(e) =>
              setaddressData({ ...addressData, bairro: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          Cidade
          <Input
            type="text"
            defaultValue={addressData.cidade}
            {...register("cidade")}
            onChange={(e) =>
              setaddressData({ ...addressData, cidade: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          UF
          <Input
            type="text"
            defaultValue={addressData.uf}
            {...register("uf")}
            onChange={(e) =>
              setaddressData({ ...addressData, uf: e.target.value })
            }
          />
        </InputContainer>
      </GroupInput>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
}
