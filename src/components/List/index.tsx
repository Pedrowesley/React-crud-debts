import React from "react";
import { Debt } from "../../interfaces/debt";
import { User } from "../../interfaces/user";
import "./index.css";

// import { Container } from './styles';

interface PropsList {
  editItem: (debt: Debt) => void;
  users: User[];
  debtsList: Debt[];
}

const List: React.FC<PropsList> = (props: PropsList) => {
  const { editItem, users, debtsList } = props;

  const getDebtUserName = (idUser: number) => {
    const userFiltered = users.filter((item) => item.id === idUser);
    return userFiltered.length > 0 ? userFiltered[0].name : "Usuário inválido";
  };

  const eventEdit = (debt: Debt) => {
    editItem(debt);
  };

  return (
    <>
      {debtsList.length > 0 &&
        debtsList?.map((item) => {
          return (
            <div
              key={item.uuid}
              className="card-panel card-panel-list row z-depth-3"
            >
              <div className="s7 font-name-user">
                {getDebtUserName(item.idUsuario)}
              </div>

              <div
                className="s3 icons-left"
                onClick={() => {
                  eventEdit(item);
                }}
              >
                <i className="material-icons">edit</i>
              </div>
            </div>
          );
        })}
      ;
    </>
  );
};

export default List;
