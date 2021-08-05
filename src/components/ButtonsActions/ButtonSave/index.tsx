import React from "react";

// import { Container } from './styles';
interface Props {
  isUpdate: boolean;
  disabled: boolean;
  clickedInsert: () => void;
  clickedUpdate: () => void;
}

const ButtonSave: React.FC<Props> = (props: Props) => {
  const { isUpdate, disabled, clickedInsert, clickedUpdate } = props;

  return (
    <button
      disabled={disabled}
      className="btn waves-effect"
      type="submit"
      name="action"
      onClick={() => {
        if (!isUpdate) {
          clickedInsert();
        } else {
          clickedUpdate();
        }
      }}
    >
      Salvar
      <i className="material-icons right">send</i>
    </button>
  );
};

export default ButtonSave;
