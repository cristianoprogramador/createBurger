import { useEffect } from "react";
import Modal from "react-modal";
import { ButtonInside, Panel } from "./styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
    zIndex: 9999,
    overflow: "auto",
    maxHeight: "calc(100vh - 250px)",
  },
};

interface ModalFoodProps {
  data: {
    id: string;
    name: string;
    value: string;
    type: string;
    description: string;
    image: string;
  };
  closeModal: () => void;
}

export function ModalFood({ data, closeModal }: ModalFoodProps) {
  console.log(data);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Panel>
        <div>
          <h2>{data.name}</h2>
        </div>
        <img src={data.image} alt={data.name} />
        <p>{data.description}</p>
        <span>R$ {data.value}</span>
        <ButtonInside onClick={closeModal}>Fechar</ButtonInside>
      </Panel>
    </Modal>
  );
}
