import React from "react";

// import { Container } from './styles';
interface Props {
  clicked: () => void;
}

const ButtonCreate: React.FC<Props> = (props: Props) => {
  const { clicked } = props;

  return (
    <div className="justify-item-end floating-button-margin" onClick={clicked}>
      <a className="btn-floating btn-small waves-effect">
        <i className="material-icons">add</i>
      </a>
    </div>
  );
};

export default ButtonCreate;
