import React from "react";
import { Debt } from "../../../interfaces/debt";

// import { Container } from './styles';

interface Props {
  debt: Debt;
  isUpdate: boolean;
  disabled: boolean;
  clicked: () => void;
}

const ButtonDelete: React.FC<Props> = (props: Props) => {
  const { isUpdate, disabled, debt, clicked } = props;

  return (
    <>
      {isUpdate && (
        <button
          disabled={disabled}
          type="submit"
          name="action"
          className="btn waves-effect"
          onClick={() => {
            clicked();
          }}
        >
          Excluir
          <i className="material-icons right">delete</i>
        </button>
      )}
    </>
  );
};

export default ButtonDelete;
