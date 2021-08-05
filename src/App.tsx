import axios from "axios";
import M from "materialize-css";
import { useEffect, useState } from "react";
import "./App.css";
import ButtonCreate from "./components/ButtonsActions/ButtonCreate";
import ButtonDelete from "./components/ButtonsActions/ButtonDelete";
import ButtonSave from "./components/ButtonsActions/ButtonSave";
import List from "./components/List";
import { Debt } from "./interfaces/debt";
import { User } from "./interfaces/user";

interface Form {
  idUsuario: number;
  motivo: string;
  valor: string;
}

function App() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [debtsList, setDebtsList] = useState<Debt[]>([]);
  const [debtUpdate, setDebtUpdate] = useState<Debt>({} as Debt);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [loadedUsers, setLoadedUsers] = useState<boolean>(false);
  const [loadedDebts, setLoadedDebts] = useState<boolean>(false);
  const [loadingSaveCrud, setLoadingSaveCrud] = useState<boolean>(false);
  const [formData, setFormData] = useState<Form>({} as Form);

  useEffect(() => {
    // Requests
    setTimeout(() => {
      getAllUsers();
    }, 500);
  }, []);

  useEffect(() => {
    if (usersList.length > 0) {
      getAllDebts();
    }
  }, [usersList]);

  const messageToast = (text: string) => {
    M.toast({ html: text, classes: "rounded" });
  };

  const clearForm = () => {
    const formPropertyCopy = {} as Form;
    formPropertyCopy.idUsuario = 0;
    formPropertyCopy.motivo = "";
    formPropertyCopy.valor = "";
    setFormData(formPropertyCopy);
    initializeSelectFunction();
  };

  const createDebt = () => {
    clearForm();
    setIsUpdate(false);
    setDebtUpdate({} as Debt);
  };

  const initializeSelectFunction = () => {
    setLoadedUsers(true);
    setTimeout(() => {
      M.AutoInit();
    }, 50);
  };

  const getAllUsers = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        initializeSelectFunction();
        let users: User[] = [];
        users = response.data;
        setUsersList(users);
      })
      .catch((error) => {
        initializeSelectFunction();
      });
  };

  const getAllDebts = () => {
    setLoadingSaveCrud(true);
    axios
      .get(
        `https://provadev.xlab.digital/api/v1/divida?uuid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        let debts: Debt[] = [];
        debts = response?.data.result;
        setDebtsList(debts);
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingSaveCrud(false);
        setLoadedDebts(true);
      });
  };

  const insertDebt = () => {
    setLoadingSaveCrud(true);

    axios
      .post(
        `https://provadev.xlab.digital/api/v1/divida/?uuid=${process.env.REACT_APP_API_KEY}`,
        formData
      )
      .then((response) => {
        clearForm();
        getAllDebts();
        messageToast("Dívida adicionada com sucesso");
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingSaveCrud(false);
      });
  };

  const deleteDebt = () => {
    setLoadingSaveCrud(true);

    axios
      .delete(
        `https://provadev.xlab.digital/api/v1/divida/${debtUpdate._id}/?uuid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        clearForm();
        getAllDebts();
        setIsUpdate(false);
        messageToast("Dívida excluida com sucesso");
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingSaveCrud(false);
      });
  };

  const updateDebt = () => {
    axios
      .put(
        `https://provadev.xlab.digital/api/v1/divida/${debtUpdate._id}/?uuid=${process.env.REACT_APP_API_KEY}`,
        formData
      )
      .then((response) => {
        clearForm();
        getAllDebts();
        messageToast("Dívida atualizada com sucesso");
      })
      .catch((error) => {})
      .finally(() => {
        setIsUpdate(false);
      });
  };

  const selectUser = (user: number) => {
    setFormData((prevState) => ({
      ...prevState,
      idUsuario: user,
    }));
  };

  const ProgressLoadingComponent = () => (
    <div className="col s12 progress-margin">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const ListDebtsComponent = () => (
    <>
      {usersList.length > 0 && (
        <List
          editItem={(debt: Debt) => {
            setFormData((prevState) => ({
              ...prevState,
              idUsuario: debt.idUsuario,
              motivo: debt.motivo,
              valor: debt.valor,
            }));
            initializeSelectFunction();
            setIsUpdate(true);
            setDebtUpdate(debt);
          }}
          users={usersList}
          debtsList={debtsList}
        />
      )}
    </>
  );

  return (
    <>
      <ButtonCreate clicked={createDebt} />
      <div className="row row-reverse-mobile">
        <div className="col s12 m4 margin-debts">
          <span className="title-debts">Dívidas:</span>
          {loadedDebts ? <ListDebtsComponent /> : <ProgressLoadingComponent />}
        </div>

        <div className="col s12 m8">
          <div className="card-panel">
            <div className="row">
              {loadedUsers ? (
                <div className="input-field col s12">
                  <select
                    defaultValue={0}
                    value={formData.idUsuario}
                    disabled={isUpdate || loadingSaveCrud}
                    onChange={(event) => {
                      selectUser(Number(event.target.value));
                    }}
                  >
                    <option value={0} disabled>
                      Escolha uma opção
                    </option>
                    {usersList.length > 0 &&
                      usersList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <label>Clientes</label>
                </div>
              ) : (
                <ProgressLoadingComponent />
              )}

              <div className="input-field col s12">
                <input
                  id="motivo"
                  type="text"
                  placeholder=" "
                  disabled={!loadedUsers || loadingSaveCrud}
                  value={formData.motivo}
                  onChange={(event) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      motivo: event.target.value,
                    }));
                  }}
                />
                <label htmlFor="motivo">Motivo</label>
              </div>

              <div className="input-field col s12">
                <input
                  id="icon_prefix"
                  type="number"
                  placeholder=" "
                  disabled={!loadedUsers || loadingSaveCrud}
                  className="validate"
                  value={formData.valor}
                  onChange={(event) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      valor: event.target.value,
                    }));
                  }}
                />
                <label htmlFor="icon_prefix">Valor</label>
              </div>
            </div>

            <div className="section-buttons-action">
              <ButtonDelete
                debt={debtUpdate}
                isUpdate={isUpdate}
                disabled={loadingSaveCrud}
                clicked={deleteDebt}
              />

              <ButtonSave
                isUpdate={isUpdate}
                disabled={!loadedUsers || loadingSaveCrud}
                clickedInsert={insertDebt}
                clickedUpdate={updateDebt}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
